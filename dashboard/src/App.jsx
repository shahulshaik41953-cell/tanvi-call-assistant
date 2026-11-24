import { useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  MessageCircle,
  PhoneMissed,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Missed calls", icon: PhoneMissed },
  { label: "Enquiries", icon: MessageCircle },
  { label: "Message logs", icon: Activity },
  { label: "Settings", icon: Settings },
];

function App() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <div>
            <div className="brand-name">TANVI</div>
            <div className="brand-subtitle">CALL ASSISTANT</div>
          </div>
        </div>

        <div className="clinic-switcher">
          <div className="clinic-avatar">TC</div>
          <div className="clinic-meta">
            <strong>Tanvi Clinic</strong>
            <span>Kurnool, Andhra Pradesh</span>
          </div>
          <ChevronDown size={16} />
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={active === label ? "nav-item active" : "nav-item"}
              key={label}
              onClick={() => setActive(label)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-note">
            <ShieldCheck size={17} />
            <div>
              <strong>Privacy first</strong>
              <span>Patient data should only be visible to authorised staff.</span>
            </div>
          </div>
          <div className="profile">
            <div className="profile-avatar">AC</div>
            <div>
              <strong>Abstract Creatives</strong>
              <span>Project administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Tanvi Clinic <span>/</span> {active}</div>
          <div className="topbar-actions">
            <div className="demo-pill"><span /> Demo preview</div>
            <button className="icon-button" aria-label="Notifications"><Bell size={18} /></button>
            <div className="top-avatar">AC</div>
          </div>
        </header>

        <div className="page">
          <section className="page-heading">
            <div>
              <div className="eyebrow">CLINIC COMMUNICATIONS</div>
              <h1>{active}</h1>
              <p>Monitor missed calls and keep patient enquiries from falling through.</p>
            </div>
            <button className="date-button"><CalendarDays size={16} /> Today <ChevronDown size={15} /></button>
          </section>

          <div className="notice">
            <div className="notice-icon"><Activity size={18} /></div>
            <div>
              <strong>Prototype preview — not connected to the clinic</strong>
              <span>Figures and activity are not live. No patient information is stored in this demo.</span>
            </div>
          </div>

          <section className="stats-grid" aria-label="Overview statistics">
            <StatCard icon={PhoneMissed} label="Missed calls" value="—" hint="Awaiting phone integration" />
            <StatCard icon={MessageCircle} label="WhatsApp sent" value="—" hint="Awaiting Meta API setup" />
            <StatCard icon={Users} label="Open enquiries" value="—" hint="No live enquiry data" />
            <StatCard icon={CheckCircle2} label="Follow-ups completed" value="—" hint="Staff workflow not enabled" />
          </section>

          <section className="content-grid">
            <div className="panel activity-panel">
              <div className="panel-header">
                <div>
                  <h2>{active === "Overview" ? "Recent activity" : active}</h2>
                  <p>{active === "Overview" ? "New calls and patient replies will appear here." : "This section will become available after integration."}</p>
                </div>
                <button className="text-button">View all <span>→</span></button>
              </div>
              <div className="empty-state">
                <div className="empty-icon"><PhoneMissed size={22} /></div>
                <strong>No activity yet</strong>
                <span>When the system is connected, missed calls and WhatsApp replies will appear here.</span>
              </div>
            </div>

            <div className="side-column">
              <div className="panel schedule-panel">
                <div className="panel-header compact">
                  <div>
                    <h2>Call handling</h2>
                    <p>Planned clinic schedule</p>
                  </div>
                  <Clock3 size={18} className="muted-icon" />
                </div>
                <div className="schedule-row"><span>Monday – Saturday</span><strong>Open</strong></div>
                <div className="schedule-row"><span>Sunday</span><strong className="closed">Closed</strong></div>
                <div className="schedule-footnote">Exact clinic hours and holidays need confirmation.</div>
              </div>

              <div className="panel setup-panel">
                <div className="panel-header compact">
                  <div>
                    <h2>Setup progress</h2>
                    <p>Implementation checklist</p>
                  </div>
                  <Search size={17} className="muted-icon" />
                </div>
                <SetupLine label="Project workspace" complete />
                <SetupLine label="Android call detection" />
                <SetupLine label="Firebase backend" />
                <SetupLine label="WhatsApp API" />
                <SetupLine label="Clinic testing" />
              </div>
            </div>
          </section>

          <footer className="footer">
            <span>Tanvi Call Assistant <span className="footer-dot">•</span> Built by Abstract Creatives</span>
            <span>Development preview</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <Icon size={18} strokeWidth={1.7} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-hint">{hint}</div>
    </div>
  );
}

function SetupLine({ label, complete = false }) {
  return (
    <div className="setup-line">
      {complete ? <CheckCircle2 size={16} className="complete-icon" /> : <span className="pending-dot" />}
      <span>{label}</span>
      <small>{complete ? "Ready" : "Pending"}</small>
    </div>
  );
}

export default App;
