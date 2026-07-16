import type { Unit, UnitFilters } from './types'

const normalize = (value: unknown) => String(value ?? '').trim().toLowerCase()

export function filterRecords(units: Unit[], filters: UnitFilters): Unit[] {
  const search = normalize(filters.search)
  return units.filter((unit) => {
    const searchable = normalize(JSON.stringify(unit))
    return (!search || searchable.includes(search))
      && (!filters.status || unit.status === filters.status)
      && (!filters.property || unit.property === filters.property)
      && (!filters.roomType || unit.rooms.some((room) => room.type === filters.roomType))
  })
}

export function roomSummary(units: Unit[]) {
  const rooms = units.flatMap((unit) => unit.rooms)
  const capacity = rooms.reduce((sum, room) => sum + room.capacity, 0)
  const occupants = rooms.reduce((sum, room) => sum + room.occupants.length, 0)
  return { rooms: rooms.length, capacity, occupants, available: Math.max(0, capacity - occupants) }
}
