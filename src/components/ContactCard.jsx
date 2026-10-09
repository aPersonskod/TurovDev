import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * A single contact channel card.
 *  - If `href` is provided, the whole card becomes a link.
 *  - If `external` is true, the link opens in a new tab with rel="noopener noreferrer".
 *  - If `copyable` is true, a small Copy button appears (copies `value` to clipboard).
 */
export default function ContactCard({
  icon: Icon,
  label,
  value,
  hint,
  href,
  external = false,
  copyable = false,
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard API unavailable — silently ignore. */
    }
  };

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-slate-800 bg-slate-950 text-indigo-300">
          <Icon size={18} aria-hidden="true" />
        </span>

        <div className="flex items-center gap-1">
          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? t('contacts.copy.copied') : t('contacts.copy.copy')}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {copied ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <Copy size={14} aria-hidden="true" />
              )}
            </button>
          )}
          {href && external && (
            <ArrowUpRight size={16} className="text-slate-600" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="mt-4 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white">{value}</p>
        {hint && <p className="mt-1 text-xs leading-relaxed text-slate-400">{hint}</p>}
      </div>
    </>
  );

  const baseCls =
    'group relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400';

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={baseCls}
      >
        {body}
      </a>
    );
  }

  return <div className={baseCls}>{body}</div>;
}