import { Building2, CircleAlert, PhilippinePeso, Wrench } from 'lucide-react'
import { useAppStore } from '../store/AppStore'
import { roomSummary } from '../domain/filterRecords'
import { PageHeader, StatCard, StatsGrid } from '../components/ui'

export function DashboardPage(){const {units}=useAppStore();const rooms=roomSummary(units);return <>
  <PageHeader eyebrow="Portfolio overview" title="Good morning, Jose" copy="Here’s what is happening across your rental units today."/>
  <StatsGrid><StatCard label="Condominium units" value={units.length} icon={<Building2 size={17}/>} note={`${units.filter(u=>u.status==='Occupied').length} currently occupied`}/><StatCard label="Room capacity" value={rooms.capacity} icon={<UsersIcon/>} note={`${rooms.available} available spaces`}/><StatCard label="Monthly rent" value="₱648K" icon={<PhilippinePeso size={17}/>} note="Expected portfolio income"/><StatCard label="Open requests" value="3" icon={<Wrench size={17}/>} note="1 marked urgent"/></StatsGrid>
  <div className="dashboard-grid"><section className="panel"><div className="section-head"><div><h2>Unit occupancy</h2><p>Current portfolio distribution</p></div></div><div className="occupancy"><div className="donut-wrap"><div className="donut"/><div className="donut-label"><strong>75%</strong>occupied</div></div><div className="legend"><Legend color="#19756f" label="Occupied" value={18}/><Legend color="#2676aa" label="Reserved" value={3}/><Legend color="#d8e0e6" label="Vacant" value={3}/></div></div></section><section className="panel"><div className="section-head"><div><h2>Needs attention</h2><p>Operational priorities</p></div></div><div className="activity-list"><Activity icon={<CircleAlert size={15}/>} text="₱60,000 in outstanding rent" time="2 accounts"/><Activity icon={<Wrench size={15}/>} text="Urgent repair in Unit B-0802" time="Reported Jul 14"/><Activity icon={<Building2 size={15}/>} text={`${rooms.available} room spaces available`} time="Across the portfolio"/></div></section></div>
  </>}
function UsersIcon(){return <span aria-hidden="true">♙</span>}
function Legend({color,label,value}:{color:string;label:string;value:number}){return <div className="legend-row"><span className="dot" style={{background:color}}/><span>{label}</span><strong>{value}</strong></div>}
function Activity({icon,text,time}:{icon:React.ReactNode;text:string;time:string}){return <div className="activity"><div className="activity-icon">{icon}</div><div><p>{text}</p><time>{time}</time></div></div>}
