import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialUnits } from '../data/mockData'
import type { Room, Unit } from '../domain/types'

interface AppStore { units: Unit[]; addRoom: (unitId:string, room:Omit<Room,'id'>)=>void; resetDemo:()=>void }
const Context=createContext<AppStore|null>(null)
const STORAGE_KEY='unitflow.units.v1'

function loadUnits(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY) || '') as Unit[]}catch{return initialUnits}}
export function AppStoreProvider({children}:{children:ReactNode}){
  const [units,setUnits]=useState<Unit[]>(loadUnits)
  const value=useMemo<AppStore>(()=>({units,addRoom:(unitId,room)=>setUnits(current=>{const next=current.map(unit=>unit.id===unitId?{...unit,rooms:[...unit.rooms,{...room,id:crypto.randomUUID()}],monthlyRate:unit.monthlyRate+room.rate}:unit);localStorage.setItem(STORAGE_KEY,JSON.stringify(next));return next}),resetDemo:()=>{localStorage.removeItem(STORAGE_KEY);setUnits(initialUnits)}}),[units])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useAppStore(){const value=useContext(Context);if(!value)throw new Error('useAppStore must be used inside AppStoreProvider');return value}
