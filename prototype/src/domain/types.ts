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

export interface Tenant { id: string; name: string; contact: string; email?: string; unit: string; room?: string; moveIn: string; balance: number; deposit: number; status: 'Active' | 'Pending' | 'Moved out' }
export interface Lease { id: string; tenantId: string; tenant: string; unit: string; start: string; end: string; rate: number; deposit: number; initialPayment: number; signedCopyName?: string; status: 'Draft' | 'Active' | 'Expiring' | 'Ended' | 'Pending' }
export interface Payment { id: string; reference: string; tenantId: string; tenant: string; unit: string; billingPeriod: string; transferDate: string; due: string; amount: number; proofName?: string; status: 'Paid' | 'Partial' | 'Pending' | 'Overdue' }
export type ExpensePayer='Owner'|'Tenant deposit'|'Shared'
export interface Maintenance { id: string; ticket: string; unitId: string; unit: string; tenantId?: string; issue: string; category: string; reported: string; amount: number; tenantShare: number; payer: ExpensePayer; evidenceName?: string; priority: 'Urgent' | 'Normal' | 'Low'; status: 'Open' | 'Scheduled' | 'Completed' }
export interface Viewing { id:string;prospectName:string;contact:string;date:string;time:string;budget:number;stayMonths:number;notes:string;suggestedUnitIds:string[];status:'Scheduled'|'Completed'|'Converted'|'Cancelled'|'Declined' }
export interface ContractTemplate { name:string;updatedAt:string }
export interface DepositEntry { id:string;tenantId:string;maintenanceId:string;date:string;description:string;amount:number;evidenceName?:string }
export interface AppData { units:Unit[];tenants:Tenant[];viewings:Viewing[];leases:Lease[];payments:Payment[];maintenance:Maintenance[];depositEntries:DepositEntry[];contractTemplate:ContractTemplate }

export interface UnitFilters { search?: string; status?: string; property?: string; roomType?: string }
