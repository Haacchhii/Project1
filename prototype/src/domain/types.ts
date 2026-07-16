export type UnitStatus = 'Occupied' | 'Vacant' | 'Reserved'
export type RoomType = 'Large' | 'Medium' | 'Small' | 'Studio' | 'Custom'

export interface Room {
  id: string
  name: string
  type: RoomType
  capacity: number
  rate: number
  occupants: string[]
}

export interface Unit {
  id: string
  code: string
  property: string
  layout: string
  status: UnitStatus
  monthlyRate: number
  rooms: Room[]
}

export interface Tenant { id: string; name: string; contact: string; unit: string; room?: string; moveIn: string; balance: number; status: 'Active' | 'Pending' }
export interface Lease { id: string; tenant: string; unit: string; start: string; end: string; rate: number; status: 'Active' | 'Expiring' | 'Pending' }
export interface Payment { id: string; reference: string; tenant: string; unit: string; due: string; amount: number; status: 'Paid' | 'Pending' | 'Overdue' }
export interface Maintenance { id: string; ticket: string; unit: string; issue: string; reported: string; priority: 'Urgent' | 'Normal' | 'Low'; status: 'Open' | 'Scheduled' | 'Completed' }

export interface UnitFilters { search?: string; status?: string; property?: string; roomType?: string }
