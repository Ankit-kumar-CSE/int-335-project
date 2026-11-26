import { useState } from 'react';
import { FACULTY } from '../data';

const DEPARTMENTS = ['All', 'Computer Science', 'Electronics', 'Mathematics', 'Software Eng'];
const AVAILABILITY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Available Today', dot: 'bg-emerald-500' },
  { id: 'now', label: 'Available Right Now', dot: 'bg-teal-500' },
  { id: 'week', label: 'Has Open Slots This Week', icon: 'calendar_month' },
];

const STATUS_BADGE_STYLE = {
  online: 'bg-emerald-50 text-tertiary border-emerald-200/80',
  virtual: 'bg-sky-50 text-sky-800 border-sky-200/80',
  lecture: 'bg-amber-50 text-amber-800 border-amber-200/80',
  away: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function Faculty({ onBook, onAskFaculty, onToast }) {
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [dept, setDept] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [availFilter, setAvailFilter] = useState('all');
  const [profileModal, setProfileModal] = useState(null);

  const filtered = FACULTY.filter((f) => {
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.courses.some((c) => c.toLowerCase().includes(q)) ||
      f.officeLocation.toLowerCase().includes(q);
    const matchesDept = dept === 'All' || f.deptKey === dept;
    const matchesSubj =
      subjectFilter === 'All Subjects' || f.courses.some((c) => c.includes(subjectFilter));
    const matchesAvail =
      availFilter === 'all' ||
      (availFilter === 'today' && f.availableToday) ||
      (availFilter === 'now' && f.availableNow) ||
      (availFilter === 'week' && f.openThisWeek);

    return matchesSearch && matchesDept && matchesSubj && matchesAvail;
  });

  const resetFilters = () => {
    setQuery('');
    setDept('All');
    setSubjectFilter('All Subjects');
    setAvailFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#eef2ff] via-[#e5eeff] to-[#dce9ff] border border-slate-200/80 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-primary">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed">Academic Fall &apos;25</span>
            <span className="text-tertiary inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Sync Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-on-surface">
            Faculty Directory &amp; Availability
          </h1>
          <p className="text-[13.5px] text-on-surface-variant max-w-xl">
            Find your course professors, check real-time office availability, and reserve doubt-clearing sessions.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-level1">
            <div className="text-xl font-extrabold text-on-surface">42</div>
            <div className="text-[11px] text-on-surface-variant">In Department</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-level1">
            <div className="text-xl font-extrabold text-tertiary">28</div>
            <div className="text-[11px] text-on-surface-variant">Available Today</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 px-4 py-3 shadow-level1">
            <div className="text-xl font-extrabold text-primary">14</div>
            <div className="text-[11px] text-on-surface-variant">In Office Now</div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <span className="material-symbols-outlined text-[18px] text-outline absolute left-3.5 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search faculty by name, subject, research topic, or office room..."
              className="w-full pl-10 pr-14 py-2.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[13.5px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-container"
            />
            <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-white border border-slate-200 text-[10.5px] font-semibold text-on-surface-variant">
              ⌘ K
            </span>
          </div>

          <div className="inline-flex rounded-xl bg-surface-container-low p-1 border border-slate-200/70 self-start">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1 ${
                viewMode === 'grid' ? 'bg-white text-primary shadow-level1' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1 ${
                viewMode === 'list' ? 'bg-white text-primary shadow-level1' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_list</span>
              <span>List</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mr-1">DEPT:</span>
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDept(d)}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                  dept === d
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">SUBJECT:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[12.5px] font-medium focus:outline-none"
            >
              <option>All Subjects</option>
              <option>Algorithms</option>
              <option>DBMS</option>
              <option>Operating Sys</option>
              <option>Linear Algebra</option>
              <option>Machine Learning</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mr-1">
            AVAILABILITY:
          </span>
          {AVAILABILITY_FILTERS.map((af) => (
            <button
              key={af.id}
              type="button"
              onClick={() => setAvailFilter(af.id)}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors ${
                availFilter === af.id
                  ? 'bg-primary-fixed text-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {af.dot && <span className={`w-1.5 h-1.5 rounded-full ${af.dot}`} />}
              {af.icon && <span className="material-symbols-outlined text-[14px]">{af.icon}</span>}
              <span>{af.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="text-on-surface-variant">
          Showing <strong className="text-on-surface">{filtered.length} Faculty Members</strong> • Sorted by: Current
          Availability
        </span>
        <button type="button" onClick={resetFilters} className="font-semibold text-primary hover:underline">
          Reset filters
        </button>
      </div>

      {/* Faculty Cards */}
      <section className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
        {filtered.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 flex flex-col justify-between space-y-4 hover:shadow-level2 transition-shadow"
          >
            <div className="space-y-4">
              {/* Top Profile */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl font-bold text-[15px] flex items-center justify-center shrink-0 ${fac.avatarBg}`}
                  >
                    {fac.initials}
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold tracking-wider uppercase text-primary">
                      {fac.department}
                    </div>
                    <h3 className="text-[16px] font-bold text-on-surface leading-tight">{fac.name}</h3>
                    <p className="text-[12px] text-on-surface-variant line-clamp-1">{fac.role}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/70 text-[11.5px] font-bold text-amber-700 shrink-0">
                  ★ {fac.rating}
                </span>
              </div>

              {/* Status Pill */}
              <div
                className={`px-3 py-2 rounded-xl border text-[12px] font-semibold flex items-center justify-between gap-2 ${
                  STATUS_BADGE_STYLE[fac.statusType]
                }`}
              >
                <span className="truncate">• {fac.statusLabel}</span>
                <span className="material-symbols-outlined text-[16px] shrink-0">{fac.statusBadgeIcon}</span>
              </div>

              {/* Office Hours */}
              <div className="space-y-1.5">
                <div className="text-[10.5px] font-bold tracking-wider uppercase text-on-surface-variant">
                  Office Hours
                </div>
                {fac.officeHours.map((oh, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[12px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[15px] text-primary">{oh.icon}</span>
                    <span>{oh.text}</span>
                  </div>
                ))}
              </div>

              {/* Courses */}
              <div className="space-y-1.5">
                <div className="text-[10.5px] font-bold tracking-wider uppercase text-on-surface-variant">
                  Courses
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {fac.courses.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-low text-[11.5px] font-semibold text-on-surface"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3-Column Stats */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                <div>
                  <div className="text-[15px] font-extrabold text-on-surface">{fac.doubtsSolved}</div>
                  <div className="text-[10.5px] text-on-surface-variant">Doubts Solved</div>
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-tertiary">{fac.resolution}</div>
                  <div className="text-[10.5px] text-on-surface-variant">Resolution</div>
                </div>
                <div>
                  <div className="text-[15px] font-extrabold text-on-surface">{fac.avgReply}</div>
                  <div className="text-[10.5px] text-on-surface-variant">Avg Reply</div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    fac.actionVariant === 'secondary' ? onAskFaculty(fac) : onBook(fac.id)
                  }
                  className={`flex-1 py-2.5 rounded-xl text-[12.5px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors ${
                    fac.actionVariant === 'emerald'
                      ? 'bg-tertiary-container hover:bg-tertiary text-white'
                      : fac.actionVariant === 'secondary'
                      ? 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-slate-200'
                      : 'bg-primary hover:bg-primary-container text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {fac.actionVariant === 'emerald'
                      ? 'videocam'
                      : fac.actionVariant === 'secondary'
                      ? 'mail'
                      : 'calendar_month'}
                  </span>
                  <span>{fac.actionLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAskFaculty(fac)}
                  title="Send Doubt Query"
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-surface-container-low text-on-surface-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setProfileModal(fac)}
                className="w-full text-center text-[12px] font-semibold text-primary hover:underline"
              >
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Help Bar */}
      <section className="rounded-2xl bg-surface-container-low border border-slate-200/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">map</span>
          </span>
          <div>
            <div className="text-[14.5px] font-bold text-on-surface">
              Looking for a specific department lab or cabin?
            </div>
            <div className="text-[12.5px] text-on-surface-variant">
              View the interactive engineering building floor plan or navigate real-time office vacancy queues.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onToast('Opened Engineering Wing B & C Floor Map')}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[12.5px] font-semibold text-on-surface hover:bg-slate-50"
          >
            Floor Map (B &amp; C Wings)
          </button>
          <button
            type="button"
            onClick={() => onBook('thorne')}
            className="px-4 py-2 rounded-xl bg-primary text-white text-[12.5px] font-semibold hover:bg-primary-container"
          >
            Instant Queue Desk
          </button>
        </div>
      </section>

      {/* Faculty Profile Modal */}
      {profileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-level3 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl font-bold text-[16px] flex items-center justify-center ${profileModal.avatarBg}`}
                >
                  {profileModal.initials}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-on-surface">{profileModal.name}</h3>
                  <p className="text-[12.5px] text-on-surface-variant">{profileModal.role}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfileModal(null)}
                className="p-1.5 rounded-lg hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="rounded-xl bg-surface-container-low p-4 space-y-2 text-[13px]">
              <div>
                <strong>Location:</strong> {profileModal.officeLocation}
              </div>
              <div>
                <strong>Avg Response Time:</strong> {profileModal.avgResponseMin}
              </div>
              <div>
                <strong>Courses:</strong> {profileModal.courses.join(', ')}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const id = profileModal.id;
                  setProfileModal(null);
                  onBook(id);
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-[13px] font-semibold"
              >
                Book Office Hour
              </button>
              <button
                type="button"
                onClick={() => setProfileModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-[13px] font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
