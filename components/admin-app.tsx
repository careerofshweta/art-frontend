"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type NavItem = { slug: string; label: string; icon: string; group?: string };
const navigation: NavItem[] = [
  { slug:"dashboard", label:"Dashboard", icon:"grid" },
  { slug:"tenants", label:"Tenants", icon:"users" },
  { slug:"subscriptions", label:"Subscriptions", icon:"card" },
  { slug:"billing", label:"Billing", icon:"card" },
  { slug:"analytics", label:"Analytics", icon:"chart" },
  { slug:"platform-settings", label:"Platform Settings", icon:"gear" },
  { slug:"storage", label:"Storage", icon:"database" },
  { slug:"smtp", label:"SMTP", icon:"gear" },
  { slug:"payment-gateways", label:"Payment Gateways", icon:"card" },
  { slug:"backups", label:"Backup & Restore", icon:"database" },
  { slug:"audit-logs", label:"Audit Logs", icon:"shield" },
  { slug:"branding", label:"Branding", icon:"gear" },
  { slug:"security", label:"Security", icon:"shield" },
  { slug:"users-roles", label:"Users & Roles", icon:"users" },
  { slug:"integrations", label:"Integrations", icon:"gear" },
  { slug:"reports", label:"Reports", icon:"chart" },
  { slug:"system-health", label:"System Status", icon:"chart" },
  { slug:"support-tickets", label:"Support Tickets", icon:"users" },
  { slug:"settings", label:"Settings", icon:"gear" },
];

const extraPages = [
  "arr-dashboard","global-configuration","file-storage","email-templates","backup-history",
  "restore-wizard","activity-logs","security-dashboard","login-monitoring","roles-permissions",
  "custom-domains","api-keys","system-updates","notifications","preferences","database-schedules",
  "database-recovery","user-sessions","webhooks","multi-language","tax-billing","maintenance",
  "open-meters","shutdown-mode","admin-profile",
];
export const pageSlugs = [...navigation.map((n) => n.slug), ...extraPages];

const pageMeta: Record<string, { title: string; crumb?: string; subtitle?: string }> = {
  dashboard:{ title:"SaaS Dashboard", subtitle:"Here’s what’s happening with your platform." },
  tenants:{ title:"Tenant Management", subtitle:"Manage every organization using your platform." },
  subscriptions:{ title:"Subscription Plans", subtitle:"Create flexible plans that scale with your customers." },
  billing:{ title:"Billing & Invoices", subtitle:"Track transactions and platform revenue." },
  analytics:{ title:"Revenue Analytics", subtitle:"Monitor financial performance and recurring growth." },
  "arr-dashboard":{ title:"MRR / ARR Dashboard", subtitle:"Subscription metrics and revenue momentum." },
  "platform-settings":{ title:"Platform Settings", subtitle:"Control the core experience across all tenants." },
  "global-configuration":{ title:"Global Configuration", subtitle:"Manage shared platform values and policies." },
  storage:{ title:"Storage Management", subtitle:"Monitor and allocate tenant storage." },
  "file-storage":{ title:"File Storage Analytics", subtitle:"Understand file usage and growth." },
  smtp:{ title:"SMTP Configuration", subtitle:"Configure the platform email delivery service." },
  "email-templates":{ title:"Email Templates", subtitle:"Manage transactional messaging." },
  "payment-gateways":{ title:"Payment Gateways", subtitle:"Connect and manage payment providers." },
  backups:{ title:"Backup & Restore", subtitle:"Protect platform data with scheduled backups." },
  "backup-history":{ title:"Backup History", subtitle:"Review all completed data backups." },
  "restore-wizard":{ title:"Restore Wizard", subtitle:"Recover data safely from a backup point." },
  "audit-logs":{ title:"Audit Logs", subtitle:"Trace sensitive administrative actions." },
  "activity-logs":{ title:"Activity Logs", subtitle:"Review recent events across the platform." },
  security:{ title:"Security Center", subtitle:"Keep your platform and tenants protected." },
  "security-dashboard":{ title:"Security Dashboard", subtitle:"Review risk signals and security posture." },
  "login-monitoring":{ title:"Login Monitoring", subtitle:"Monitor authentication events and anomalies." },
  "users-roles":{ title:"Users & Roles", subtitle:"Manage administrative access." },
  "roles-permissions":{ title:"Roles & Permissions", subtitle:"Define granular access controls." },
  branding:{ title:"Branding & White Label", subtitle:"Customize your platform identity." },
  "custom-domains":{ title:"Custom Domains", subtitle:"Manage tenant and platform domains." },
  integrations:{ title:"API Keys & Integrations", subtitle:"Connect external services securely." },
  "api-keys":{ title:"API Keys & Integrations", subtitle:"Manage developer access and credentials." },
  "system-health":{ title:"System Health", subtitle:"Real-time service performance and availability." },
  "support-tickets":{ title:"Support Tickets", subtitle:"Resolve customer issues efficiently." },
  notifications:{ title:"Notification Center", subtitle:"Your latest platform alerts and events." },
  "system-updates":{ title:"System Updates", subtitle:"Manage platform version and releases." },
  preferences:{ title:"Preferences", subtitle:"Personalize your admin workspace." },
  reports:{ title:"Reports & Exports", subtitle:"Generate and download platform reports." },
  "database-schedules":{ title:"Database Backup Schedule", subtitle:"Automate recurring database protection." },
  "database-recovery":{ title:"Database Recovery", subtitle:"Restore databases to a verified point." },
  "user-sessions":{ title:"User Sessions", subtitle:"Monitor active administrator sessions." },
  webhooks:{ title:"Webhook Settings", subtitle:"Configure real-time event delivery." },
  "multi-language":{ title:"Multi-language Settings", subtitle:"Manage languages and localization." },
  "tax-billing":{ title:"Tax & Billing Settings", subtitle:"Set tax rules and invoice preferences." },
  maintenance:{ title:"Maintenance Mode", subtitle:"Control planned platform downtime." },
  "open-meters":{ title:"Open Meters", subtitle:"Configure usage-based metering." },
  "shutdown-mode":{ title:"Shutdown Mode", subtitle:"Temporarily restrict platform access." },
  "admin-profile":{ title:"Super Admin Profile", subtitle:"Manage your account details." },
  settings:{ title:"Settings", subtitle:"Configure advanced platform preferences." },
};

export function AdminApp({ slug }: { slug: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const meta = pageMeta[slug] || pageMeta.dashboard;
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Sidebar slug={slug} open={menuOpen} close={() => setMenuOpen(false)} />
      <div className="min-h-screen md:pl-[230px]">
        <Header title={meta.title} onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} onNotify={() => setNotifyOpen(!notifyOpen)} notifyOpen={notifyOpen} />
        <main className="page-enter mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">
          <PageIntro subtitle={meta.subtitle} slug={slug} />
          <PageContent slug={slug} />
        </main>
      </div>
      {searchOpen && <SearchModal close={() => setSearchOpen(false)} />}
    </div>
  );
}

function Sidebar({ slug, open, close }: { slug:string; open:boolean; close:()=>void }) {
  return <>
    {open && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] md:hidden" onClick={close}/>}
    <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-[230px] flex-col bg-[#121b3e] text-white shadow-2xl transition-transform duration-300 md:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-[72px] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <div className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-violet-500/20 text-violet-300"><Icon name="shield" className="h-[22px] w-[22px]"/></div>
          <div><div className="text-[15px] font-extrabold tracking-tight">Artistry</div><div className="text-[9px] font-semibold uppercase tracking-[.2em] text-slate-400">Super Admin</div></div>
        </Link>
        <button className="md:hidden" onClick={close}><Icon name="x"/></button>
      </div>
      <div className="mx-4 mb-3 h-px bg-white/8"/>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {navigation.map((item) => {
          const active = slug === item.slug || (slug === "arr-dashboard" && item.slug === "analytics") || (["file-storage"].includes(slug) && item.slug === "storage") || (extraPages.includes(slug) && related(slug) === item.slug);
          return <Link key={item.slug} href={item.slug === "dashboard" ? "/" : `/${item.slug}`} onClick={close} className={cn("group flex h-[36px] items-center gap-3 rounded-lg px-3 text-[11px] font-semibold transition-all", active ? "bg-[#6c3df4] text-white shadow-[0_7px_18px_rgba(108,61,244,.35)]" : "text-slate-300 hover:bg-white/8 hover:text-white")}>
            <Icon name={item.icon} className="h-[15px] w-[15px] opacity-80"/><span>{item.label}</span>
          </Link>;
        })}
      </nav>
      <Link href="/admin-profile" className="m-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
        <Avatar/><div className="min-w-0"><p className="truncate text-[11px] font-bold">Aryan Sharma</p><p className="text-[9px] text-slate-400">Super Administrator</p></div>
      </Link>
    </aside>
  </>;
}

function related(slug:string) {
  const map:Record<string,string> = {
    "global-configuration":"platform-settings","email-templates":"smtp","backup-history":"backups","restore-wizard":"backups",
    "activity-logs":"audit-logs","security-dashboard":"security","login-monitoring":"security","roles-permissions":"users-roles",
    "custom-domains":"branding","api-keys":"integrations","system-updates":"system-health","notifications":"settings","preferences":"settings",
    "database-schedules":"backups","database-recovery":"backups","user-sessions":"security","webhooks":"integrations","multi-language":"settings",
    "tax-billing":"billing","maintenance":"settings","open-meters":"billing","shutdown-mode":"settings","admin-profile":"settings"
  }; return map[slug];
}

function Header({ title, onMenu, onSearch, onNotify, notifyOpen }: { title:string; onMenu:()=>void; onSearch:()=>void; onNotify:()=>void; notifyOpen:boolean }) {
  const pageNumber = Object.values(pageMeta).findIndex((page) => page.title === title) + 1;
  return <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#ececf3] bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-7">
    <div className="flex items-center gap-3">
      <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 md:hidden" onClick={onMenu}><Icon name="menu"/></button>
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 text-[10px] font-extrabold text-white">{String(Math.max(pageNumber, 1)).padStart(2,"0")}</div>
      <div><p className="text-[13px] font-extrabold text-[#24253d]">{title}</p><p className="hidden text-[10px] text-slate-400 sm:block">Super Admin / {title}</p></div>
    </div>
    <div className="relative flex items-center gap-2">
      <button onClick={onSearch} className="hidden h-9 w-52 items-center gap-2 rounded-lg bg-slate-50 px-3 text-[10px] text-slate-400 lg:flex"><Icon name="search" className="h-4 w-4"/>Search anything… <kbd className="ml-auto rounded border bg-white px-1.5 py-0.5">⌘K</kbd></button>
      <button onClick={onSearch} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-50 lg:hidden"><Icon name="search"/></button>
      <button onClick={onNotify} className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-50"><Icon name="bell"/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white"/></button>
      <Link href="/admin-profile" className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-50"><Avatar/><div className="hidden text-left sm:block"><p className="text-[10px] font-bold">Aryan Sharma</p><p className="text-[8px] text-slate-400">Super Admin</p></div></Link>
      <button className="grid h-9 w-7 place-items-center text-slate-400"><Icon name="dots"/></button>
      {notifyOpen && <Card className="absolute right-10 top-12 w-[310px] p-3 shadow-xl">
        <div className="flex items-center justify-between px-2 pb-2"><b className="text-xs">Notifications</b><Badge tone="purple">4 new</Badge></div>
        {["New tenant Art House joined","Monthly revenue target reached","Backup completed successfully"].map((x,i)=><div key={x} className="flex gap-3 rounded-lg p-2 hover:bg-slate-50"><span className={cn("mt-1 h-2 w-2 rounded-full",i?"bg-emerald-400":"bg-violet-500")}/><div><p className="text-[10px] font-semibold">{x}</p><p className="mt-1 text-[9px] text-slate-400">{i+2} minutes ago</p></div></div>)}
      </Card>}
    </div>
  </header>;
}

function Avatar(){ return <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f4b38f] to-[#5931b7] text-[10px] font-black text-white ring-2 ring-white">AS</div> }

function PageIntro({ subtitle, slug }: { subtitle?:string; slug:string }) {
  const actions = ["tenants","subscriptions","email-templates","users-roles"].includes(slug);
  return <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>{slug === "dashboard" && <p className="mb-1 text-[18px] font-extrabold tracking-tight sm:text-[22px]">Welcome back, Super Admin! 👋</p>}<p className={cn("text-[11px] text-slate-400", slug !== "dashboard" && "mt-1")}>{subtitle}</p></div>
    <div className="flex items-center gap-2">
      <button className="btn btn-outline">▣ &nbsp; 01 May, 2026 - 31 May, 2026</button>
      {actions && <Button>＋ Add New</Button>}
    </div>
  </div>;
}

function PageContent({ slug }: { slug:string }) {
  if (slug === "dashboard") return <Dashboard/>;
  if (slug === "analytics" || slug === "arr-dashboard") return <Analytics kind={slug}/>;
  if (slug === "tenants") return <Tenants/>;
  if (slug === "subscriptions") return <Subscriptions/>;
  if (slug === "billing") return <Billing/>;
  if (slug === "storage" || slug === "file-storage") return <Storage detailed={slug==="file-storage"}/>;
  if (slug === "system-health" || slug === "security-dashboard") return <Health security={slug==="security-dashboard"}/>;
  if (["audit-logs","activity-logs","login-monitoring","user-sessions","backup-history","support-tickets"].includes(slug)) return <DataLog kind={slug}/>;
  if (slug === "roles-permissions" || slug === "users-roles") return <Roles detailed={slug==="roles-permissions"}/>;
  if (slug === "reports") return <Reports/>;
  if (slug === "notifications") return <Notifications/>;
  if (slug === "admin-profile") return <Profile/>;
  if (slug === "payment-gateways" || slug === "integrations" || slug === "api-keys") return <Integrations kind={slug}/>;
  if (slug === "backup-history") return <DataLog kind={slug}/>;
  return <SettingsPage kind={slug}/>;
}

function Dashboard() {
  return <div className="space-y-4">
    <Stats items={[
      ["Total Tenants","86","+12%","purple"],["Active Tenants","74","+8%","purple"],["Total Users","12,845","+18%","purple"],["MRR","$48,750","+18%","red"]
    ]}/>
    <div className="grid gap-4 xl:grid-cols-[1.55fr_.75fr]"><LineChart title="Revenue Overview" value="$215,430" /><Donut title="Tenants by Plan"/></div>
    <div className="grid gap-4 lg:grid-cols-2"><RecentSignups/><HealthCompact/></div>
  </div>;
}

function Stats({ items }: { items:string[][] }) {
  return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{items.map(([label,value,growth,color])=><Card key={label} className="soft-hover p-4 sm:p-5">
    <p className="text-[10px] font-semibold text-slate-500">{label}</p><div className="mt-2 flex items-end justify-between"><strong className={cn("text-xl tracking-tight sm:text-2xl",color==="red"?"text-red-500":"text-[#5931d7]")}>{value}</strong><span className="text-[9px] font-bold text-emerald-500">{growth}</span></div>
  </Card>)}</div>;
}

function CardHead({ title, action }: { title:string; action?:React.ReactNode }) {
  return <div className="mb-4 flex items-center justify-between"><div><h3 className="text-[12px] font-extrabold">{title}</h3><p className="mt-1 text-[9px] text-slate-400">Updated just now</p></div>{action || <button className="text-slate-400"><Icon name="dots"/></button>}</div>;
}

function LineChart({ title, value="$215,430" }: {title:string;value?:string}) {
  return <Card className="p-4 sm:p-5"><CardHead title={title}/><div className="flex items-center gap-2"><b className="text-lg">{value}</b><Badge>↑ 15.6%</Badge></div>
    <div className="mt-5 h-36 w-full"><svg viewBox="0 0 700 160" className="h-full w-full" preserveAspectRatio="none">
      <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6c3df4" stopOpacity=".22"/><stop offset="1" stopColor="#6c3df4" stopOpacity="0"/></linearGradient></defs>
      {[25,65,105,145].map(y=><line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#eef0f5" strokeWidth="1"/>)}
      <path d="M0 132 L70 119 L140 92 L210 108 L280 65 L350 20 L420 94 L490 73 L560 60 L630 30 L700 12 L700 160 L0 160Z" fill="url(#area)"/>
      <path d="M0 132 L70 119 L140 92 L210 108 L280 65 L350 20 L420 94 L490 73 L560 60 L630 30 L700 12" fill="none" stroke="#6c3df4" strokeWidth="3"/>
      {[["0","132"],["140","92"],["280","65"],["350","20"],["420","94"],["700","12"]].map(([x,y])=><circle key={x} cx={x} cy={y} r="4" fill="#fff" stroke="#6c3df4" strokeWidth="3"/>)}
    </svg></div><div className="flex justify-between text-[8px] text-slate-400"><span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>31 May</span></div>
  </Card>;
}

function Donut({ title, center="86" }: {title:string;center?:string}) {
  const colors=["#6c3df4","#3487e8","#f4b33f","#f06442","#42bd8b"];
  return <Card className="p-4 sm:p-5"><CardHead title={title}/><div className="flex items-center justify-around gap-3">
    <div className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full" style={{background:"conic-gradient(#3188e8 0 25%,#6c3df4 25% 50%,#f5b33e 50% 70%,#f06243 70% 84%,#46bf8d 84%)"}}><div className="grid h-[74px] w-[74px] place-items-center rounded-full bg-white text-center"><div><b className="text-lg">{center}</b><p className="text-[8px] text-slate-400">Total</p></div></div></div>
    <div className="space-y-2">{["Enterprise 24","Professional 20","Standard 20","Basic 10","Trial 12"].map((x,i)=><p key={x} className="flex items-center gap-2 text-[9px] text-slate-500"><span className="h-2 w-2 rounded-full" style={{background:colors[i]}}/>{x}</p>)}</div>
  </div></Card>;
}

const signupRows=[["Orange Art Studio","2 mins ago"],["Art World Foundation","15 mins ago"],["Creative Minds Arts","35 mins ago"],["Golden Brush Academy","1 hour ago"]];
function RecentSignups(){return <Card className="p-4 sm:p-5"><CardHead title="Recent Signups"/><div className="space-y-1">{signupRows.map(([n,t],i)=><div key={n} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50"><span className={cn("grid h-7 w-7 place-items-center rounded-lg text-[10px]",i%2?"bg-orange-50 text-orange-500":"bg-violet-50 text-violet-500")}>▣</span><b className="text-[10px]">{n}</b><span className="ml-auto text-[9px] text-slate-400">{t}</span></div>)}</div></Card>}
function HealthCompact(){return <Card className="p-4 sm:p-5"><CardHead title="System Health"/><div className="space-y-1">{["Server Status","Database","Queue Worker","Storage Usage"].map((n,i)=><div key={n} className="flex items-center rounded-lg px-2 py-2 text-[10px]"><span className="mr-3 grid h-7 w-7 place-items-center rounded-lg bg-violet-50 text-violet-500">◈</span><b>{n}</b><span className={cn("ml-auto font-bold",i===3?"text-slate-600":"text-emerald-500")}>{i===3?"62%":"Healthy"}</span></div>)}</div></Card>}

function Table({ columns, rows }: { columns:string[]; rows:(string|React.ReactNode)[][] }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left"><thead><tr className="border-y border-slate-100 bg-slate-50/60">{columns.map(c=><th key={c} className="px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">{c}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-b border-slate-100 transition-colors hover:bg-violet-50/30">{row.map((cell,j)=><td key={j} className="px-4 py-3 text-[10px] text-slate-600">{cell}</td>)}</tr>)}</tbody></table></div>;
}
function Toolbar({ placeholder="Search..." }:{placeholder?:string}){return <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative"><Icon name="search" className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"/><input className="field max-w-[280px] pl-9" placeholder={placeholder}/></div><div className="flex gap-2"><Button variant="outline">☷ Filter</Button><Button variant="outline">⇩ Export</Button></div></div>}

function Tenants(){
 const names=["Orange Art Studio","Art World Foundation","Creative Minds Arts","ColorSplash Academy","Canvas Art School","Rising Art Hub"];
 return <Card className="p-4 sm:p-5"><Toolbar placeholder="Search tenants..."/><Table columns={["Tenant / Organization","Domain","Plan","Users","Status","Joined",""]} rows={names.map((n,i)=>[
  <div key={n} className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-50 text-violet-600">A</span><b>{n}</b></div>,
  n.toLowerCase().replaceAll(" ","")+".com",["Enterprise","Professional","Standard"][i%3],String(234-i*27),<Badge key="s">{i===5?"Trial":"Active"}</Badge>,"May "+(i+3)+", 2026",<button key="m"><Icon name="dots"/></button>
 ])}/><Pagination/></Card>;
}
function Pagination(){return <div className="flex items-center justify-between pt-4 text-[9px] text-slate-400"><span>Showing 1 to 6 of 86 results</span><div className="flex gap-1"><button className="btn btn-outline !min-h-7 !px-2">‹</button><button className="btn btn-primary !min-h-7 !px-3">1</button><button className="btn btn-outline !min-h-7 !px-3">2</button><button className="btn btn-outline !min-h-7 !px-2">›</button></div></div>}

function Subscriptions(){
 const plans=[["Enterprise","$299 / month","Unlimited","Advanced"],["Professional","$149 / month","100","Priority"],["Standard","$79 / month","50","Standard"],["Basic","$29 / month","10","Email"]];
 return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{plans.map((p,i)=><Card key={p[0]} className={cn("soft-hover relative overflow-hidden p-5",i===1&&"border-violet-300")} >{i===1&&<span className="absolute right-0 top-0 rounded-bl-lg bg-violet-600 px-3 py-1 text-[8px] font-bold text-white">POPULAR</span>}<p className="text-xs font-extrabold">{p[0]}</p><p className="mt-3 text-2xl font-black text-violet-600">{p[1].split(" ")[0]}</p><p className="text-[9px] text-slate-400">per month</p><div className="my-4 h-px bg-slate-100"/>{["Unlimited competitions",`${p[2]} team members`,`${p[3]} support`].map(x=><p className="my-2 text-[10px] text-slate-500" key={x}><span className="mr-2 text-emerald-500">✓</span>{x}</p>)}<Button variant="outline" className="mt-3 w-full">Edit Plan</Button></Card>)}</div>
 <Card className="p-5"><CardHead title="Feature Comparison"/><Table columns={["Feature","Basic","Standard","Professional","Enterprise"]} rows={["Custom branding","Unlimited participants","Advanced analytics","API access","Priority support"].map((x,i)=>[x,...[0,1,2,3].map(j=><span key={j} className={j>=i-1?"text-emerald-500":"text-red-400"}>{j>=i-1?"●":"○"}</span>)])}/></Card></div>
}
function Billing(){return <div className="space-y-4"><Stats items={[["Total Revenue","$1,250","+12%","purple"],["Paid","$845,120","+18%","purple"],["Pending","$120,340","+4%","red"],["Overdue","$35,660","-2%","red"]]}/><Card className="p-5"><CardHead title="Recent Invoices"/><Table columns={["Invoice #","Tenant","Amount","Status","Date"]} rows={["Orange Art School","Art World Foundation","Creative Minds Agency","Canvas Brush Academy","Golden Art Studio"].map((n,i)=>["INV-00"+(315-i),n,"$"+[299,149,79,299,149][i]+".00",<Badge key="b" tone={i===2?"amber":"green"}>{i===2?"Pending":"Paid"}</Badge>,"May "+(24-i)+", 2026"])}/><Pagination/></Card></div>}

function Analytics({kind}:{kind:string}){return <div className="space-y-4"><Stats items={kind==="arr-dashboard"?[["Total MRR","$48,750","+18%","purple"],["ARR","$585,000","+16%","purple"],["New MRR","$6,250","+12%","purple"],["Churn Rate","2.35%","-0.4%","red"]]:[["Total Revenue","$215,430","+15%","purple"],["Monthly Recurring","$48,750","+18%","red"],["Annual Recurring","$585,000","+16%","purple"],["Avg. Revenue","$2,505","+7%","purple"]]}/><div className="grid gap-4 lg:grid-cols-[1.5fr_.8fr]"><LineChart title="Revenue Growth"/><Donut title="Revenue by Plan" center="$215K"/></div><div className="grid gap-4 lg:grid-cols-2"><BarChart/><Card className="p-5"><CardHead title="Top Revenue Sources"/><Table columns={["Plan","Customers","MRR","Growth"]} rows={[["Enterprise","24","$21,520","+18%"],["Professional","20","$12,400","+14%"],["Standard","30","$9,120","+9%"]]}/></Card></div></div>}
function BarChart(){const vals=[58,88,44,95,63,110,74,122,92,135,108,146];return <Card className="p-5"><CardHead title="Monthly Revenue"/><div className="flex h-40 items-end gap-2 pt-5">{vals.map((v,i)=><div key={i} className="group flex flex-1 flex-col items-center justify-end"><div className="w-full max-w-5 rounded-t bg-violet-600 transition-all group-hover:bg-violet-400" style={{height:v}}/><span className="mt-2 text-[7px] text-slate-400">{i+1}</span></div>)}</div></Card>}

function Storage({detailed}:{detailed:boolean}){return <div className="space-y-4"><Stats items={detailed?[["Total Files","188,040","+8%","purple"],["Storage Used","320.5 GB","+14%","purple"],["Avg File Size","9.65 MB","+2%","purple"],["Bandwidth","1.8 TB","+11%","purple"]]:[["Total Storage","2.5 TB","+12%","purple"],["Used","1.47 TB","+6%","purple"],["Available","1.03 TB","41%","purple"],["Tenants","86","+12%","purple"]]}/><div className="grid gap-4 lg:grid-cols-2"><Donut title="Storage by Type" center={detailed?"320 GB":"2.5 TB"}/><LineChart title="Storage Growth" value="1.47 TB"/></div><Card className="p-5"><CardHead title="Storage by Tenant"/><Table columns={["Tenant","Plan","Usage","Limit","Utilization"]} rows={signupRows.map(([n],i)=>[n,["Enterprise","Professional","Standard"][i%3],[284,189,124,88][i]+" GB",[500,250,200,100][i]+" GB",<div key="p" className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-violet-600" style={{width:(45+i*12)+"%"}}/></div>])}/></Card></div>}

function Health({security}:{security:boolean}){const services=security?["Two Factor Authentication","Strong Password Policy","IP Whitelisting","Suspicious Logins"]:["API Server","Database Cluster","Redis Cache","Email Delivery","Storage Service","Queue Workers"];return <div className="space-y-4"><Stats items={security?[["Security Score","85/100","+5","purple"],["Open Alerts","4","-2","red"],["Blocked Today","126","+18%","purple"],["Admin 2FA","92%","+7%","purple"]]:[["Uptime","99.99%","+0.1%","purple"],["Response Time","128 ms","-8%","purple"],["Error Rate","0.03%","-12%","purple"],["Active Jobs","248","+7%","purple"]]}/><div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]"><Card className="p-5"><CardHead title={security?"Security Controls":"Services"}/><div className="space-y-2">{services.map((x,i)=><div key={x} className="flex items-center rounded-lg border border-slate-100 p-3"><span className="mr-3 h-2 w-2 rounded-full bg-emerald-400"/><b className="text-[10px]">{x}</b><Badge key="b" tone={i===3&&security?"amber":"green"}>{i===3&&security?"Review":"Healthy"}</Badge></div>)}</div></Card><LineChart title={security?"Security Events":"API Response Time"} value={security?"1,245":"128 ms"}/></div></div>}

const labels:Record<string,string[]> = {
 "audit-logs":["Admin","Action","Module","IP Address","Date"],
 "activity-logs":["User","Activity","Device","IP Address","Time"],
 "login-monitoring":["User","Location","Device","IP Address","Status"],
 "user-sessions":["User","Device / Browser","Location","Last Active",""],
 "backup-history":["Backup File","Size","Type","Status","Created"],
 "support-tickets":["Ticket","Customer","Priority","Status","Updated"]
};
function DataLog({kind}:{kind:string}){const cols=labels[kind]||labels["audit-logs"];return <Card className="p-5"><Toolbar placeholder={`Search ${pageMeta[kind]?.title.toLowerCase()}...`}/><Table columns={cols} rows={["Aryan Sharma","Sarah Miller","David Wilson","Lisa Anderson","Michael Chen","Emma Davis"].map((n,i)=>[<b key="n">{kind==="backup-history"?"backup_2026_05_"+(24-i)+".zip":kind==="support-tickets"?"#ART-"+(1048-i):n}</b>,kind==="backup-history"?[2.4,1.8,2.2,1.6,2.5,2.1][i]+" GB":kind==="support-tickets"?signupRows[i%4][0]:["Login successful","Updated tenant","Exported report","Changed settings"][i%4],kind==="support-tickets"?["High","Medium","Low"][i%3]:kind==="backup-history"?"Full Backup":["Chrome / macOS","Safari / iOS","Chrome / Windows"][i%3],kind==="support-tickets"?<Badge key="s" tone={i%3?"purple":"amber"}>{i%3?"In Progress":"Open"}</Badge>:kind==="backup-history"?<Badge key="s">Completed</Badge>:"192.168.1."+(10+i),kind==="user-sessions"?<Button key="r" variant="outline">Revoke</Button>:"May "+(24-i)+", 10:"+(12+i)+" AM"])}/><Pagination/></Card>}

function Roles({detailed}:{detailed:boolean}){return <div className="grid gap-4 lg:grid-cols-[.8fr_1.4fr]"><Card className="p-5"><CardHead title={detailed?"System Roles":"Admin Users"} action={<Button>＋ Add</Button>}/>{["Super Admin","Admin","Support Manager","Finance Manager","Viewer"].map((x,i)=><button key={x} className={cn("flex w-full items-center rounded-lg p-3 text-left text-[10px] font-bold",i===0?"bg-violet-50 text-violet-600":"hover:bg-slate-50")}><span className="mr-3 grid h-7 w-7 place-items-center rounded-lg bg-white shadow-sm"><Icon name="shield" className="h-3 w-3"/></span>{x}<span className="ml-auto text-slate-400">{[2,8,4,3,12][i]}</span></button>)}</Card><Card className="p-5"><CardHead title={detailed?"Permissions — Super Admin":"User Access"}/>{detailed?<div className="grid gap-3 sm:grid-cols-2">{["Dashboard","Tenant Management","Billing & Invoices","Platform Settings","Reports","Security","Backups","Integrations"].map((x,i)=><label key={x} className="flex items-center rounded-lg border border-slate-100 p-3 text-[10px] font-semibold"><input type="checkbox" defaultChecked={i<7} className="mr-3 accent-violet-600"/>{x}<span className="ml-auto text-slate-400">View · Edit</span></label>)}</div>:<Table columns={["Admin","Role","Last Active","Status"]} rows={["Aryan Sharma","Sarah Miller","David Wilson","Lisa Anderson"].map((x,i)=>[x,["Super Admin","Support Manager","Finance Manager","Admin"][i],"Just now",<Badge key="s">Active</Badge>])}/>}<Button className="mt-5">Save Changes</Button></Card></div>}

function Reports(){return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["Tenant Growth","Revenue Summary","Subscription Report","System Activity"].map((x)=><Card key={x} className="soft-hover p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600"><Icon name="chart"/></span><b className="mt-4 block text-xs">{x}</b><p className="mt-1 text-[9px] leading-4 text-slate-400">Comprehensive platform data for the selected period.</p><Button variant="outline" className="mt-4 w-full">⇩ Generate</Button></Card>)}</div><Card className="p-5"><CardHead title="Recent Exports"/><Table columns={["Report","Format","Created By","Date",""]} rows={["Monthly Revenue","Tenant Growth","Security Activity","Subscriptions"].map((x,i)=>[x,["PDF","CSV","XLSX"][i%3],"Aryan Sharma","May "+(24-i)+", 2026",<Button key="d" variant="outline">Download</Button>])}/></Card></div>}
function Notifications(){return <div className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]"><Card className="p-5"><CardHead title="All Notifications" action={<Button variant="outline">Mark all read</Button>}/>{["New tenant registration","Payment received","System backup completed","New support ticket","Storage threshold reached","Security login alert"].map((x,i)=><div key={x} className="flex gap-3 border-b border-slate-100 p-3 hover:bg-slate-50"><span className={cn("grid h-9 w-9 place-items-center rounded-xl",i%3===0?"bg-violet-50 text-violet-600":i%3===1?"bg-emerald-50 text-emerald-500":"bg-amber-50 text-amber-500")}><Icon name={i%2?"bell":"users"}/></span><div><b className="text-[10px]">{x}</b><p className="mt-1 text-[9px] text-slate-400">Platform activity requires your attention.</p></div><span className="ml-auto text-[8px] text-slate-400">{i+2}m ago</span></div>)}</Card><SettingsCard title="Notification Preferences" fields={["Tenant activity","Billing updates","System alerts","Security alerts"]}/></div>}

function Integrations({kind}:{kind:string}){const items=kind==="payment-gateways"?["Stripe","PayPal","Razorpay","Paddle"]:["Slack","Google Drive","Zapier","Mailchimp"];return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((x,i)=><Card key={x} className="soft-hover p-5"><div className="flex items-center"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-lg font-black text-violet-600">{x[0]}</span><Badge tone={i===3?"gray":"green"}>{i===3?"Disabled":"Connected"}</Badge></div><b className="mt-4 block text-xs">{x}</b><p className="mt-1 text-[9px] leading-4 text-slate-400">Securely connected to your Artistry workspace.</p><Button variant="outline" className="mt-4 w-full">{i===3?"Connect":"Manage"}</Button></Card>)}</div>{kind!=="payment-gateways"&&<Card className="p-5"><CardHead title="API Keys" action={<Button>＋ Create API Key</Button>}/><Table columns={["Name","Key","Created","Last Used",""]} rows={[["Production","art_live_••••••7e2","May 01, 2026","2 mins ago"],["Reporting","art_live_••••••91c","Apr 18, 2026","Yesterday"]].map(x=>[...x,<Button key="r" variant="outline">Revoke</Button>])}/></Card>}</div>}

function SettingsPage({kind}:{kind:string}) {
 const configs:Record<string,{cards:string[]; fields:string[]}> = {
  "platform-settings":{cards:["General Settings","Tenant Defaults"],fields:["Platform name","Support email","Default timezone","Default currency"]},
  "global-configuration":{cards:["General","Localization"],fields:["Platform name","Platform tagline","Support email","Date format"]},
  smtp:{cards:["Mail Server","Test Connection"],fields:["Mail host","Port","Username","Password"]},
  "email-templates":{cards:["Template Settings","Default Styling"],fields:["Welcome email","Password reset","Payment receipt","Support reply"]},
  backups:{cards:["Backup Settings","Retention"],fields:["Backup frequency","Storage location","Retention period","Encryption"]},
  "restore-wizard":{cards:["Restore Point","Restore Options"],fields:["Select backup","Data scope","Conflict handling","Notify admins"]},
  security:{cards:["Authentication","Access Control"],fields:["Enforce 2FA","Session timeout","Password expiry","IP restrictions"]},
  branding:{cards:["Brand Identity","White Label"],fields:["Platform logo","Favicon","Primary color","Login page title"]},
  "custom-domains":{cards:["Platform Domain","Tenant Domains"],fields:["Admin domain","SSL mode","DNS verification","Force HTTPS"]},
  "system-updates":{cards:["Current Version","Release Channel"],fields:["Version 4.2.1","Stable channel","Automatic updates","Release notes"]},
  preferences:{cards:["Appearance","Dashboard"],fields:["Compact sidebar","Weekly summary","Default page","Table density"]},
  "database-schedules":{cards:["Schedule","Storage"],fields:["Backup frequency","Start time","Retention days","Storage target"]},
  "database-recovery":{cards:["Recovery Point","Confirmation"],fields:["Restore date","Restore time","Database scope","Verify checksum"]},
  webhooks:{cards:["Webhook Endpoint","Events"],fields:["Endpoint URL","Signing secret","Tenant events","Billing events"]},
  "multi-language":{cards:["Languages","Regional Defaults"],fields:["Default language","Fallback language","Auto detection","RTL support"]},
  "tax-billing":{cards:["Tax Rules","Invoice Settings"],fields:["Tax mode","Default rate","Invoice prefix","Payment terms"]},
  maintenance:{cards:["Maintenance Mode","Visitor Message"],fields:["Enable maintenance","Start time","Expected duration","Status message"]},
  "open-meters":{cards:["Usage Metering","Thresholds"],fields:["Meter name","Unit","Billing interval","Alert threshold"]},
  "shutdown-mode":{cards:["Shutdown Control","Access"],fields:["Enable shutdown","Allow super admins","Public message","Resume time"]},
  settings:{cards:["General Preferences","Feature Flags"],fields:["New tenant signup","Beta features","Usage tracking","Admin alerts"]},
 };
 const c=configs[kind]||configs["platform-settings"];
 return <div className="grid gap-4 lg:grid-cols-2">{c.cards.map((title,i)=><SettingsCard key={title} title={title} fields={c.fields.slice(i*2,i*2+2)} destructive={["restore-wizard","database-recovery","shutdown-mode"].includes(kind)&&i===1}/>)}</div>;
}
function SettingsCard({title,fields,destructive=false}:{title:string;fields:string[];destructive?:boolean}){return <Card className="p-5"><CardHead title={title}/><div className="space-y-4">{fields.map((x,i)=> i%2===0?<label key={x}><span className="label">{x}</span><input className="field" defaultValue={x.includes("email")?"support@artistry.io":x.includes("name")?"Artistry":""} placeholder={`Enter ${x.toLowerCase()}`}/></label>:<div key={x} className="flex items-center justify-between rounded-lg border border-slate-100 p-3"><div><b className="text-[10px]">{x}</b><p className="mt-1 text-[8px] text-slate-400">Apply this setting across the platform.</p></div><Toggle/></div>)}</div><Button className={cn("mt-5",destructive&&"!bg-red-500")}>{destructive?"Confirm & Continue":"Save Changes"}</Button></Card>}
function Toggle(){const [on,setOn]=useState(true);return <button aria-label="Toggle setting" onClick={()=>setOn(!on)} className={cn("switch",on&&"on")}/>}

function Profile(){return <div className="grid gap-4 lg:grid-cols-[.65fr_1.35fr]"><Card className="p-6 text-center"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#f4b38f] to-[#5931b7] text-2xl font-black text-white ring-4 ring-violet-50">AS</div><h3 className="mt-4 text-base font-extrabold">Aryan Sharma</h3><p className="text-[10px] text-slate-400">Super Administrator</p><Badge tone="purple">Full Access</Badge><Button variant="outline" className="mt-5 w-full">Change Photo</Button></Card><Card className="p-5"><CardHead title="Personal Information"/><div className="grid gap-4 sm:grid-cols-2">{["First name","Last name","Email address","Phone number","Timezone","Language"].map((x,i)=><label key={x}><span className="label">{x}</span><input className="field" defaultValue={["Aryan","Sharma","aryan@artistry.io","+91 98765 43210","Asia / Kolkata","English"][i]}/></label>)}</div><Button className="mt-5">Update Profile</Button></Card></div>}

function SearchModal({close}:{close:()=>void}){return <div className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/35 p-4 pt-[12vh] backdrop-blur-[2px]" onMouseDown={close}><Card className="w-full max-w-xl overflow-hidden shadow-2xl" onMouseDown={e=>e.stopPropagation()}><div className="flex items-center gap-3 border-b p-4"><Icon name="search" className="text-slate-400"/><input autoFocus className="w-full border-0 text-sm outline-none" placeholder="Search pages, tenants, settings…"/><button onClick={close}><Icon name="x"/></button></div><div className="p-3"><p className="px-2 pb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">Quick navigation</p>{navigation.slice(0,7).map(x=><Link onClick={close} href={x.slug==="dashboard"?"/":`/${x.slug}`} key={x.slug} className="flex items-center gap-3 rounded-lg p-3 text-[11px] font-semibold hover:bg-violet-50 hover:text-violet-600"><Icon name={x.icon}/>{x.label}<span className="ml-auto text-slate-300">↗</span></Link>)}</div></Card></div>}
