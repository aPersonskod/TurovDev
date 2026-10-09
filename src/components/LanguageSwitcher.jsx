import { useTranslation } from 'react-i18next';

const LANGS = ['en', 'ru'];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'en').startsWith('ru') ? 'ru' : 'en';

  const change = (lng) => {
    if (lng !== current) i18n.changeLanguage(lng);
  };

  return (
    <div
      role="group"
      aria-label={t('a11y.switchLanguage')}
      className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 p-1 text-xs font-semibold"
    >
      {LANGS.map((lng) => {
        const active = lng === current;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => change(lng)}
            aria-pressed={active}
            className={[
              'rounded-full px-3 py-1 uppercase tracking-wide transition',
              active
                ? 'bg-indigo-500 text-white'
                : 'text-slate-300 hover:text-white',
            ].join(' ')}
          >
            {lng}
          </button>
        );
      })}
    </div>
  );
}