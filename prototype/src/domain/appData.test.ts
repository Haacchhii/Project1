import { describe, expect, it } from 'vitest'
import { initialAppData } from '../data/mockData'
import { convertViewing, depositSummary, recordMaintenanceExpense, tenantAccountSummary } from './appData'

describe('connected UnitFlow records', () => {
  it('converts a viewing while preserving direct tenant creation as a separate operation', () => {
    const next=convertViewing(initialAppData,'v1',{unitId:'u2',roomId:'r4',moveIn:'2026-08-01'})
    expect(next.viewings.find(viewing=>viewing.id==='v1')?.status).toBe('Converted')
    expect(next.tenants.some(tenant=>tenant.name==='Jamie Flores'&&tenant.unit==='A-1510')).toBe(true)
    expect(next.units.find(unit=>unit.id==='u2')?.rooms[0].occupants).toContain('Jamie Flores')
  })

  it('calculates tenant payments and outstanding balances from connected records', () => {
    expect(tenantAccountSummary(initialAppData,'t2')).toEqual({paid:0,pending:0,overdue:23000,total:23000})
  })

  it('deducts only the selected tenant share from the available deposit', () => {
    const next=recordMaintenanceExpense(initialAppData,{unitId:'u3',tenantId:'t2',category:'Cleaning',description:'Deep cleaning',date:'2026-07-18',amount:3000,tenantShare:1500,payer:'Shared',evidenceName:'receipt.jpg'})
    expect(depositSummary(next,'t2')).toMatchObject({original:38000,deductions:1500,remaining:36500})
  })

  it('rejects maintenance deductions above the remaining deposit', () => {
    expect(()=>recordMaintenanceExpense(initialAppData,{unitId:'u3',tenantId:'t2',category:'Repair',description:'Major repair',date:'2026-07-18',amount:50000,tenantShare:50000,payer:'Tenant deposit',evidenceName:''})).toThrow('remaining deposit')
  })

  it('rejects a tenant share larger than the maintenance expense', () => {
    expect(()=>recordMaintenanceExpense(initialAppData,{unitId:'u3',tenantId:'t2',category:'Repair',description:'Shared repair',date:'2026-07-18',amount:1000,tenantShare:1500,payer:'Shared',evidenceName:''})).toThrow('total expense')
  })
})
