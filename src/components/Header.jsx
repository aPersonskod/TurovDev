import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { profile } from '../data/profile';

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'text-white'
      : 'text-slate-400 hover:text-white',
  ].join(' ');

export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md font-semibold text-white"
          aria-label={profile.name.en}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500 text-sm font-extrabold">
            TA
          </span>
          <span className="hidden sm:inline">{profile.name.en}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <NavLink to="/" end className={navLinkClass}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            {t('nav.projects')}
          </NavLink>
          <NavLink to="/contacts" className={navLinkClass}>
            {t('nav.contacts')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 md:hidden"
            aria-label={t('a11y.toggleMenu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-slate-800 bg-slate-950/95 md:hidden"
        >
          <div className="container-page flex flex-col py-2">
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.projects')}
            </NavLink>
            <NavLink to="/contacts" className={navLinkClass} onClick={() => setOpen(false)}>
              {t('nav.contacts')}
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}