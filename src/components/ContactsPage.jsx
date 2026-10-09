import { useState, useEffect } from 'react';
import {
  Clock,
  Github,
  Globe,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ContactCard from '../components/ContactCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { profile } from '../data/profile';
import { pickLocalized } from '../utils/localize';

/** Small definition-list row used in the availability panel. */
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <span className="mt-0.5 text-slate-500">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs text-slate-500">{label}</dt>
        <dd className="mt-0.5 text-sm text-slate-200">{value}</dd>
      </div>
    </div>
  );
}

export default function ContactsPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;

    const getFormattedDate = () => new Date().toLocaleDateString('ru-RU', { /* en-US */
    timeZone: profile.timezone, // Target timezone
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
  
  useDocumentMeta(t('meta.contacts.title'), t('meta.contacts.description'));
  
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [timeZone, setTimeZone] = useState(getFormattedDate());

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError(t('contacts.form.errorRequired'));
      return;
    }
    setError('');

    // Build a mailto: link — no backend, no data leaves the browser until
    // the user actually presses "Send" in their mail client.
    const subject = encodeURIComponent(`${profile.emailSubject} — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}${form.email ? `\n${form.email}` : ''}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
      const timerId = setInterval(() => {
          setTimeZone(getFormattedDate());
      }, 1000);

      // Clean up the interval when the component unmounts to prevent memory leaks
      return () => clearInterval(timerId);
  }, []);

  return (
    <PageTransition>
      <div className="container-page py-16 sm:py-20">
        <SectionTitle title={t('contacts.title')} subtitle={t('contacts.intro')} />

        <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr]">
          {/* ─────────────── LEFT: channels + form ─────────────── */}
          <div className="space-y-10">
            <section>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                {t('contacts.channels.title')}
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactCard
                  icon={Mail}
                  label={t('contacts.channels.email')}
                  value={profile.email}
                  hint={t('contacts.channels.emailHint')}
                  href={`mailto:${profile.email}`}
                  copyable
                />
                <ContactCard
                  icon={Send}
                  label={t('contacts.channels.telegram')}
                  value={profile.telegramHandle}
                  hint={t('contacts.channels.telegramHint')}
                  href={profile.telegram}
                  external
                  copyable
                />
                <ContactCard
                  icon={Github}
                  label={t('contacts.channels.github')}
                  value={profile.githubHandle}
                  hint={t('contacts.channels.githubHint')}
                  href={profile.github}
                  external
                />
                <ContactCard
                  icon={Phone}
                  label={t('contacts.channels.phone')}
                  value={profile.phone}
                  hint={t('contacts.channels.phoneHint')}
                  /* href={profile.phone} */
                  copyable
                />
              </div>
            </section>

            <section
              aria-labelledby="contacts-form-title"
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8"
            >
              <h2 id="contacts-form-title" className="text-lg font-semibold text-white">
                {t('contacts.form.title')}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{t('contacts.form.subtitle')}</p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-slate-300">
                      {t('contacts.form.name')} *
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={onChange('name')}
                      placeholder={t('contacts.form.namePlaceholder')}
                      autoComplete="name"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-slate-300">
                      {t('contacts.form.email')}
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={onChange('email')}
                      placeholder={t('contacts.form.emailPlaceholder')}
                      autoComplete="email"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-slate-300">
                    {t('contacts.form.message')} *
                  </span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={onChange('message')}
                    placeholder={t('contacts.form.messagePlaceholder')}
                    className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                </label>

                {error && (
                  <p role="alert" className="text-xs text-rose-400">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-slate-500">{t('contacts.form.requiredHint')}</p>
                  <button type="submit" className="btn-primary">
                    <MessageSquare size={16} aria-hidden="true" />
                    <span>{t('contacts.form.submit')}</span>
                  </button>
                </div>
              </form>
            </section>
          </div>

          {/* ─────────────── RIGHT: availability sidebar ─────────────── */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-500/10 via-slate-900/60 to-emerald-500/5 p-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm font-semibold text-white">
                  {t('contacts.availability.status')}
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {pickLocalized(profile.availability, lang)}
              </p>
            </div>

            <dl className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/40">
              <InfoRow
                icon={MapPin}
                label={t('contacts.availability.location')}
                value={pickLocalized(profile.location, lang)}
              />
              <InfoRow
                icon={Clock}
                label={t('contacts.availability.timezone')}
                value={timeZone}
              />
              <InfoRow
                icon={Globe}
                label={t('contacts.availability.response')}
                value={t('contacts.availability.responseValue')}
              />
              <InfoRow
                icon={Globe}
                label={t('contacts.availability.languages')}
                value={t('contacts.availability.languagesValue')}
              />
            </dl>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}