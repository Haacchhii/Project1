import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { UnitsPage } from './pages/UnitsPage'
import { RecordsPage } from './pages/RecordsPage'
import { ReportsPage } from './pages/ReportsPage'
import { ViewingsPage } from './pages/ViewingsPage'
import { TenantDetailPage } from './pages/TenantDetailPage'

export function App(){return <Routes><Route element={<Layout/>}><Route index element={<DashboardPage/>}/><Route path="viewings" element={<ViewingsPage/>}/><Route path="units" element={<UnitsPage/>}/><Route path="tenants" element={<RecordsPage kind="tenants"/>}/><Route path="tenants/:tenantId" element={<TenantDetailPage/>}/><Route path="leases" element={<RecordsPage kind="leases"/>}/><Route path="payments" element={<RecordsPage kind="payments"/>}/><Route path="maintenance" element={<RecordsPage kind="maintenance"/>}/><Route path="reports" element={<ReportsPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
