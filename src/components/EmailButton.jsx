import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';
import { Link } from 'react-router-dom';
import { getPath } from '../App';

/**
 * Filled accent CTA that opens the user's mail client with a pre-filled subject.
 * The `mailto:` value comes from `src/data/profile.js`.
 */
export default function EmailButton({ label, variant = 'primary', className = '' }) {
  const { t } = useTranslation();
  const subject = encodeURIComponent(profile.emailSubject || '');
  const href = `mailto:${profile.email}${subject ? `?subject=${subject}` : ''}`;

  const styles =
    variant === 'primary'
      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400'
      : 'border border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-800/50';

  return (
/*     <a
      href={href}
      className={['btn', styles, className].join(' ')}
      aria-label={label || t('hero.contactMe')}
    >
      <Mail size={18} aria-hidden="true" />
      <span>{label || t('hero.contactMe')}</span>
    </a> */
    <Link
      to={`${getPath('/contacts')}`}
      className={['btn', styles, className].join(' ')}
      aria-label={label || t('hero.contactMe')}
    >
      <Mail size={18} aria-hidden="true" />
      <span>{label || t('hero.contactMe')}</span>
    </Link>
  );
}