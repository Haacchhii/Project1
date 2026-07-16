import { useMemo, useState, type FormEvent } from 'react'
import type { Tenant, Unit } from '../domain/types'

interface Props {
  units: Unit[]; tenants: Tenant[]; initialTenantId?: string; initialUnitId?: string; defaultToNew?: boolean
  onAssign: (tenantId:string,unitId:string,roomId:string)=>void
  onCreate: (input:{name:string;contact:string;moveIn:string;unitId:string;roomId:string})=>void
  onClose: ()=>void
}

export function TenantAssignmentDialog({units,tenants,initialTenantId='',initialUnitId='',defaultToNew=false,onAssign,onCreate,onClose}:Props){
  const [kind,setKind]=useState(defaultToNew?'new':'existing')
  const [unitId,setUnitId]=useState(initialUnitId || units[0]?.id || '')
  const unit=useMemo(()=>units.find(record=>record.id===unitId),[units,unitId])
  const availableRooms=unit?.rooms.filter(room=>room.occupants.length<room.capacity || tenants.find(t=>t.id===initialTenantId)?.room===room.name) || []
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const form=new FormData(event.currentTarget);const roomId=String(form.get('roomId'));if(kind==='existing')onAssign(String(form.get('tenantId')),unitId,roomId);else onCreate({name:String(form.get('name')),contact:String(form.get('contact')),moveIn:String(form.get('moveIn')),unitId,roomId});onClose()}
  return <div className="modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="assign-title"><form onSubmit={submit}><div className="dialog-head"><div><p className="eyebrow">Connected occupancy</p><h2 id="assign-title">Assign a tenant to a room</h2></div><button type="button" className="icon-button close-dialog" onClick={onClose} aria-label="Close">×</button></div>
    <div className="choice-tabs" role="group" aria-label="Tenant type"><button type="button" className={kind==='existing'?'active':''} onClick={()=>setKind('existing')}>Existing tenant</button><button type="button" className={kind==='new'?'active':''} onClick={()=>setKind('new')}>New tenant</button></div>
    {kind==='existing'?<label>Choose tenant<select name="tenantId" defaultValue={initialTenantId} required><option value="" disabled>Select a tenant</option>{tenants.map(tenant=><option key={tenant.id} value={tenant.id}>{tenant.name}{tenant.unit?` — ${tenant.unit}`:''}</option>)}</select></label>:<div className="form-grid"><label>Full name<input name="name" required autoFocus placeholder="Tenant's full name"/></label><label>Contact number<input name="contact" required placeholder="09XX XXX XXXX"/></label><label>Move-in date<input name="moveIn" type="date" required/></label></div>}
    <div className="form-grid"><label>Unit<select value={unitId} onChange={event=>setUnitId(event.target.value)} required>{units.map(record=><option key={record.id} value={record.id}>{record.code} · {record.property}</option>)}</select></label><label>Available room<select key={unitId} name="roomId" required defaultValue=""><option value="" disabled>Select a room</option>{availableRooms.map(room=><option key={room.id} value={room.id}>{room.name} · {room.capacity-room.occupants.length} space(s)</option>)}</select></label></div>
    {!availableRooms.length&&<p className="form-error" role="alert">This unit has no available rooms. Choose another unit.</p>}<p className="form-help">Saving here automatically updates both the Units and Tenants pages.</p><div className="dialog-actions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary" type="submit" disabled={!availableRooms.length}>{kind==='new'?'Add and assign tenant':'Save assignment'}</button></div>
  </form></div></div>
}
