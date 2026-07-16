import { describe, expect, it } from 'vitest'
import { initialUnits, tenants } from '../data/mockData'
import { assignTenant, createAndAssignTenant } from './occupancy'

describe('tenant and unit occupancy', () => {
  it('moves an existing tenant into a room and updates both records', () => {
    const result = assignTenant(initialUnits, tenants, 't4', 'u2', 'r4')

    expect(result.tenants.find(tenant => tenant.id === 't4')).toMatchObject({
      unit: 'A-1510',
      room: 'Studio Room',
      status: 'Active',
    })
    expect(result.units.find(unit => unit.id === 'u2')?.rooms[0].occupants).toContain('Paolo Lim')
    expect(result.units.find(unit => unit.id === 'u5')?.rooms[0].occupants).not.toContain('Paolo Lim')
  })

  it('creates a tenant from a unit and immediately lists them as its occupant', () => {
    const result = createAndAssignTenant(initialUnits, tenants, {
      name: 'Jamie Dela Cruz',
      contact: '0917 000 0000',
      moveIn: 'Jul 16, 2026',
      unitId: 'u2',
      roomId: 'r4',
    }, 'new-tenant-id')

    expect(result.tenants.at(-1)).toMatchObject({ id: 'new-tenant-id', name: 'Jamie Dela Cruz', unit: 'A-1510', room: 'Studio Room' })
    expect(result.units.find(unit => unit.id === 'u2')?.rooms[0].occupants).toContain('Jamie Dela Cruz')
  })
})
