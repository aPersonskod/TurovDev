import { Link } from 'react-router-dom';
import { Github, Phone, Mail, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { pickLocalized } from '../utils/localize';
import { profile } from '../data/profile';

const iconBtn =
  'rounded-lg border border-slate-800 p-2 text-slate-300 transition hover:border-slate-600 hover:text-white';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const year = new Date().getFullYear();
  const profileName = pickLocalized(profile.name, lang);

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-400">
          <p>
            © {year} {profileName}. {t('footer.rights')}
          </p>
          <p className="mt-1 text-xs text-slate-500">{t('footer.builtWith')}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className={iconBtn}
            aria-label={t('contact.email')}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label={t('contact.github')}
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label={t('contact.telegram')}
          >
            <Send size={18} aria-hidden="true" />
          </a>
          <Link
            to='/contacts'
            className={iconBtn}
            aria-label={t('contact.phone')}
          >
            <Phone size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}