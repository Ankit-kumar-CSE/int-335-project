import { useState } from 'react';
import { FACULTY } from '../data';

const WEEK_DAYS = [
  { id: 'mon', day: 'MON', date: '27', full: 'Mon, Oct 27, 2025', slots: '3 slots', disabled: false },
  { id: 'tue', day: 'TUE', date: '28', full: 'Tue, Oct 28, 2025', slots: '1 slot', disabled: false },
  { id: 'wed', day: 'WED', date: '29', full: 'Wed, Oct 29, 2025', slots: '5 slots left', disabled: false },
  { id: 'thu', day: 'THU', date: '30', full: 'Thu, Oct 30, 2025', slots: 'Full', disabled: true },
  { id: 'fri', day: 'FRI', date: '31', full: 'Fri, Oct 31, 2025', slots: '4 slots', disabled: false },
];

const MORNING_SLOTS = [
  { id: '1000', label: '10:00 AM – 10:30 AM', status: 'Booked', disabled: true },
  { id: '1030', label: '10:30 AM – 11:00 AM', status: '2 left', disabled: false },
  { id: '1115', label: '11:15 AM – 11:45 AM', status: 'Available', disabled: false },
];

const AFTERNOON_SLOTS = [
  { id: '1400', label: '2:00 PM – 2:30 PM', status: 'Available', disabled: false },
  { id: '1430', label: '2:30 PM – 3:00 PM', status: 'Available', disabled: false },
  { id: '1515', label: '3:15 PM – 3:45 PM', status: 'Available', disabled: false },
];

export default function Book({
  facultyId,
  setFacultyId,
  bookings,
  onConfirm,
  onSaveDraft,
  onNavigate,
}) {
  const [selectedDay, setSelectedDay] = useState('wed');
  const [selectedSlot, setSelectedSlot] = useState('1400');
  const [medium, setMedium] = useState('inperson');
  const [duration, setDuration] = useState('30');
  const [course, setCourse] = useState('CS302 - Design & Analysis of Algorithms');
  const [linkedQuery, setLinkedQuery] = useState('#DB-8419: Bellman-Ford Relaxation');
  const [purpose, setPurpose] = useState(
    'I am struggling with step 3 of the inductive proof for Bellman-Ford’s path relaxation with negative cycle detection. I have written my base cases and want to verify if my lemma holds for arbitrary directed acyclic graphs before the midterm.'
  );

  const faculty = FACULTY.find((f) => f.id === facultyId) || FACULTY[0];
  const dayObj = WEEK_DAYS.find((d) => d.id === selectedDay) || WEEK_DAYS[2];
  const allSlots = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];
  const slotObj = allSlots.find((s) => s.id === selectedSlot) || AFTERNOON_SLOTS[0];

  const handleConfirm = () => {
    onConfirm({
      id: `BK-${210 + bookings.length}`,
      facultyName: faculty.name,
      course: course.split(' - ')[0],
      status: 'Confirmed',
      dayLabel: `${dayObj.day} OCT ${dayObj.date}`,
      timeLabel: slotObj.label,
      location: medium === 'inperson' ? faculty.officeLocation : 'Google Meet',
      topic: purpose.slice(0, 90) + '...',
      isVirtual: medium === 'virtual',
      startsIn: dayObj.full,
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-[12px] text-on-surface-variant flex items-center gap-1.5">
            <button type="button" onClick={() => onNavigate('dashboard')} className="hover:text-primary">
              Portal
            </button>
            <span>&gt;</span>
            <span className="font-semibold text-primary">Book Office Hours</span>
          </div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-on-surface">
            Schedule Academic Office Hours &amp; 1-on-1 Mentorship
          </h1>
          <p className="text-[13.5px] text-on-surface-variant max-w-2xl">
            Reserve a dedicated consultation slot with course faculty for conceptual clarification, algorithmic proof
            verification, or academic project review.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[12px] font-semibold text-primary">
            ⏱ 15 &amp; 30-min Focus Slots
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[12px] font-semibold text-on-surface">
            📅 Calendar Sync (.ics)
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[12px] font-semibold text-primary">
            🪪 Instant Room Pass
          </span>
        </div>
      </div>

      {/* Main 12-Col Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Faculty */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-[16px] font-bold text-on-surface">
                  Faculty &amp; Instructor Consultation Partner
                </h2>
              </div>
              <select
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200 text-[12px] font-semibold text-primary focus:outline-none"
                aria-label="Change Faculty"
              >
                {FACULTY.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl bg-surface-container-low/75 border border-slate-200/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl font-bold text-[15px] flex items-center justify-center shrink-0 ${faculty.avatarBg}`}
                >
                  {faculty.initials}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[16px] font-bold text-on-surface">{faculty.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                      • Available Today
                    </span>
                  </div>
                  <div className="text-[12px] text-on-surface-variant">{faculty.role}</div>
                  <div className="flex flex-wrap items-center gap-4 text-[12px] pt-1">
                    <span className="font-bold text-amber-700">★ {faculty.rating} / 5.0</span>
                    <span className="text-on-surface-variant">
                      <strong className="text-on-surface">{faculty.doubtsSolved}</strong> Doubts Solved this term
                    </span>
                    <span className="text-on-surface-variant">
                      Avg Response: <strong className="text-primary">{faculty.avgResponseMin}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-slate-200 px-4 py-3 shrink-0">
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Campus Office
                </div>
                <div className="mt-1 text-[13px] font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">apartment</span>
                  <span>{faculty.officeLocation}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2: Date & Slot */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h2 className="text-[16px] font-bold text-on-surface">Select Date &amp; Consultation Slot</h2>
                  <p className="text-[12px] text-on-surface-variant">
                    Time zone synchronized to Campus Time (EST / UTC-5)
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-primary-fixed/60 text-primary text-[11.5px] font-semibold">
                ⌛ Walk-in queue window starts in 42m
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-[14px] font-bold text-on-surface">
                October 2025 <span className="font-normal text-on-surface-variant text-[12.5px]">Academic Week 9</span>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low"
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {WEEK_DAYS.map((d) => {
                const active = selectedDay === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    disabled={d.disabled}
                    onClick={() => setSelectedDay(d.id)}
                    className={`rounded-xl py-3 px-2 text-center border transition-all ${
                      d.disabled
                        ? 'bg-slate-50 border-slate-200/70 text-slate-400 cursor-not-allowed'
                        : active
                        ? 'bg-gradient-to-br from-primary to-primary-container border-primary text-white shadow-brand'
                        : 'bg-surface-container-low/60 border-slate-200/80 text-on-surface hover:border-primary/40'
                    }`}
                  >
                    <div className={`text-[10.5px] font-bold ${active ? 'text-indigo-100' : 'text-on-surface-variant'}`}>
                      {d.day}
                    </div>
                    <div className="text-xl font-extrabold mt-0.5">{d.date}</div>
                    <div
                      className={`text-[11px] font-semibold mt-1 ${
                        d.disabled ? 'text-error' : active ? 'text-indigo-100' : 'text-on-surface-variant'
                      }`}
                    >
                      {d.slots}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Morning Slots */}
            <div className="space-y-2.5">
              <div className="text-[12.5px] font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-amber-500">wb_sunny</span>
                <span>Morning Focus Sessions (10:00 AM – 12:00 PM)</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {MORNING_SLOTS.map((s) => {
                  const active = selectedSlot === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSelectedSlot(s.id)}
                      className={`px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                        s.disabled
                          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                          : active
                          ? 'bg-gradient-to-r from-primary to-primary-container border-primary text-white shadow-brand'
                          : 'bg-surface-container-low/70 border-slate-200 text-on-surface hover:border-primary/50'
                      }`}
                    >
                      <span className="text-[12px] font-semibold">{s.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold shrink-0 ${
                          s.disabled
                            ? 'bg-error-container/60 text-on-error-container'
                            : active
                            ? 'bg-white/20 text-white'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}
                      >
                        {active ? 'Selected' : s.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon Slots */}
            <div className="space-y-2.5">
              <div className="text-[12.5px] font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">light_mode</span>
                <span>Afternoon Focus Sessions (2:00 PM – 4:30 PM)</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {AFTERNOON_SLOTS.map((s) => {
                  const active = selectedSlot === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSlot(s.id)}
                      className={`px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                        active
                          ? 'bg-gradient-to-r from-primary to-primary-container border-primary text-white shadow-brand'
                          : 'bg-surface-container-low/70 border-slate-200 text-on-surface hover:border-primary/50'
                      }`}
                    >
                      <span className="text-[12px] font-semibold">{s.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-bold shrink-0 ${
                          active ? 'bg-white/20 text-white' : 'bg-tertiary-fixed text-on-tertiary-fixed'
                        }`}
                      >
                        {active ? 'Selected' : s.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Step 3: Format & Scope */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h2 className="text-[16px] font-bold text-on-surface">Session Format &amp; Academic Scope</h2>
                <p className="text-[12px] text-on-surface-variant">
                  Specify your meeting mode, course module, and discussion context.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="text-[12px] font-semibold text-on-surface">Session Medium</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMedium('inperson')}
                    className={`p-3 rounded-xl border text-[12px] font-semibold text-left ${
                      medium === 'inperson'
                        ? 'border-primary bg-primary-fixed/35 text-primary'
                        : 'border-slate-200 bg-white text-on-surface'
                    }`}
                  >
                    ✓ In-Person ({faculty.officeLocation.split(',')[1] || 'Room B-304'})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedium('virtual')}
                    className={`p-3 rounded-xl border text-[12px] font-semibold text-left ${
                      medium === 'virtual'
                        ? 'border-primary bg-primary-fixed/35 text-primary'
                        : 'border-slate-200 bg-white text-on-surface'
                    }`}
                  >
                    📹 Virtual (Meet)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[12px] font-semibold text-on-surface">Allocated Duration</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDuration('15')}
                    className={`p-3 rounded-xl border text-[12px] font-semibold text-left ${
                      duration === '15'
                        ? 'border-primary bg-primary-fixed/35 text-primary'
                        : 'border-slate-200 bg-white text-on-surface'
                    }`}
                  >
                    15 min (Clarification)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration('30')}
                    className={`p-3 rounded-xl border text-[12px] font-semibold text-left ${
                      duration === '30'
                        ? 'border-primary bg-primary-fixed/35 text-primary'
                        : 'border-slate-200 bg-white text-on-surface'
                    }`}
                  >
                    30 min (Deep Dive)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="font-semibold text-on-surface">Associated Course</span>
                  <span className="text-tertiary font-semibold">Active Enrollment</span>
                </div>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-slate-200 text-[12.5px] font-medium focus:outline-none"
                >
                  <option>CS302 - Design &amp; Analysis of Algorithms</option>
                  <option>CS301 - Database Management Systems</option>
                  <option>CS304 - Operating Systems</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[12px]">
                  <span className="font-semibold text-on-surface">Link Existing Doubt Query</span>
                  <span className="text-on-surface-variant">Optional</span>
                </div>
                <select
                  value={linkedQuery}
                  onChange={(e) => setLinkedQuery(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-slate-200 text-[12.5px] font-medium focus:outline-none"
                >
                  <option>#DB-8419: Bellman-Ford Relaxation</option>
                  <option>#DB-8415: Deadlock Detection Trace</option>
                  <option>None (General Consultation)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[12px]">
                <span className="font-semibold text-on-surface">Discussion Purpose &amp; Problem Statement</span>
                <span className="text-on-surface-variant">Max 500 characters</span>
              </div>
              <textarea
                rows={3}
                maxLength={500}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-surface-container-low border border-slate-200 text-[13px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-slate-200 text-[12px] font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                <span>recurrence_proof_v2.pdf</span>
                <span className="text-on-surface-variant">1.2 MB</span>
              </span>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-primary-fixed/60 text-primary text-[12px] font-semibold hover:bg-primary-fixed"
              >
                + Attach LaTeX / PDF / Image
              </button>
            </div>
          </section>
        </div>

        {/* Right 4 Cols Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant">
                Booking Summary
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                • Slot Locked (14:59)
              </span>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div
                className={`w-10 h-10 rounded-xl font-bold text-[13px] flex items-center justify-center ${faculty.avatarBg}`}
              >
                {faculty.initials}
              </div>
              <div>
                <div className="text-[14.5px] font-bold text-on-surface">{faculty.name}</div>
                <div className="text-[12px] text-on-surface-variant">Dept. of Computer Science</div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-low/80 p-3.5 space-y-2 text-[12.5px]">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Date:</span>
                <span className="font-bold text-on-surface">{dayObj.full}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Time Window:</span>
                <span className="font-bold text-on-surface">
                  {slotObj.label} ({duration} min)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Location:</span>
                <span className="font-bold text-on-surface">
                  {medium === 'inperson' ? faculty.officeLocation : 'Google Meet'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Course:</span>
                <span className="font-bold text-on-surface">{course.split(' - ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Linked Query:</span>
                <span className="font-bold text-primary">{linkedQuery.split(':')[0]}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[11.5px] text-on-surface-variant">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[15px] text-tertiary mt-0.5">check_circle</span>
                <span>Automatic Google Calendar invite &amp; SMS reminder will be dispatched immediately.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[15px] text-primary mt-0.5">info</span>
                <span>Cancellations permitted up to 1 hr prior to permit peer re-allocation.</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white text-[13.5px] font-bold shadow-brand hover:opacity-95 inline-flex items-center justify-center gap-2"
              >
                <span>Confirm Office Hour Booking</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={onSaveDraft}
                className="w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-[12.5px] font-semibold text-on-surface"
              >
                Save as Tentative Draft
              </button>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14.5px] font-bold text-on-surface">Your Upcoming Bookings</h3>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-[11px] font-bold text-primary">
                {bookings.length}
              </span>
            </div>
            {bookings.map((b) => (
              <div key={b.id} className="rounded-xl bg-surface-container-low p-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-on-surface">{b.facultyName}</span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                    {b.status}
                  </span>
                </div>
                <div className="text-[11.5px] text-on-surface-variant">{b.course}</div>
                <div className="text-[11.5px] font-medium text-on-surface">
                  {b.dayLabel} • {b.timeLabel} • {b.location}
                </div>
              </div>
            ))}
          </div>

          {/* Floor Map Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-3">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-bold text-on-surface">CS Faculty Wing Guidance</span>
              <span className="text-primary font-semibold text-[12px]">Open Floor Map</span>
            </div>
            <div className="h-24 rounded-xl bg-surface-container flex items-center justify-center">
              <span className="px-3.5 py-1.5 rounded-full bg-white shadow-level1 text-[12px] font-bold text-primary">
                • Room B-304 (Level 3)
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Elevator available at East entrance of Engineering Hall. Badge access active after 5:00 PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
