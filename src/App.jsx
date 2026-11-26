import { useState } from 'react';
import Shell from './components/Shell';
import useHashRoute from './hooks/useHashRoute';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Ask from './pages/Ask';
import Faculty from './pages/Faculty';
import Book from './pages/Book';
import {
  MyQueriesPage,
  NotificationsPage,
  ProfilePage,
  SettingsPage,
} from './pages/PortalViews';
import { INITIAL_BOOKINGS, INITIAL_NOTIFICATIONS, INITIAL_QUERIES } from './data';

export default function App() {
  const [route, go] = useHashRoute('landing');
  const [queries, setQueries] = useState(INITIAL_QUERIES);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [facultyId, setFacultyId] = useState('thorne');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  if (route === 'landing') {
    return (
      <>
        <Landing
          onNavigate={go}
          onBookFaculty={(id) => {
            setFacultyId(id);
            go('book');
          }}
        />
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-on-surface text-white px-5 py-3 rounded-xl shadow-level3 text-[13px] font-semibold z-50">
            {toast}
          </div>
        )}
      </>
    );
  }

  let page = null;
  if (route === 'ask') {
    page = (
      <Ask
        onSubmit={(newQuery) => {
          setQueries([{ ...newQuery, id: `DB-${8420 + queries.length}` }, ...queries]);
          showToast('Doubt submitted to faculty queue');
          go('dashboard');
        }}
        onSaveDraft={() => showToast('Draft saved to your academic ledger')}
        onBookOfficeHour={() => go('book')}
      />
    );
  } else if (route === 'faculty') {
    page = (
      <Faculty
        onBook={(id) => {
          setFacultyId(id);
          go('book');
        }}
        onAskFaculty={(fac) => {
          setFacultyId(fac.id);
          showToast(`Selected ${fac.name} for your query`);
          go('ask');
        }}
        onToast={showToast}
      />
    );
  } else if (route === 'book') {
    page = (
      <Book
        facultyId={facultyId}
        setFacultyId={setFacultyId}
        bookings={bookings}
        onConfirm={(booking) => {
          setBookings([booking, ...bookings]);
          showToast(`Office hour confirmed with ${booking.facultyName}`);
          go('dashboard');
        }}
        onSaveDraft={() => showToast('Tentative slot saved as draft')}
        onNavigate={go}
      />
    );
  } else if (route === 'queries') {
    page = (
      <MyQueriesPage
        queries={queries}
        onAskNew={() => go('ask')}
        onBook={() => go('book')}
      />
    );
  } else if (route === 'notifications') {
    page = (
      <NotificationsPage
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
          showToast('All notifications marked as read');
        }}
      />
    );
  } else if (route === 'profile') {
    page = <ProfilePage />;
  } else if (route === 'settings') {
    page = <SettingsPage onSave={() => showToast('Portal preferences saved')} />;
  } else {
    page = (
      <Dashboard
        queries={queries}
        bookings={bookings}
        searchQuery={searchQuery}
        onNavigate={go}
        onPingFaculty={(fac) => showToast(`Pinged ${fac.name} (${fac.liveTag})`)}
        onCheckIn={(b) => showToast(`Checked in for ${b.facultyName} • ${b.location}`)}
      />
    );
  }

  const unreadCount = notifications.filter((n) => n.unread).length;
  const openQueriesCount = queries.filter((q) => q.status !== 'Resolved').length + 3;

  return (
    <>
      <Shell
        route={route === 'landing' ? 'dashboard' : route}
        onNavigate={go}
        pendingQueriesCount={openQueriesCount}
        unreadNotificationsCount={unreadCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {page}
      </Shell>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-on-surface text-white px-5 py-3 rounded-xl shadow-level3 text-[13px] font-semibold z-50">
          {toast}
        </div>
      )}
    </>
  );
}
