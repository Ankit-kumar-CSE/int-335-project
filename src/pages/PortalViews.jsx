import { useState } from 'react';

export function MyQueriesPage({ queries, onAskNew, onBook }) {
  const [filter, setFilter] = useState('All');
  const filtered = queries.filter((q) => filter === 'All' || q.status === filter);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">My Academic Queries</h1>
          <p className="text-[13.5px] text-on-surface-variant">
            Full ledger of your submitted doubts, faculty responses, and attached proof artifacts.
          </p>
        </div>
        <button
          type="button"
          onClick={onAskNew}
          className="px-4 py-2.5 rounded-xl bg-primary text-white text-[13px] font-semibold shadow-brand hover:bg-primary-container inline-flex items-center gap-1.5 self-start"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Ask New Doubt</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['All', 'Pending Review', 'In Progress', 'Resolved'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold ${
              filter === f
                ? 'bg-primary text-white'
                : 'bg-white border border-slate-200 text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface">#{q.id}</span>
                <span className={`px-2 py-0.5 rounded-full ${q.courseColor}`}>{q.course}</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary">{q.status}</span>
                {q.priority === 'Urgent' && (
                  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container">Urgent</span>
                )}
              </div>
              <h3 className="text-[15.5px] font-bold text-on-surface">{q.title}</h3>
              <p className="text-[13px] text-on-surface-variant">{q.excerpt}</p>
            </div>
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
              <div className="text-[12px] font-semibold text-on-surface">{q.facultyName}</div>
              <div className="text-[11px] text-on-surface-variant">{q.timestamp}</div>
              <button
                type="button"
                onClick={onBook}
                className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-[12px] font-semibold text-primary"
              >
                Book Follow-up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotificationsPage({ notifications, onMarkAllRead }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Notifications</h1>
          <p className="text-[13.5px] text-on-surface-variant">
            Real-time alerts for faculty replies, office hour reminders, and SLA updates.
          </p>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-[12.5px] font-semibold text-primary"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 divide-y divide-slate-100">
        {notifications.map((n) => (
          <div key={n.id} className="p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  n.unread ? 'bg-primary' : 'bg-slate-300'
                }`}
              />
              <div>
                <div className="text-[14px] font-bold text-on-surface">{n.title}</div>
                <p className="text-[13px] text-on-surface-variant mt-0.5">{n.body}</p>
              </div>
            </div>
            <span className="text-[11.5px] text-on-surface-variant shrink-0">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white text-xl font-extrabold flex items-center justify-center">
          AC
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">Alex Chen (Aryan)</h1>
          <p className="text-[13.5px] text-on-surface-variant">
            B.Tech Computer Science &amp; Engineering • Semester 6 • Roll No: CS-2022-084
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
        <div className="p-4 rounded-xl bg-surface-container-low">
          <div className="text-[11px] font-bold uppercase text-on-surface-variant">Institutional Email</div>
          <div className="mt-1 font-semibold text-on-surface">alex.chen@apex.edu</div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-low">
          <div className="text-[11px] font-bold uppercase text-on-surface-variant">Department Advisor</div>
          <div className="mt-1 font-semibold text-on-surface">Dr. Aris Thorne (Algorithms)</div>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage({ onSave }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [anonDefault, setAnonDefault] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-on-surface">Portal Settings</h1>
        <p className="text-[13.5px] text-on-surface-variant">
          Manage notification channels and privacy defaults for your academic queries.
        </p>
      </div>

      <div className="space-y-3">
        {[
          {
            label: 'Email & Calendar Sync (.ics) for booked office hours',
            checked: emailAlerts,
            set: setEmailAlerts,
          },
          {
            label: 'SMS / Push alerts 30 minutes before scheduled 1-on-1 slots',
            checked: smsAlerts,
            set: setSmsAlerts,
          },
          {
            label: 'Allow anonymous archival in Course Knowledge Base by default',
            checked: anonDefault,
            set: setAnonDefault,
          },
        ].map((item) => (
          <label
            key={item.label}
            className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low cursor-pointer"
          >
            <span className="text-[13.5px] font-medium text-on-surface">{item.label}</span>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => item.set(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={onSave}
        className="px-5 py-2.5 rounded-xl bg-primary text-white text-[13px] font-semibold hover:bg-primary-container"
      >
        Save Preferences
      </button>
    </div>
  );
}
