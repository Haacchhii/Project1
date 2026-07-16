import type { ReactNode } from 'react'

export const money=(value:number)=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(value)
export function PageHeader({eyebrow,title,copy,action}:{eyebrow:string;title:string;copy:string;action?:ReactNode}){return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>{action}</div>}
export function StatCard({label,value,icon,note}:{label:string;value:ReactNode;icon:ReactNode;note:string}){return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></article>}
export function StatsGrid({children}:{children:ReactNode}){return <section className="stats-grid page-stats">{children}</section>}
export function Badge({value}:{value:string}){return <span className={`badge ${value.toLowerCase()}`}>{value}</span>}
export function EmptyState(){return <div className="empty-state"><strong>No matching records</strong>Try removing one or more filters.</div>}
