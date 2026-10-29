'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Bell,
  BookOpenCheck,
  Boxes,
  ClipboardCheck,
  GitBranch,
  LayoutDashboard,
  Menu,
  PackageCheck,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Sprout,
  UploadCloud,
  Wifi,
  X,
} from 'lucide-react';
import { ModePill } from './ui';
import { pendingOfflineOperations, syncOfflineOperations } from '@/lib/offline/outbox';

const primaryNav = [
  { href: '/staff', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/staff/sourcing', label: 'Sourcing & purchases', icon: Sprout },
  { href: '/staff/material', label: 'Material & lineage', icon: GitBranch },
  { href: '/staff/quality', label: 'Quality & holds', icon: ShieldCheck },
  { href: '/staff/packaging', label: 'Packaging & publication', icon: PackageCheck },
  { href: '/staff/operations', label: 'Operations & compliance', icon: ClipboardCheck },
];

const utilityNav = [
  { href: '/staff/operations?tab=sops', label: 'SOP library', icon: BookOpenCheck },
  { href: '/staff/operations?tab=forms', label: 'Completed forms', icon: UploadCloud },
];

function Brand({ compact = false }) {
  return (
    <Link className={`v1-brand ${compact ? 'v1-brand-compact' : ''}`.trim()} href="/staff" aria-label="HB-TRACE staff home">
      <span className="brand-mark" aria-hidden="true">HB</span>
      <span className="brand-wordmark"><strong>Humble Beeing</strong><small>HB-TRACE / V1</small></span>
    </Link>
  );
}

function NavLink({ item, pathname, onNavigate }) {
  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
  const Icon = item.icon;
  return (
    <Link
      className={`staff-nav-link ${isActive ? 'staff-nav-link-active' : ''}`.trim()}
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={isActive ? 2.4 : 1.9} />
      <span>{item.label}</span>
    </Link>
  );
}

function Sidebar({ pathname, open, onClose, mode, pendingCount, onSync, syncing }) {
  return (
    <>
      {open ? <Button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={onClose} /> : null}
      <aside className={`staff-sidebar ${open ? 'staff-sidebar-open' : ''}`.trim()} aria-label="Staff navigation">
        <div className="sidebar-top">
          <Brand />
          <Button className="icon-button sidebar-close" type="button" onClick={onClose} aria-label="Close navigation">
            <X aria-hidden="true" size={19} />
          </Button>
        </div>
        <div className="sidebar-mode">
          <ModePill mode={mode} />
          <p>{mode === 'hosted' ? 'Authenticated workspace. Actions are subject to server permissions.' : 'Sample records only. Server permissions and sync are not connected.'}</p>
        </div>
        <nav className="staff-nav" aria-label="Primary">
          <p className="nav-label">Workspace</p>
          {primaryNav.map((item) => <NavLink item={item} pathname={pathname} onNavigate={onClose} key={item.href} />)}
          <p className="nav-label nav-label-spaced">Reference</p>
          {utilityNav.map((item) => <NavLink item={item} pathname={pathname} onNavigate={onClose} key={item.href} />)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sync-card">
            <div className="sync-card-icon"><Wifi aria-hidden="true" size={16} /></div>
            <div><strong>{mode === 'hosted' ? 'Sync queue' : 'Local queue'}</strong><span>{pendingCount} record{pendingCount === 1 ? '' : 's'} pending</span></div>
            <Button className="sync-dot-button" type="button" onClick={onSync} disabled={syncing} aria-label={syncing ? 'Synchronizing local queue' : 'Sync local queue'} title={syncing ? 'Synchronizing…' : 'Sync now'}><span className="sync-dot" aria-hidden="true" /></Button>
          </div>
          <Link className="public-link" href="/verify" onClick={onClose}>Open public batch page ↗</Link>
        </div>
      </aside>
    </>
  );
}

function StaffHeader({ onMenu, mode }) {
  return (
    <header className="staff-header">
      <div className="staff-header-left">
        <Button className="icon-button mobile-menu-button" type="button" onClick={onMenu} aria-label="Open navigation">
          <Menu aria-hidden="true" size={21} />
        </Button>
        <div className="staff-search" role="search">
          <Search aria-hidden="true" size={17} />
          <Input aria-label="Search demo records" placeholder="Search records, batches, forms…" />
          <kbd>⌘ K</kbd>
        </div>
      </div>
      <div className="staff-header-right">
        <div className="header-connectivity"><span className="online-dot" /> {mode === 'hosted' ? 'Hosted session' : 'Local cache ready'}</div>
        <Button className="icon-button notification-button" type="button" aria-label="3 notifications">
          <Bell aria-hidden="true" size={18} />
          <span className="notification-count">3</span>
        </Button>
        <div className="staff-user" aria-label={mode === 'hosted' ? 'Signed in staff user' : 'Signed in demo user'}>
          <span className="avatar">AM</span>
          <span><strong>{mode === 'hosted' ? 'Authenticated staff' : 'Amina M.'}</strong><small>{mode === 'hosted' ? 'Server-authorized session' : 'Production staff · demo'}</small></span>
        </div>
        <Button className="icon-button header-more" type="button" aria-label="More account options"><PanelLeftClose aria-hidden="true" size={18} /></Button>
      </div>
    </header>
  );
}

export default function StaffShell({ children, mode = 'local' }) {
  const pathname = usePathname() || '/staff';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  async function refreshQueue() {
    const operations = await pendingOfflineOperations();
    setPendingCount(operations.length);
  }

  async function syncQueue() {
    setSyncing(true);
    try {
      await syncOfflineOperations();
    } finally {
      await refreshQueue();
      setSyncing(false);
    }
  }

  useEffect(() => {
    void refreshQueue();
    const handleOnline = () => { void syncQueue(); };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <div className="v1-root staff-root">
      <Sidebar pathname={pathname} open={sidebarOpen} onClose={() => setSidebarOpen(false)} mode={mode} pendingCount={pendingCount} onSync={() => { void syncQueue(); }} syncing={syncing} />
      <div className="staff-frame">
        <StaffHeader onMenu={() => setSidebarOpen(true)} mode={mode} />
        <main className="staff-content">{children}</main>
      </div>
    </div>
  );
}
