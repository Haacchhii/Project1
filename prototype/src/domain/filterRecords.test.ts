import { describe, expect, it } from 'vitest'
import { filterRecords, roomSummary } from './filterRecords'
import type { Unit } from './types'

const units: Unit[] = [
  { id: 'u1', code: 'A-1204', property: 'Azure Residences', layout: 'Shared', status: 'Occupied', monthlyRate: 37000, rooms: [{ id: 'r1', name: 'Large Room', type: 'Large', capacity: 4, rate: 16000, occupants: ['Mika Santos'] }] },
  { id: 'u2', code: 'B-1711', property: 'Shore Tower B', layout: 'Custom', status: 'Vacant', monthlyRate: 29000, rooms: [{ id: 'r2', name: 'Room B', type: 'Small', capacity: 1, rate: 13000, occupants: [] }] },
]

describe('filterRecords', () => {
  it('combines search, status, property, and room type filters', () => {
    expect(filterRecords(units, { search: 'mika', status: 'Occupied', property: 'Azure Residences', roomType: 'Large' })).toEqual([units[0]])
  })

  it('returns every record when all filters are empty', () => {
    expect(filterRecords(units, {})).toHaveLength(2)
  })
})

describe('roomSummary', () => {
  it('calculates rooms, capacity, occupants, and available spaces', () => {
    expect(roomSummary(units)).toEqual({ rooms: 2, capacity: 5, occupants: 1, available: 4 })
  })
})
