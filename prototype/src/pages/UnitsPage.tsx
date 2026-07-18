import { BedDouble, Building2, Pencil, Plus, RotateCcw, Users } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Badge, EmptyState, money, PageHeader, StatCard, StatsGrid } from '../components/ui'
import { TenantAssignmentDialog } from '../components/TenantAssignmentDialog'
import { filterRecords, roomSummary } from '../domain/filterRecords'
import type { Room, RoomType, Unit } from '../domain/types'
import { useAppStore } from '../store/AppStore'

const roomTypes:RoomType[]=['Large','Medium','Small','Studio','Custom']

export function UnitsPage(){
  const {units,tenants,addRoom,updateRoom,assignTenant,addTenantToRoom,resetDemo}=useAppStore()
  const [filters,setFilters]=useState({search:'',status:'',property:'',roomType:''})
  const [selectedUnitId,setSelectedUnitId]=useState<string|null>(null)
  const [assigningUnit,setAssigningUnit]=useState<Unit|null>(null)
  const visible=useMemo(()=>filterRecords(units,filters),[units,filters])
  const selectedUnit=units.find(unit=>unit.id===selectedUnitId)
  const totals=roomSummary(units)
  const properties=[...new Set(units.map(unit=>unit.property))]

  return <>
    <PageHeader eyebrow="Property records" title="Units & room layouts" copy="Give every unit its own room mix. Each room can have a different size, capacity, and monthly rate." action={<button className="primary" onClick={()=>setSelectedUnitId(units[0]?.id||null)}><BedDouble size={16}/> Manage rooms</button>}/>
    <StatsGrid><StatCard label="Condominium units" value={units.length} icon={<Building2 size={17}/>} note={`${properties.length} properties`}/><StatCard label="Rooms" value={totals.rooms} icon={<BedDouble size={17}/>} note="Across all custom layouts"/><StatCard label="Total bed spaces" value={totals.capacity} icon={<Users size={17}/>} note={`${totals.occupants} assigned occupants`}/><StatCard label="Available spaces" value={totals.available} icon={<Plus size={17}/>} note="Across shared and private rooms"/></StatsGrid>
    <section className="panel table-panel"><div className="section-head"><div><h2>Unit inventory</h2><p>Configure each unit room by room</p></div><span className="result-count">{visible.length} {visible.length===1?'result':'results'}</span></div>
      <div className="toolbar unit-toolbar"><input value={filters.search} onChange={event=>setFilters({...filters,search:event.target.value})} placeholder="Search unit, room, or occupant..." aria-label="Search units"/><Select label="All statuses" value={filters.status} values={['Occupied','Vacant','Reserved']} onChange={status=>setFilters({...filters,status})}/><Select label="All properties" value={filters.property} values={properties} onChange={property=>setFilters({...filters,property})}/><Select label="All room types" value={filters.roomType} values={roomTypes} onChange={roomType=>setFilters({...filters,roomType})}/><button className="secondary" onClick={()=>setFilters({search:'',status:'',property:'',roomType:''})}>Clear</button></div>
      {visible.length?<div className="unit-card-grid">{visible.map(unit=><UnitCard key={unit.id} unit={unit} onConfigure={()=>setSelectedUnitId(unit.id)} onAssign={()=>setAssigningUnit(unit)}/>)}</div>:<EmptyState/>}
    </section>
    <button className="reset-demo" onClick={resetDemo}><RotateCcw size={14}/> Reset demo data</button>
    {selectedUnit&&<RoomManager unit={selectedUnit} onClose={()=>setSelectedUnitId(null)} onAdd={room=>addRoom(selectedUnit.id,{...room,occupants:[]})} onUpdate={(roomId,details)=>updateRoom(selectedUnit.id,roomId,details)}/>}
    {assigningUnit&&<TenantAssignmentDialog units={units} tenants={tenants} initialUnitId={assigningUnit.id} onAssign={assignTenant} onCreate={addTenantToRoom} onClose={()=>setAssigningUnit(null)}/>}
  </>
}

function Select({label,value,values,onChange}:{label:string;value:string;values:readonly string[];onChange:(value:string)=>void}){return <select aria-label={label} value={value} onChange={event=>onChange(event.target.value)}><option value="">{label}</option>{values.map(item=><option key={item}>{item}</option>)}</select>}

function UnitCard({unit,onConfigure,onAssign}:{unit:Unit;onConfigure:()=>void;onAssign:()=>void}){
  const summary=roomSummary([unit])
  return <article className="unit-card"><div className="unit-card-head"><div><span className="unit-code">{unit.code}</span><span>{unit.property}</span></div><Badge value={unit.status}/></div><div className="unit-card-meta"><span>{unit.layout}</span><strong>{summary.occupants}/{summary.capacity} spaces filled</strong></div><div className="room-list">{unit.rooms.map(room=><div className="room-row" key={room.id}><div><strong>{room.name}</strong><span>{room.type} · {room.occupants.length}/{room.capacity} people</span></div><span>{money(room.rate)}</span></div>)}</div><div className="unit-card-foot"><strong>{money(unit.monthlyRate)} <span>/ month</span></strong><div className="card-actions"><button className="secondary" onClick={onConfigure}>Manage rooms</button><button className="primary compact" onClick={onAssign}>Assign tenant</button></div></div></article>
}

type RoomDetails=Pick<Room,'name'|'type'|'capacity'|'rate'>
function RoomManager({unit,onClose,onAdd,onUpdate}:{unit:Unit;onClose:()=>void;onAdd:(room:RoomDetails)=>void;onUpdate:(roomId:string,room:RoomDetails)=>void}){
  const [editing,setEditing]=useState<Room|null>(null)
  const [adding,setAdding]=useState(false)
  const [error,setError]=useState('')
  const save=(details:RoomDetails)=>{try{if(editing)onUpdate(editing.id,details);else onAdd(details);setEditing(null);setAdding(false);setError('')}catch(cause){setError(cause instanceof Error?cause.message:'The room could not be saved.')}}
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><div className="modal room-manager" role="dialog" aria-modal="true" aria-labelledby="room-title"><div className="dialog-head"><div><p className="eyebrow">Unit configuration</p><h2 id="room-title">Rooms in {unit.code}</h2><p>{unit.property} · {unit.rooms.length} room(s) · {roomSummary([unit]).capacity} total spaces</p></div><button type="button" className="icon-button close-dialog" onClick={onClose} aria-label="Close">×</button></div>
    {!adding&&!editing&&<><div className="managed-room-list">{unit.rooms.map(room=><div className="managed-room" key={room.id}><div><strong>{room.name}</strong><span>{room.type} room · {room.capacity} {room.capacity===1?'person':'people'} maximum · {money(room.rate)}/month</span><small>{room.occupants.length?`${room.occupants.length} assigned: ${room.occupants.join(', ')}`:'Currently empty'}</small></div><button className="secondary compact" onClick={()=>setEditing(room)}><Pencil size={14}/> Edit</button></div>)}</div><div className="notice-box">Room capacities are independent. A unit can combine a 6-person big room with smaller rooms, or use private rooms limited to one person each.</div><div className="dialog-actions"><button type="button" className="secondary" onClick={onClose}>Done</button><button type="button" className="primary" onClick={()=>setAdding(true)}><Plus size={15}/> Add another room</button></div></>}
    {(adding||editing)&&<RoomForm room={editing} error={error} onCancel={()=>{setEditing(null);setAdding(false);setError('')}} onSave={save}/>}
  </div></div>
}

function RoomForm({room,error,onCancel,onSave}:{room:Room|null;error:string;onCancel:()=>void;onSave:(details:RoomDetails)=>void}){
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const form=new FormData(event.currentTarget);onSave({name:String(form.get('name')),type:String(form.get('type')) as RoomType,capacity:Number(form.get('capacity')),rate:Number(form.get('rate'))})}
  return <form onSubmit={submit}><div className="form-grid"><label>Room name<input name="name" required autoFocus defaultValue={room?.name||''} placeholder="e.g. Big Shared Room"/></label><label>Room size / type<select name="type" defaultValue={room?.type||'Large'}>{roomTypes.map(type=><option key={type}>{type}</option>)}</select></label><label>Maximum occupants<input name="capacity" type="number" min={Math.max(1,room?.occupants.length||1)} max="20" defaultValue={room?.capacity||1} required/><small className="field-hint">The number of people this room can house.</small></label><label>Monthly room rate<input name="rate" type="number" min="0" step="500" defaultValue={room?.rate||0} required/></label></div>{error&&<p className="form-error" role="alert">{error}</p>}<p className="form-help">{room?.occupants.length?`This room already has ${room.occupants.length} assigned occupant(s), so its capacity cannot be set lower.`:'Occupants are added through Assign tenant after the room is saved.'}</p><div className="dialog-actions"><button type="button" className="secondary" onClick={onCancel}>Back</button><button className="primary" type="submit">{room?'Save room changes':'Add room'}</button></div></form>
}
