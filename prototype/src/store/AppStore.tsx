import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialAppData } from '../data/mockData'
import { convertViewing, recordMaintenanceExpense, type MaintenanceExpenseInput } from '../domain/appData'
import { assignTenant, createAndAssignTenant, type TenantAssignmentInput } from '../domain/occupancy'
import type { AppData, Lease, Payment, Room, Viewing } from '../domain/types'

interface AppStore extends AppData {
  addRoom:(unitId:string,room:Omit<Room,'id'>)=>void
  assignTenant:(tenantId:string,unitId:string,roomId:string)=>void
  addTenantToRoom:(input:TenantAssignmentInput)=>void
  addViewing:(input:Omit<Viewing,'id'|'status'>)=>void
  updateViewingStatus:(id:string,status:Viewing['status'])=>void
  convertViewing:(viewingId:string,assignment:{unitId:string;roomId:string;moveIn:string})=>void
  saveLease:(input:Omit<Lease,'id'|'tenant'|'unit'>)=>void
  addPayment:(input:Omit<Payment,'id'|'tenant'|'unit'>)=>void
  addMaintenance:(input:MaintenanceExpenseInput)=>void
  updateContractTemplate:(name:string)=>void
  resetDemo:()=>void
}

const Context=createContext<AppStore|null>(null)
const STORAGE_KEY='unitflow.data.v3'
function cloneInitial(){return structuredClone(initialAppData)}
function loadData():AppData{try{const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'') as AppData;if(!parsed.units||!parsed.viewings||!parsed.contractTemplate)throw new Error('Old data');return parsed}catch{return cloneInitial()}}

export function AppStoreProvider({children}:{children:ReactNode}){
  const [data,setData]=useState<AppData>(loadData)
  const update=(transition:(current:AppData)=>AppData)=>setData(current=>{const next=transition(current);localStorage.setItem(STORAGE_KEY,JSON.stringify(next));return next})
  const value=useMemo<AppStore>(()=>({...data,
    addRoom:(unitId,room)=>update(current=>({...current,units:current.units.map(unit=>unit.id===unitId?{...unit,rooms:[...unit.rooms,{...room,id:crypto.randomUUID()}],monthlyRate:unit.monthlyRate+room.rate}:unit)})),
    assignTenant:(tenantId,unitId,roomId)=>update(current=>({...current,...assignTenant(current.units,current.tenants,tenantId,unitId,roomId)})),
    addTenantToRoom:(input)=>update(current=>({...current,...createAndAssignTenant(current.units,current.tenants,input)})),
    addViewing:(input)=>update(current=>({...current,viewings:[{...input,id:crypto.randomUUID(),status:'Scheduled'},...current.viewings]})),
    updateViewingStatus:(id,status)=>update(current=>({...current,viewings:current.viewings.map(viewing=>viewing.id===id?{...viewing,status}:viewing)})),
    convertViewing:(id,assignment)=>update(current=>convertViewing(current,id,assignment)),
    saveLease:(input)=>update(current=>{const tenant=current.tenants.find(record=>record.id===input.tenantId);if(!tenant)throw new Error('Tenant not found');const lease:Lease={...input,id:crypto.randomUUID(),tenant:tenant.name,unit:tenant.unit};return {...current,leases:[lease,...current.leases.filter(record=>record.tenantId!==input.tenantId)],tenants:current.tenants.map(record=>record.id===input.tenantId?{...record,deposit:input.deposit}:record)}}),
    addPayment:(input)=>update(current=>{const tenant=current.tenants.find(record=>record.id===input.tenantId);if(!tenant)throw new Error('Tenant not found');return {...current,payments:[{...input,id:crypto.randomUUID(),tenant:tenant.name,unit:tenant.unit},...current.payments]}}),
    addMaintenance:(input)=>update(current=>recordMaintenanceExpense(current,input)),
    updateContractTemplate:(name)=>update(current=>({...current,contractTemplate:{name,updatedAt:new Date().toISOString().slice(0,10)}})),
    resetDemo:()=>{const next=cloneInitial();localStorage.removeItem(STORAGE_KEY);setData(next)},
  }),[data])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAppStore(){const value=useContext(Context);if(!value)throw new Error('useAppStore must be used inside AppStoreProvider');return value}
