import { useState } from 'react';
import { COURSE_DISTRIBUTION, FACULTY, FACULTY_FEED } from '../data';

const STATUS_STYLE = {
  'Pending Review': 'bg-amber-50 text-amber-800 border-amber-200',
  'In Progress': 'bg-indigo-50 text-primary border-indigo-200',
  Resolved: 'bg-emerald-50 text-tertiary border-emerald-200',
};

export default function Dashboard({
  queries,
  bookings,
  searchQuery = '',
  onNavigate,
  onPingFaculty,
  onCheckIn,
}) {
  const [tab, setTab] = useState('All');
  const [selectedQuery, setSelectedQuery] = useState(null);

  const pendingCount = queries.filter((q) => q.status === 'Pending Review').length;
  const inProgressCount = queries.filter((q) => q.status === 'In Progress').length;
  const resolvedCount = queries.filter((q) => q.status === 'Resolved').length;

  const filteredQueries = queries.filter((q) => {
    const matchesTab = tab === 'All' || q.status === tab;
    const term = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !term ||
      q.title.toLowerCase().includes(term) ||
      q.course.toLowerCase().includes(term) ||
      q.facultyName.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: 'All', label: `All (${24 + queries.length})` },
    { id: 'Pending Review', label: `Pending (${pendingCount + 2})` },
    { id: 'In Progress', label: `In Progress (${inProgressCount})` },
    { id: 'Resolved', label: `Resolved (${resolvedCount + 22})` },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Greeting Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#2e21c4] via-primary to-primary-container text-white p-6 sm:p-7 shadow-brand">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              Active Academic Session • Fall 2025
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good morning, Aryan! 👋
            </h1>
            <p className="text-[13px] text-indigo-100">
              Semester 6 • Computer Science &amp; Engineering • Roll No: CS-2022-084
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/15 border border-white/20 px-3.5 py-2 text-[12.5px] text-white/95">
              <span className="material-symbols-outlined text-[17px]">info</span>
              <span>
                You have <strong>{pendingCount} pending query</strong> in &apos;Database Management Systems&apos; and an
                upcoming office hour today at <strong>3:15 PM</strong>.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('ask')}
              className="px-4 py-2.5 rounded-xl bg-white text-primary text-[13px] font-bold hover:bg-surface-container-low transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Ask a Doubt</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('faculty')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[13px] font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>Find Faculty</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[13px] font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Book Office Hour</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 KPI Cards */}
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-[12.5px] font-semibold text-on-surface-variant">Total Doubts Submitted</span>
            <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">help_center</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-on-surface">{24 + queries.length}</span>
            <span className="text-[12px] font-semibold text-tertiary">↑ +4 this mo</span>
          </div>
          <div>
            <div className="flex justify-between text-[11.5px] text-on-surface-variant mb-1">
              <span>Overall Resolution</span>
              <span className="font-bold text-on-surface">92%</span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-2.5">
          <div className="flex items-start justify-between">
            <span className="text-[12.5px] font-semibold text-on-surface-variant">Pending Queries</span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-extrabold text-on-surface">{pendingCount + 2}</span>
            <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold">
              1 urgent
            </span>
          </div>
          <div className="text-[11.5px] text-on-surface-variant">2 with Dr. Mehta, 1 with Prof. Sharma</div>
          <div className="text-[11.5px] text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Avg wait: 2.4 hrs</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-2.5">
          <div className="flex items-start justify-between">
            <span className="text-[12.5px] font-semibold text-on-surface-variant">Resolved Queries</span>
            <span className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-on-surface">{resolvedCount + 22}</span>
            <span className="text-[13px] text-on-surface-variant">/ {24 + queries.length} total</span>
          </div>
          <div className="text-[12px] font-semibold text-amber-600">★ 4.9 / 5.0 Rating Average</div>
          <div className="text-[11.5px] text-on-surface-variant">Faculty satisfaction score: Excellent</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-2.5">
          <div className="flex items-start justify-between">
            <span className="text-[12.5px] font-semibold text-on-surface-variant">Upcoming Meetings</span>
            <span className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">event</span>
            </span>
          </div>
          <div className="text-2xl font-extrabold text-on-surface leading-tight">
            {bookings.length} Confirmed
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-[11.5px] font-semibold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Next: Today @ 3:15 PM</span>
          </div>
          <div className="text-[11.5px] text-on-surface-variant">With Dr. K. Rao (Room B-304)</div>
        </div>
      </section>

      {/* Main 12-Col Split */}
      <section className="grid lg:grid-cols-12 gap-6">
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Academic Queries */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-[17px] font-bold text-on-surface">Recent Academic Queries</h2>
                <p className="text-[12.5px] text-on-surface-variant">
                  Track status, faculty feedback and active discussion threads
                </p>
              </div>
              <div className="inline-flex flex-wrap gap-1 bg-surface-container-low p-1 rounded-xl">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-colors ${
                      tab === t.id ? 'bg-white text-primary shadow-level1' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredQueries.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low border border-slate-200/70 hover:border-l-2 hover:border-l-primary p-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                        <span className={`px-2 py-0.5 rounded-full ${q.courseColor}`}>{q.course}</span>
                        {q.priority === 'Urgent' ? (
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                            • Urgent
                          </span>
                        ) : (
                          <span className="text-on-surface-variant">Normal</span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full border ${
                            STATUS_STYLE[q.status] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          • {q.status}
                        </span>
                      </div>
                      <h3 className="text-[14.5px] font-bold text-on-surface truncate">{q.title}</h3>
                      <p className="text-[12.5px] text-on-surface-variant line-clamp-1">{q.excerpt}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-indigo-100 text-primary text-[11px] font-bold flex items-center justify-center">
                          {q.facultyInitials}
                        </span>
                        <div className="text-left sm:text-right">
                          <div className="text-[12px] font-semibold text-on-surface">{q.facultyName}</div>
                          <div className="text-[11px] text-on-surface-variant">{q.timestamp}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedQuery(q)}
                        className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[12px] font-semibold text-on-surface hover:border-primary hover:text-primary transition-colors"
                      >
                        View Thread &gt;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-[12px]">
              <span className="text-on-surface-variant">
                Showing recent {filteredQueries.length} of {24 + queries.length} queries
              </span>
              <button
                type="button"
                onClick={() => onNavigate('queries')}
                className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Go to My Queries</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Course Query Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[17px] font-bold text-on-surface">Course Query Distribution</h2>
                <p className="text-[12.5px] text-on-surface-variant">
                  Semester 6 query load mapped by department subjects
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary text-[11.5px] font-semibold">
                4 Enrolled Courses
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {COURSE_DISTRIBUTION.map((c) => (
                <div key={c.code} className="rounded-xl bg-surface-container-low/80 border border-slate-200/70 p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[14px] font-bold text-on-surface">{c.code}</div>
                      <div className="text-[11.5px] text-on-surface-variant">Faculty Lead: {c.lead}</div>
                    </div>
                    <span className="text-[18px] font-extrabold text-primary">{c.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${c.percent}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>{c.limitText}</span>
                    <span className="font-medium text-on-surface">{c.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns */}
        <div className="lg:col-span-4 space-y-6">
          {/* Office Hours Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-on-surface">Office Hours</h2>
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="text-[12px] font-semibold text-primary hover:underline"
              >
                View Calendar
              </button>
            </div>

            {bookings.map((b, idx) => (
              <div
                key={b.id}
                className={`rounded-xl p-4 space-y-3 border ${
                  idx === 0
                    ? 'bg-primary-fixed/35 border-primary/25'
                    : 'bg-surface-container-low/70 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${
                      idx === 0 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-white text-on-surface-variant'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-tertiary' : 'bg-slate-400'}`} />
                    {b.startsIn}
                  </span>
                  <span className="text-on-surface-variant">{b.isVirtual ? 'Virtual' : 'One-on-One'}</span>
                </div>

                <div>
                  <div className="text-[14.5px] font-bold text-on-surface">{b.dayLabel === 'TODAY' ? `Today, ${b.timeLabel}` : b.timeLabel}</div>
                  <div className="text-[12.5px] font-semibold text-primary mt-0.5">{b.facultyName}</div>
                  <div className="text-[11.5px] text-on-surface-variant">{b.course}</div>
                </div>

                <div className="rounded-lg bg-white/90 border border-slate-200/70 p-2.5 text-[11.5px] text-on-surface-variant">
                  Topic: &ldquo;{b.topic}&rdquo;
                </div>

                {idx === 0 ? (
                  <>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                      <span>{b.location} (CS Block, 3rd Floor)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onCheckIn(b)}
                        className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-[12px] font-semibold transition-colors"
                      >
                        Check In / Directions
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('book')}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-[12px] font-semibold text-on-surface hover:bg-surface-container-low"
                      >
                        Reschedule
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="inline-flex items-center gap-1 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[15px]">videocam</span>
                      <span>Google Meet (Link ready)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('book')}
                      className="text-on-surface-variant hover:text-primary font-semibold"
                    >
                      Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Faculty Feed */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-on-surface">Faculty Feed</h2>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chat_bubble_outline</span>
            </div>
            <div className="space-y-4">
              {FACULTY_FEED.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                    {item.initials}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold text-on-surface">{item.facultyName}</span>
                      <span className="text-[11px] text-on-surface-variant">{item.time}</span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">&ldquo;{item.message}&rdquo;</p>
                    {item.attachment && (
                      <div className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-primary bg-surface-container-low px-2.5 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-[14px]">attach_file</span>
                        <span>{item.attachment}</span>
                      </div>
                    )}
                    {item.statusTag && (
                      <div className="inline-block text-[11px] font-semibold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                        {item.statusTag}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Faculty Status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-on-surface">Live Faculty Status</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-3">
              {FACULTY.slice(0, 3).map((fac) => (
                <div key={fac.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${fac.avatarBg}`}
                    >
                      {fac.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-bold text-on-surface truncate">{fac.name}</div>
                      <div className="text-[11px] text-on-surface-variant truncate">{fac.liveSummary}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPingFaculty(fac)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                      fac.liveTag === 'In Office'
                        ? 'bg-emerald-50 text-tertiary'
                        : fac.liveTag === 'Ping Now'
                        ? 'bg-primary-fixed text-primary'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {fac.liveTag}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thread Detail Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-level3 max-w-xl w-full p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-semibold">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary">
                    #{selectedQuery.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface">
                    {selectedQuery.course}
                  </span>
                  <span className="text-on-surface-variant">{selectedQuery.timestamp}</span>
                </div>
                <h3 className="text-[18px] font-bold text-on-surface">{selectedQuery.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuery(null)}
                className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-[13.5px] text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl">
              {selectedQuery.excerpt}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-[12.5px] text-on-surface-variant">
                Assigned to <strong className="text-on-surface">{selectedQuery.facultyName}</strong>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedQuery(null);
                    onNavigate('book');
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-[12.5px] font-semibold hover:bg-primary-container"
                >
                  Book 1-on-1 Slot
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedQuery(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-[12.5px] font-semibold text-on-surface"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
