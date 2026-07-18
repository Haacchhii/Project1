import type { Room, Unit } from './types'

export type RoomDetails = Pick<Room, 'name' | 'type' | 'capacity' | 'rate'>

export function unitRateAtFullCapacity(rooms: Room[]) {
  return rooms.reduce((sum, room) => sum + room.rate * room.capacity, 0)
}

export function roomRateForTenant(units: Unit[], tenant: { unit: string; room?: string }) {
  return units.find(unit => unit.code === tenant.unit)?.rooms.find(room => room.name === tenant.room)?.rate ?? 0
}

export function updateRoom(units: Unit[], unitId: string, roomId: string, details: RoomDetails): Unit[] {
  const unit = units.find(record => record.id === unitId)
  const room = unit?.rooms.find(record => record.id === roomId)
  if (!unit || !room) throw new Error('Unit or room was not found.')
  if (details.capacity < room.occupants.length) {
    throw new Error(`Capacity cannot be lower than the ${room.occupants.length} assigned occupants.`)
  }

  return units.map(record => {
    if (record.id !== unitId) return record
    const rooms = record.rooms.map(candidate => candidate.id === roomId ? { ...candidate, ...details } : candidate)
    return { ...record, rooms, monthlyRate: unitRateAtFullCapacity(rooms) }
  })
}
