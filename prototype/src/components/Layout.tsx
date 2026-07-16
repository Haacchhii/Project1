import { Bell, Building2, CircleHelp, FileText, LayoutDashboard, Menu, PhilippinePeso, Search, TrendingUp, Users, Wrench, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const links=[['/','Dashboard',LayoutDashboard],['/units','Units',Building2],['/tenants','Tenants',Users],['/leases','Leases',FileText],['/payments','Payments',PhilippinePeso],['/maintenance','Maintenance',Wrench],['/reports','Reports',TrendingUp]] as const
export function Layout(){
  const [open,setOpen]=useState(false)
  return <div className="app-shell">
    <aside className={`sidebar ${open?'open':''}`}>
      <div className="brand"><div className="brand-mark">UF</div><div><strong>UnitFlow</strong><span>Property management</span></div><button className="mobile-close" aria-label="Close navigation" onClick={()=>setOpen(false)}><X size={18}/></button></div>
      <nav aria-label="Primary navigation">{links.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`nav-item ${isActive?'active':''}`} onClick={()=>setOpen(false)}><Icon size={18}/>{label}</NavLink>)}</nav>
      <div className="sidebar-foot"><div className="user-avatar">JI</div><div><strong>Jose Iturralde</strong><span>Administrator</span></div></div>
    </aside>
    <main><header className="topbar"><button className="menu-button" aria-label="Open navigation" onClick={()=>setOpen(true)}><Menu size={20}/></button><div className="mobile-brand">UnitFlow</div><label className="global-search"><Search size={17}/><input placeholder="Search units, tenants, leases..." aria-label="Global search"/></label><button className="icon-button notification" aria-label="Notifications"><Bell size={19}/><span className="notification-dot"/></button><button className="help-button"><CircleHelp size={15}/> Help</button></header><div className="content"><Outlet/></div></main>
  </div>
}
