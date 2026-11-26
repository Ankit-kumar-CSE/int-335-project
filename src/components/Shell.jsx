import { useState } from 'react';
import BrandLogo from './BrandLogo';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: 'grid_view' },
  { id: 'ask', label: 'Ask a Doubt', icon: 'add_box' },
  { id: 'queries', label: 'My Queries', icon: 'forum', badgeKey: 'queries' },
  { id: 'faculty', label: 'Faculty Directory', icon: 'school' },
  { id: 'book', label: 'Book Office Hours', icon: 'calendar_month' },
  { id: 'notifications', label: 'Notifications', icon: 'notifications', badgeKey: 'notifications' },
  { id: 'profile', label: 'Profile', icon: 'person' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Shell({
  route,
  onNavigate,
  pendingQueriesCount = 5,
  unreadNotificationsCount = 3,
  searchQuery,
  onSearchChange,
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [term, setTerm] = useState('Fall 2025 - CS & Engineering');

  const getBadge = (key) => {
    if (key === 'queries') return pendingQueriesCount;
    if (key === 'notifications') return unreadNotificationsCount;
    return 0;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white border-r border-slate-200/80">
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
          <button
            type="button"
            onClick={() => {
              onNavigate('landing');
              setMobileOpen(false);
            }}
            className="text-left focus:outline-none"
            title="Back to DoubtBridge Home"
          >
            <BrandLogo />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = route === item.id;
            const badge = item.badgeKey ? getBadge(item.badgeKey) : 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-brand'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[19px] ${active ? 'text-white' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
                {badge > 0 && (
                  <span
                    className={`min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-semibold inline-flex items-center justify-center ${
                      active
                        ? 'bg-white/20 text-white'
                        : item.badgeKey === 'notifications'
                        ? 'bg-primary text-white'
                        : 'bg-surface-container text-primary'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5">
        <div className="rounded-2xl bg-surface-container-low border border-slate-200/70 p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-tertiary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Faculty Online</span>
          </div>
          <div className="mt-1.5 text-[15px] font-bold text-on-surface">24 Available Now</div>
          <p className="mt-0.5 text-[11.5px] text-on-surface-variant leading-snug">
            Instant query matching enabled
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[232px] shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[248px] max-w-[80vw] h-full z-10">{sidebarContent}</div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Utility Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-on-surface hover:bg-surface-container-low"
              aria-label="Open navigation"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-surface-container-low border border-slate-200/80 rounded-xl px-3 py-1.5 text-[12.5px] font-medium text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer font-medium text-on-surface"
                aria-label="Academic Term"
              >
                <option>Fall 2025 - CS &amp; Engineering</option>
                <option>Spring 2025 - CS &amp; Engineering</option>
                <option>Fall 2025 - Mathematics</option>
              </select>
            </div>

            <div className="relative hidden md:block w-56 xl:w-72">
              <span className="material-symbols-outlined text-[17px] text-outline absolute left-3 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search queries, faculty..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-container-low border border-slate-200/80 text-[13px] placeholder:text-outline focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed/70 hover:bg-tertiary-fixed text-on-tertiary-fixed text-[12px] font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              <span>Next Office Hour in 42m with Dr. Rao</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[21px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="hidden sm:block text-right">
                <div className="text-[12.5px] font-semibold text-on-surface leading-tight">Alex Chen</div>
                <div className="text-[11px] text-on-surface-variant leading-tight">Student | CS Dept</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container text-white text-[12px] font-bold flex items-center justify-center shadow-sm">
                AC
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1380px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
