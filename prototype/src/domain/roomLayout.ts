import type { Room, Unit } from './types'

export type RoomDetails = Pick<Room, 'name' | 'type' | 'capacity' | 'rate'>

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
    return { ...record, rooms, monthlyRate: rooms.reduce((sum, candidate) => sum + candidate.rate, 0) }
  })
}
