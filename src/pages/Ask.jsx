import { useState } from 'react';
import { FACULTY } from '../data';

const TOPICS = [
  'Graph Theory',
  'Dynamic Programming',
  'Greedy Approaches',
  'Asymptotic Analysis',
  'Shortest Path',
];

const FAQ_MATCHES = [
  {
    title: 'Why does Dijkstra fail with negative edges even if no negative cycle exists?',
    author: 'Dr. Thorne',
    helpful: '4 helpful',
  },
  {
    title: 'Proof of Bellman-Ford termination in V-1 iterations',
    author: 'Prof. Sen',
    helpful: '12 helpful',
  },
];

export default function Ask({ onSubmit, onSaveDraft, onBookOfficeHour }) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS302 - Design & Analysis of Algorithms');
  const [facultyId, setFacultyId] = useState('auto');
  const [selectedTopics, setSelectedTopics] = useState(['Graph Theory']);
  const [narrative, setNarrative] = useState(
    '1. What were you trying to solve?\nI was tracing Bellman-Ford on a directed graph with a negative edge cycle...\n\n2. Where did you get stuck?\nI do not understand why the (V-1)-th pass is strictly sufficient to propagate shortest distances if no negative cycles exist, vs detecting one on the V-th iteration...'
  );
  const [latexFormula, setLatexFormula] = useState(
    '$$\\text{Relaxation: } d[v] = \\min(d[v], d[u] + w(u,v)) \\quad \\forall (u,v) \\in E$$'
  );
  const [attachment, setAttachment] = useState('algorithm_hw3_problem4.png');
  const [urgency, setUrgency] = useState('Normal');
  const [deadline, setDeadline] = useState('2025-10-18');
  const [anonymousArchival, setAnonymousArchival] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleTopic = (t) => {
    setSelectedTopics((prev) => {
      if (prev.includes(t)) return prev.filter((item) => item !== t);
      if (prev.length >= 3) return prev;
      return [...prev, t];
    });
  };

  const handleCopyLatex = () => {
    navigator.clipboard?.writeText(latexFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const chosenFaculty =
      facultyId === 'auto'
        ? FACULTY[0]
        : FACULTY.find((f) => f.id === facultyId) || FACULTY[0];

    onSubmit({
      title: title.trim() || 'Bellman-Ford V-1 relaxation sufficiency proof',
      course: course.split(' - ')[0],
      courseColor: 'bg-primary-fixed text-primary',
      priority: urgency,
      status: 'Pending Review',
      excerpt: narrative.replace(/\n+/g, ' ').slice(0, 120) + '...',
      facultyName: chosenFaculty.name,
      facultyInitials: chosenFaculty.initials,
      timestamp: 'Just now',
      topic: selectedTopics[0] || 'Algorithms',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10.5px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Fall 2025 • Mid-Semester Phase
          </div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-on-surface">
            Submit an Academic Doubt
          </h1>
          <p className="text-[13.5px] text-on-surface-variant max-w-2xl">
            Get clear, timely explanations from your course instructors and teaching assistants. All queries are
            tracked and recorded in your permanent academic ledger.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-xl bg-surface-container-low border border-slate-200/70">
            <div className="text-[10px] font-bold tracking-wider uppercase text-on-surface-variant">
              Avg Response Time
            </div>
            <div className="text-[15px] font-extrabold text-tertiary flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[17px]">bolt</span>
              <span>3.4 Hours</span>
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-primary-fixed/60 border border-primary/20 text-[12.5px] font-semibold text-primary inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px]">verified_user</span>
            <span>Direct Faculty Queue</span>
          </div>
        </div>
      </section>

      {/* Main 12-Col Form & Sidebar */}
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-[16px] font-bold text-on-surface">Query Classification &amp; Identity</h2>
              </div>
              <span className="text-[11.5px] text-on-surface-variant">* Required fields</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[12.5px] font-semibold text-on-surface">Doubt Title *</label>
              <input
                type="text"
                maxLength={120}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Explain why Bellman-Ford requires V-1 relaxations for negative cycles"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[13.5px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span>Be concise, academic, and specific to the algorithm or concept.</span>
                <span>{title.length} / 120</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[12.5px] font-semibold text-on-surface">Subject &amp; Course Code *</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option>CS302 - Design &amp; Analysis of Algorithms</option>
                  <option>CS301 - Database Management Systems</option>
                  <option>CS304 - Operating Systems</option>
                  <option>MATH201 - Linear Algebra</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[12.5px] font-semibold text-on-surface">Target Faculty Assignment</label>
                <select
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-surface-container-low text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-primary-container"
                >
                  <option value="auto">⚡ Auto-assign to Primary Instructor</option>
                  {FACULTY.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="font-semibold text-on-surface">
                  Topic &amp; Module Categorization <span className="font-normal text-on-surface-variant">(Select up to 3)</span>
                </span>
                <span className="text-[11.5px] font-semibold text-primary">+ Request New Topic</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => {
                  const active = selectedTopics.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTopic(t)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                        active
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      {active ? `✓ ${t}` : `+ ${t}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-[16px] font-bold text-on-surface">Detailed Explanation &amp; Artifacts</h2>
              </div>
              <span className="text-[11.5px] font-semibold text-primary">✨ Markdown &amp; LaTeX Enabled</span>
            </div>

            <div className="space-y-2">
              <label className="block text-[12.5px] font-semibold text-on-surface">
                Question Narrative &amp; Breakdown *
              </label>
              <div className="rounded-xl border border-slate-300 overflow-hidden">
                <div className="px-3 py-2 bg-surface-container-low border-b border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200">B</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 italic">I</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">&lt;/&gt;</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">$$ \sum $$</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-on-surface-variant">
                    LaTeX Supported
                  </span>
                </div>
                <div className="px-3.5 py-2 bg-primary-fixed/35 border-b border-slate-200/70 text-[11.5px] text-primary">
                  <strong>Pro Tip:</strong> Address (1) What you attempted, (2) Exactly where intuition broke, (3) Edge
                  cases tested.
                </div>
                <textarea
                  rows={6}
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  className="w-full p-3.5 text-[13px] text-on-surface bg-white focus:outline-none resize-y"
                />
              </div>
            </div>

            {/* Dark Code / Math Formula Inset */}
            <div className="rounded-xl bg-[#0f172a] text-slate-100 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Code / Math Formula Inset</span>
                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="text-emerald-300 hover:text-emerald-200 font-semibold"
                >
                  {copied ? 'Copied!' : 'Copy Template'}
                </button>
              </div>
              <textarea
                rows={2}
                value={latexFormula}
                onChange={(e) => setLatexFormula(e.target.value)}
                className="w-full bg-transparent text-emerald-300 font-mono text-[12px] focus:outline-none resize-none"
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <label className="block text-[12.5px] font-semibold text-on-surface">
                Attachments &amp; Problem Snapshots
              </label>
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-surface-container-low/60 p-6 text-center space-y-2">
                <span className="w-10 h-10 rounded-full bg-white border border-slate-200 text-primary inline-flex items-center justify-center">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </span>
                <div className="text-[13px] font-semibold text-on-surface">
                  Drop lecture slides, notebook photos, or PDF/code
                </div>
                <div className="text-[11.5px] text-on-surface-variant">
                  Supports PNG, JPG, PDF, or CPP/PY files (Max 15MB each)
                </div>
                <label className="inline-block mt-1 px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-[12px] font-semibold text-on-surface hover:bg-surface-container-low cursor-pointer">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setAttachment(f.name);
                    }}
                  />
                </label>
              </div>

              {attachment && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-fixed/50 text-[12px] font-medium text-on-surface">
                    <span className="material-symbols-outlined text-[16px] text-primary">image</span>
                    <span>{attachment}</span>
                    <span className="text-on-surface-variant">1.2 MB • Ready</span>
                    <button
                      type="button"
                      onClick={() => setAttachment('')}
                      className="text-on-surface-variant hover:text-error"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-tertiary">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    System virus scan passed
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-primary text-white text-[12px] font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="text-[16px] font-bold text-on-surface">Urgency &amp; Privacy Governance</h2>
            </div>

            <div className="space-y-2">
              <div className="text-[12.5px] font-semibold text-on-surface">Query SLA &amp; Urgency Level *</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUrgency('Normal')}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    urgency === 'Normal'
                      ? 'border-primary bg-primary-fixed/25 ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="text-[13.5px] font-bold text-on-surface">● Normal Priority</div>
                  <p className="mt-1 text-[12px] text-on-surface-variant leading-relaxed">
                    Standard scholastic review. Response delivered within 24–48 hours by TA or Instructor.
                  </p>
                </button>

                <div
                  onClick={() => setUrgency('Urgent')}
                  className={`cursor-pointer text-left p-4 rounded-xl border transition-all ${
                    urgency === 'Urgent'
                      ? 'border-error bg-error-container/35 ring-2 ring-error/20'
                      : 'border-error/30 bg-error-container/20'
                  }`}
                >
                  <div className="text-[13.5px] font-bold text-error">● Urgent Escalation</div>
                  <p className="mt-1 text-[12px] text-on-surface-variant leading-relaxed">
                    Exam or assignment deadline within 24 hours. Instructors receive push notification.
                  </p>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-2.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[12px]"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low/80 border border-slate-200/70 cursor-pointer">
              <input
                type="checkbox"
                checked={anonymousArchival}
                onChange={(e) => setAnonymousArchival(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <div>
                <div className="text-[13px] font-semibold text-on-surface">
                  Allow anonymous archival in Course Knowledge Base
                </div>
                <div className="text-[11.5px] text-on-surface-variant">
                  Your name and student ID remain 100% confidential. The question formulation and faculty answer will
                  help peer students facing identical algorithmic hurdles.
                </div>
              </div>
            </label>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11.5px] text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
                <span>Protected by FERPA &amp; Campus Academic Integrity Code</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onSaveDraft}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-[13px] font-semibold text-on-surface"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white text-[13px] font-semibold shadow-brand hover:opacity-95 inline-flex items-center gap-1.5"
                >
                  <span>Submit Doubt to Faculty</span>
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Duplicate & FAQ Radar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[14.5px] font-bold text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary">auto_awesome</span>
                <span>AI Duplicate &amp; FAQ Radar</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10.5px] font-bold">
                Live
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant">
              Based on your course <strong>CS302</strong> and draft title keywords, these verified solutions might
              solve your query immediately:
            </p>
            <div className="space-y-2.5">
              {FAQ_MATCHES.map((m) => (
                <div
                  key={m.title}
                  className="rounded-xl bg-surface-container-low p-3.5 border border-slate-200/60 hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <div className="text-[12.5px] font-bold text-on-surface leading-snug">{m.title}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>✓ {m.author}</span>
                    <span className="text-amber-700 font-semibold">👍 {m.helpful}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full text-center text-[12px] font-semibold text-primary hover:underline"
            >
              Explore 14 more CS302 resolved threads &gt;
            </button>
          </div>

          {/* Instructor Status */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14.5px] font-bold text-on-surface">Instructor Status</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold">
                • Online
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-primary font-bold text-[13px] flex items-center justify-center">
                AT
              </div>
              <div>
                <div className="text-[14px] font-bold text-on-surface">Dr. Aris Thorne</div>
                <div className="text-[12px] text-on-surface-variant">Course Head • Algorithms</div>
              </div>
            </div>

            <div className="space-y-2 text-[12px] text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-tertiary">check</span>
                <span>Available for online doubt evaluation today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-primary">calendar_today</span>
                <span>Next Office Hour: Tomorrow, 2:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-primary">group</span>
                <span>Capacity: 4 / 6 student slots remaining</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBookOfficeHour}
              className="w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-[12.5px] font-semibold text-on-surface inline-flex items-center justify-center gap-1.5"
            >
              <span>Book 1-on-1 Office Hour Instead</span>
              <span className="material-symbols-outlined text-[16px]">event</span>
            </button>
          </div>

          {/* Guidelines for Fast Triage */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-level1 p-5 space-y-3.5">
            <h3 className="text-[14.5px] font-bold text-on-surface">Guidelines for Fast Triage</h3>
            {[
              {
                n: 1,
                title: 'Reference Lecture Slides',
                desc: 'Provide the exact slide or textbook page number (e.g. CLRS Chapter 24.1).',
              },
              {
                n: 2,
                title: 'Include Your Rough Work',
                desc: 'Faculty prioritize students who show where their manual calculation differed.',
              },
              {
                n: 3,
                title: 'Format Code Snippets',
                desc: 'Avoid raw screenshots of terminals. Use the toolbar code block for syntax highlighting.',
              },
            ].map((g) => (
              <div key={g.n} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {g.n}
                </span>
                <div>
                  <div className="text-[12.5px] font-bold text-on-surface">{g.title}</div>
                  <div className="text-[11.5px] text-on-surface-variant leading-relaxed">{g.desc}</div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-on-surface-variant">
              Recorded in student academic audit trail: <strong className="text-on-surface">#DB-2025-F-941</strong>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
