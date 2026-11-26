import { useState } from 'react';
import BrandLogo from '../components/BrandLogo';

const BOTTLENECKS = [
  {
    tag: 'THE PROBLEM',
    title: 'Communication Gap',
    body: 'Students leave 200-seat lecture halls with urgent doubts but don’t know how or when to reach professors who teach multiple sections.',
    pillIcon: 'hub',
    pillTitle: 'Centralized Academic Hub',
    pillDesc: 'Direct structured routing straight to the course lead, TA, or lab mentor with priority categorization.',
  },
  {
    tag: 'THE PROBLEM',
    title: 'Availability Mystery',
    body: 'Students pace departmental corridors or send blind reminder emails hoping an instructor is sitting at their desk.',
    pillIcon: 'schedule',
    pillTitle: 'Real-Time Presence & Slots',
    pillDesc: 'Instant faculty status (In Office, In Lecture, Online) paired with guaranteed 1-click slot reservation.',
  },
  {
    tag: 'THE PROBLEM',
    title: 'Scattered Disarray',
    body: 'Crucial conceptual insights get buried in chaotic WhatsApp chats, Discord servers, and buried thread chains.',
    pillIcon: 'library_books',
    pillTitle: 'Threaded Knowledge Base',
    pillDesc: 'Each solved inquiry is indexed by course code, concept tag, and semester for university-wide reference.',
  },
];

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Submit Academic Doubt',
    body: 'Choose your enrolled course, tag relevant topics, and attach annotated screenshots, equations, or code snippets.',
    foot: 'Structured LaTeX Input',
  },
  {
    num: '02',
    title: 'Faculty Reviews Query',
    body: 'Professors and assigned TAs get prioritized queue alerts with full course context and past query patterns.',
    foot: 'Direct Queue Routing',
  },
  {
    num: '03',
    title: 'Check Live Availability',
    body: 'View instructors’ synced office hour blocks, live desk location, or instant virtual room links.',
    foot: 'Live Calendar Pulse',
  },
  {
    num: '04',
    title: 'Book Slot or Resolve in Thread',
    body: 'Receive asynchronous annotated walkthroughs or reserve a guaranteed 15-minute 1-on-1 deep-dive session.',
    foot: 'Guaranteed Resolution',
  },
];

const FEATURES = [
  {
    icon: 'code',
    title: 'LaTeX & Code Snippets',
    body: 'Native syntax highlighting for 40+ programming languages and complete KaTeX math rendering.',
    leftTag: 'Engineering Grade',
    rightTag: 'KaTeX & IDE',
  },
  {
    icon: 'event_available',
    title: 'Live Availability Calendar',
    body: 'Synchronized real-time status indicators revealing current desk occupancy, lab sessions, and open consultation hours.',
    leftTag: 'Presence Sync',
    rightTag: 'Real-time Ping',
  },
  {
    icon: 'bolt',
    title: '1-Click Slot Booking',
    body: 'Instant buffer management with automatic Google Meet and Outlook ICS calendar generation on confirmation.',
    leftTag: 'Auto Scheduling',
    rightTag: 'Zero Conflict',
  },
  {
    icon: 'track_changes',
    title: 'Transparent Query Tracker',
    body: 'Track lifecycle progression seamlessly across Pending, Under Review, Answered, and Resolved milestones.',
    leftTag: 'Lifecycle SLA',
    rightTag: '100% Traceable',
  },
  {
    icon: 'notifications_active',
    title: 'Academic Push Alerts',
    body: 'SMS, WhatsApp, and browser notifications ensure important prep doubts are resolved before exam deadlines.',
    leftTag: 'Multi-Channel Delivery',
    rightTag: '0 Escalations',
  },
  {
    icon: 'verified_user',
    title: 'Private & FERPA Compliant',
    body: 'Secure institutional SSO integration with end-to-end audit logs to protect student privacy and honor codes.',
    leftTag: 'Campus Security',
    rightTag: 'FERPA Verified',
  },
  {
    icon: 'account_tree',
    title: 'Subject-Wise Taxonomies',
    body: 'Organized automatically by course catalogues: Algorithms, DBMS, Operating Systems, Linear Algebra, and Thermodynamics.',
    leftTag: 'Curriculum Mapped',
    rightTag: 'Department Synced',
  },
  {
    icon: 'insights',
    title: 'Feedback & Resolution Index',
    body: 'Insightful analytics dashboards for deans and department heads measuring response velocity and resolution clarity.',
    leftTag: 'Dept Dashboards',
    rightTag: 'Accreditation Ready',
  },
];

const SPOTLIGHT_FACULTY = [
  {
    id: 'rostova',
    name: 'Dr. Elena Rostova',
    initials: 'ER',
    dept: 'Distributed Systems & Cloud',
    rating: '4.9',
    solved: '842 Doubts Solved',
    nextSlot: 'Today, 4:00 PM',
    location: 'CS Tower, Room 402 • Meet Link',
  },
  {
    id: 'vance',
    name: 'Prof. Marcus Vance',
    initials: 'MV',
    dept: 'Neural Networks & Deep Learning',
    rating: '4.8',
    solved: '612 Doubts Solved',
    nextSlot: 'Tomorrow, 10:30 AM',
    location: 'AI Research Wing, Studio 2',
  },
  {
    id: 'kulkarni',
    name: 'Dr. Sunita Kulkarni',
    initials: 'SK',
    dept: 'Probability & Linear Algebra',
    rating: '4.9',
    solved: '735 Doubts Solved',
    nextSlot: 'Today, 5:15 PM',
    location: 'Math Annex 201 • Zoom Open',
  },
];

export default function Landing({ onNavigate, onBookFaculty }) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <button type="button" onClick={() => onNavigate('landing')} className="focus:outline-none">
              <BrandLogo />
            </button>
            <nav className="hidden md:flex items-center gap-1 text-[13.5px] font-medium">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3.5 py-1.5 rounded-lg bg-primary text-white font-semibold"
              >
                Home
              </button>
              <a href="#workflow" className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface">
                How It Works
              </a>
              <a href="#features" className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface">
                Features
              </a>
              <button
                type="button"
                onClick={() => onNavigate('faculty')}
                className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface"
              >
                Login
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('ask')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-[13px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Ask Your First Doubt
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-container text-white text-[13px] font-semibold shadow-brand hover:opacity-95 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Institutional Learning Network
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-[1.1]">
              Never Let a Doubt Go{' '}
              <span className="text-primary">Unanswered.</span>
            </h1>

            <p className="text-[16px] sm:text-[17px] text-on-surface-variant leading-relaxed max-w-xl">
              Connect with your faculty, ask complex course questions, schedule verified doubt-clearing
              sessions, and receive timely academic mentorship without communication barriers.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('ask')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white text-[14px] font-semibold shadow-brand hover:opacity-95 transition-all"
              >
                <span>Ask Your First Doubt</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-on-surface text-[14px] font-semibold hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">play_circle</span>
                <span>Explore How It Works</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-200/70">
              <p className="text-[12px] text-on-surface-variant mb-3">
                Empowering <strong className="text-on-surface">10,000+ Students</strong> and{' '}
                <strong className="text-on-surface">450+ Faculty Members</strong> across engineering, science, and
                business schools.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-[11.5px] font-semibold text-on-surface-variant">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-level1">
                  Apex Tech Institute
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-level1">
                  URU Engineering
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-level1">
                  Business Program
                </span>
              </div>
            </div>
          </div>

          {/* Right Live Thread Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level3 p-5 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="inline-flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  LIVE THREAD • SOLVED IN 14 MINS
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary">
                  CS302 • Algorithms
                </span>
              </div>

              <div className="rounded-xl bg-surface-container-low p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                      AS
                    </span>
                    <span className="text-[12.5px] font-bold text-on-surface">Aryan S.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-semibold">
                    Needs Clarification
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-on-surface">
                  Time Complexity of Dijkstra with Fibonacci Heap vs Binary Heap in Sparse Graphs?
                </p>
                <p className="text-[12px] text-on-surface-variant">
                  In our lecture slides, O(E + V log V) is marked faster, but why doesn’t Fibonacci’s pointer
                  overhead dominate when E is significantly larger than V?
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 p-3.5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    AT
                  </span>
                  <span className="text-[12.5px] font-bold text-on-surface">
                    Dr. Aris Thorne <span className="font-normal text-on-surface-variant">• Chair of Algorithms</span>
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  Spot-on intuition, Aryan. The constant factor in Fibonacci heap’s pointer manipulation dominates
                  until |E| is much larger than |V|; here is the operational proof:
                </p>
                <div className="rounded-xl bg-[#0f172a] text-slate-100 p-3 font-mono text-[11px] leading-relaxed">
                  <div className="text-slate-400">// Binary Heap: O((V + E) log V) decrease-key</div>
                  <div className="text-emerald-300">T_bin = (V + E) * log2(V)</div>
                  <div className="text-slate-400 mt-1">// Fibonacci: O(1) amortized decrease-key</div>
                  <div className="text-indigo-300">T_fib = V * log2(V) + E</div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Verified Explanation (14:21)
                  </span>
                  <span>Solved in 9m 18s</span>
                </div>
              </div>

              <div className="rounded-xl bg-gradient-to-r from-primary to-primary-container text-white px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[12px] font-medium">
                  <span className="material-symbols-outlined text-[16px]">event_available</span>
                  <span>Today now, 2:30 PM • 1-on-1 Confirmed</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('book')}
                  className="px-3 py-1 rounded-lg bg-white text-primary text-[11.5px] font-bold hover:bg-surface-container-low transition-colors shrink-0"
                >
                  Check Office Hours
                </button>
              </div>
            </div>

            {/* Floating Rating Pill */}
            <div className="hidden sm:flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-level2 absolute -bottom-5 right-6">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">star</span>
              </span>
              <div>
                <div className="text-[12.5px] font-bold text-on-surface">5.0 ★ Student Rating</div>
                <div className="text-[10.5px] text-on-surface-variant">Assigned to Dr. Thorne • 2m ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-white border-y border-slate-200/80 py-10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '94%', label: 'Resolved within 24h', sub: 'Guaranteed academic SLA', color: 'text-primary' },
            { value: '12,400+', label: 'Office Hours Booked', sub: 'Zero hallway guesswork', color: 'text-on-surface' },
            { value: '4.9 / 5', label: 'Student Satisfaction', sub: 'Across verified queries', color: 'text-tertiary' },
            { value: '65%', label: 'Faculty Inbox Drop', sub: 'Eliminated duplicates', color: 'text-primary' },
          ].map((m) => (
            <div key={m.label}>
              <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${m.color}`}>{m.value}</div>
              <div className="mt-1 text-[13.5px] font-semibold text-on-surface">{m.label}</div>
              <div className="text-[11.5px] text-on-surface-variant">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottlenecks */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[11px] font-bold tracking-widest uppercase text-primary">The Academic Bottleneck</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Built Specifically to Replace Academic Disorder
          </h2>
          <p className="mt-2 text-[14.5px] text-on-surface-variant">
            Conventional communication mediums fall flat in university architecture. DoubtBridge gives faculty and
            scholars a purpose-built channel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BOTTLENECKS.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 flex flex-col justify-between space-y-5"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-error-container/70 text-on-error-container text-[10px] font-bold tracking-wider">
                  {b.tag}
                </span>
                <h3 className="mt-3 text-[18px] font-bold text-on-surface">{b.title}</h3>
                <p className="mt-2 text-[13.5px] text-on-surface-variant leading-relaxed">{b.body}</p>
              </div>
              <div className="rounded-xl bg-surface-container-low p-4 border border-slate-200/60">
                <div className="flex items-center gap-2 text-[13px] font-bold text-primary">
                  <span className="material-symbols-outlined text-[17px]">{b.pillIcon}</span>
                  <span>{b.pillTitle}</span>
                </div>
                <p className="mt-1 text-[12px] text-on-surface-variant leading-relaxed">{b.pillDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-surface-container-low/60 border-y border-slate-200/70 py-16">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-primary">Workflow</div>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
                From Confused to Confident in Four Steps
              </h2>
            </div>
            <p className="text-[13px] text-on-surface-variant max-w-sm">
              Designed with zero cognitive friction for students and zero workflow disruption for instructors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW_STEPS.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-fixed text-primary font-bold text-[13px]">
                    {s.num}
                  </span>
                  <h3 className="mt-3.5 text-[15.5px] font-bold text-on-surface">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] text-on-surface-variant leading-relaxed">{s.body}</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-surface-container-low text-[11.5px] font-semibold text-primary text-center">
                  {s.foot}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-[1220px] mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[11px] font-bold tracking-widest uppercase text-primary">Features</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
            Built for Academic Excellence at Scale
          </h2>
          <p className="mt-2 text-[14.5px] text-on-surface-variant">
            Every tool an engineering, medical, or humanities department needs for high-velocity scholar guidance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 flex flex-col justify-between space-y-4 hover:shadow-level2 transition-shadow"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[19px]">{f.icon}</span>
                </div>
                <h3 className="mt-3.5 text-[15px] font-bold text-on-surface">{f.title}</h3>
                <p className="mt-1.5 text-[12.5px] text-on-surface-variant leading-relaxed">{f.body}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-on-surface-variant">
                <span>{f.leftTag}</span>
                <span className="text-primary font-semibold">{f.rightTag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Spotlight */}
      <section className="bg-surface-container-low/50 border-t border-slate-200/70 py-16">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-primary">
                Faculty Directory Spotlight
              </div>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
                Connect Directly with University Faculty
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('faculty')}
              className="text-[13px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View All 450+ Department Members</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SPOTLIGHT_FACULTY.map((fac) => (
              <div key={fac.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-indigo-100 text-primary font-bold text-[14px] flex items-center justify-center shrink-0">
                    {fac.initials}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-on-surface">{fac.name}</div>
                    <div className="text-[12px] text-on-surface-variant">{fac.dept}</div>
                    <div className="text-[11.5px] font-semibold text-amber-600 mt-0.5">
                      ★ {fac.rating} <span className="text-on-surface-variant font-normal">({fac.solved})</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-container-low p-3 text-[12px]">
                  <div className="flex items-center justify-between text-on-surface-variant">
                    <span>Next Available Slot</span>
                    <span className="font-semibold text-tertiary">{fac.nextSlot}</span>
                  </div>
                  <div className="mt-1 font-medium text-on-surface">{fac.location}</div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookFaculty(fac.id)}
                  className="w-full py-2 rounded-xl border border-slate-200 bg-white hover:bg-surface-container-low text-[13px] font-semibold text-primary transition-colors"
                >
                  Request Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-[1220px] mx-auto px-4 sm:px-6 py-14">
        <div className="rounded-3xl bg-gradient-to-br from-[#2b1eb8] via-primary to-primary-container text-white px-6 py-12 sm:px-12 text-center shadow-brand">
          <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-[10.5px] font-bold tracking-widest uppercase">
            Immediate Campus Access
          </div>
          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to bridge the gap in your academic journey?
          </h2>
          <p className="mt-3 text-[14.5px] text-indigo-100 max-w-xl mx-auto">
            Join thousands of university scholars getting their coursework queries resolved in record time.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setJoined(true);
              setTimeout(() => onNavigate('dashboard'), 700);
            }}
            className="mt-7 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your student or faculty email"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white text-on-surface text-[13.5px] placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-[13.5px] transition-colors shrink-0"
            >
              {joined ? 'Launching Portal...' : 'Get Free Access'}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11.5px] text-indigo-100/90">
            <span>✓ Instant .edu Access</span>
            <span>✓ Setup in under 60 seconds</span>
            <span>✓ Zero Spam Policy</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-[13px]">
          <div className="space-y-3">
            <BrandLogo />
            <p className="text-[12.5px] text-on-surface-variant leading-relaxed">
              Unified academic platform connecting students directly with departmental faculty, teaching
              assistants, and live office hours in real time.
            </p>
          </div>
          <div>
            <div className="font-bold text-on-surface mb-2.5">Academic Directory</div>
            <ul className="space-y-1.5 text-on-surface-variant">
              <li>Computer Science &amp; Eng</li>
              <li>Electrical Engineering</li>
              <li>Mathematics &amp; Statistics</li>
              <li>Applied Physics Lab</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-on-surface mb-2.5">Campus Resources</div>
            <ul className="space-y-1.5 text-on-surface-variant">
              <li>Academic Calendar</li>
              <li>Faculty Office Hour Rules</li>
              <li>Research Labs</li>
              <li>Honor Code Policy</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-on-surface mb-2.5">Platform Status</div>
            <div className="inline-flex items-center gap-2 text-tertiary font-semibold text-[12.5px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All Systems Operational
            </div>
            <p className="mt-1.5 text-[12px] text-on-surface-variant">Query response SLA active • 99.98% uptime</p>
          </div>
        </div>
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] text-on-surface-variant">
          <span>© 2025 DoubtBridge Academic Technologies. Institutional License.</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
