import { describe, expect, it } from 'vitest'
import { initialUnits } from '../data/mockData'
import { roomRateForTenant, updateRoom } from './roomLayout'

describe('room layout configuration', () => {
  it('updates one room independently and recalculates the unit rent', () => {
    const units = updateRoom(initialUnits, 'u1', 'r1', {
      name: 'Big Shared Room',
      type: 'Large',
      capacity: 6,
      rate: 18000,
    })

    const unit = units.find(record => record.id === 'u1')!
    expect(unit.rooms.find(room => room.id === 'r1')).toMatchObject({
      name: 'Big Shared Room',
      capacity: 6,
      rate: 18000,
    })
    expect(unit.rooms.find(room => room.id === 'r2')?.capacity).toBe(initialUnits[0].rooms[1].capacity)
    expect(unit.monthlyRate).toBe(unit.rooms.reduce((sum, room) => sum + room.rate * room.capacity, 0))
  })

  it('does not allow capacity below the number of assigned occupants', () => {
    expect(() => updateRoom(initialUnits, 'u1', 'r1', {
      name: 'Large Room',
      type: 'Large',
      capacity: 2,
      rate: 16000,
    })).toThrow('Capacity cannot be lower than the 3 assigned occupants.')
  })

  it('finds the default per-person rate for a tenant room', () => {
    expect(roomRateForTenant(initialUnits, { unit: 'A-1204', room: 'Big Shared Room' })).toBe(16000)
  })
})
