import type { Tenant, Unit } from './types'

export interface TenantAssignmentInput {
  name: string
  contact: string
  moveIn: string
  unitId: string
  roomId: string
}

export function assignTenant(units: Unit[], tenants: Tenant[], tenantId: string, unitId: string, roomId: string) {
  const tenant = tenants.find(record => record.id === tenantId)
  const unit = units.find(record => record.id === unitId)
  const room = unit?.rooms.find(record => record.id === roomId)
  if (!tenant || !unit || !room) throw new Error('Tenant, unit, or room was not found.')

  const alreadyAssigned = room.occupants.includes(tenant.name)
  if (!alreadyAssigned && room.occupants.length >= room.capacity) throw new Error(`${room.name} is already full.`)

  return {
    units: units.map(record => ({
      ...record,
      status: record.id === unitId ? 'Occupied' as const : record.status,
      rooms: record.rooms.map(candidate => ({
        ...candidate,
        occupants: candidate.id === roomId
          ? [...candidate.occupants.filter(name => name !== tenant.name), tenant.name]
          : candidate.occupants.filter(name => name !== tenant.name),
      })),
    })),
    tenants: tenants.map(record => record.id === tenantId ? {
      ...record,
      unit: unit.code,
      room: room.name,
      status: 'Active' as const,
    } : record),
  }
}

export function createAndAssignTenant(units: Unit[], tenants: Tenant[], input: TenantAssignmentInput, id: string = crypto.randomUUID()) {
  const tenant: Tenant = {
    id,
    name: input.name.trim(),
    contact: input.contact.trim(),
    moveIn: input.moveIn,
    unit: '',
    room: '',
    balance: 0,
    status: 'Active',
  }
  return assignTenant(units, [...tenants, tenant], id, input.unitId, input.roomId)
}
