import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialUnits, tenants as initialTenants } from '../data/mockData'
import { assignTenant, createAndAssignTenant, type TenantAssignmentInput } from '../domain/occupancy'
import type { Room, Tenant, Unit } from '../domain/types'

interface AppStore { units: Unit[]; tenants: Tenant[]; addRoom: (unitId:string, room:Omit<Room,'id'>)=>void; assignTenant: (tenantId:string,unitId:string,roomId:string)=>void; addTenantToRoom:(input:TenantAssignmentInput)=>void; resetDemo:()=>void }
const Context=createContext<AppStore|null>(null)
const STORAGE_KEY='unitflow.data.v2'

function loadData(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY) || '') as {units:Unit[];tenants:Tenant[]}}catch{return {units:initialUnits,tenants:initialTenants}}}
export function AppStoreProvider({children}:{children:ReactNode}){
  const [data,setData]=useState(loadData)
  const save=(next:{units:Unit[];tenants:Tenant[]})=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));return next}
  const value=useMemo<AppStore>(()=>({units:data.units,tenants:data.tenants,
    addRoom:(unitId,room)=>setData(current=>save({...current,units:current.units.map(unit=>unit.id===unitId?{...unit,rooms:[...unit.rooms,{...room,id:crypto.randomUUID()}],monthlyRate:unit.monthlyRate+room.rate}:unit)})),
    assignTenant:(tenantId,unitId,roomId)=>setData(current=>save(assignTenant(current.units,current.tenants,tenantId,unitId,roomId))),
    addTenantToRoom:(input)=>setData(current=>save(createAndAssignTenant(current.units,current.tenants,input))),
    resetDemo:()=>{localStorage.removeItem(STORAGE_KEY);setData({units:initialUnits,tenants:initialTenants})}}),[data])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAppStore(){const value=useContext(Context);if(!value)throw new Error('useAppStore must be used inside AppStoreProvider');return value}
