import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Github, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import TechBadge from '../components/TechBadge';
import EmailButton from '../components/EmailButton';
import ProjectCard from '../components/ProjectCard';
import useDocumentMeta from '../hooks/useDocumentMeta';

import avatarUrl from '../assets/profile/avatar.png';
import { profile, skillGroups } from '../data/profile';
import { projects } from '../data/projects';
import { offeredServices } from '../data/offeredServices';
import { pickLocalized } from '../utils/localize';
import { getPath } from '../App';
import AdsComponent from "./AdsComponent.jsx";

const EXPERIENCE_KEYS = ['years', 'fromScratch', 'legacy', 'highload'];

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const reduceMotion = useReducedMotion();
  const profileName = pickLocalized(profile.name, lang);

  useDocumentMeta(t('meta.home.title'), t('meta.home.description'));

  const featured = projects.filter((p) => p.featured).slice(0, 3);

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  return (
    <PageTransition>
      {/* ────────────── HERO ────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <motion.div {...fade}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t('hero.available')}
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {profileName}
            </h1>
            <p className="mt-3 text-lg font-medium text-indigo-300">{t('hero.role')}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              {t('hero.bio')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <EmailButton />
              <Link to={`${getPath('/projects')}`} className="btn-ghost">
                {t('hero.viewProjects')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-sm"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-emerald-500/10 shadow-2xl shadow-indigo-500/5">
              <img
                src={avatarUrl}
                alt={t('hero.avatarAlt')}
                className="h-full w-full object-cover"
                width="400"
                height="400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ────────────── OPPORTUNITIES ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <SectionTitle title={t('opportunities.title')} subtitle={t('opportunities.subtitle')} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offeredServices.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={service.image}
                  alt={t(`opportunities.services.${service.slug}.title`)}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-white">
                  {pickLocalized(service.title, lang)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {pickLocalized(service.subtitle, lang)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ────────────── Ads ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-4">
          <div
              key='ads_key'
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70"
          >
            <AdsComponent/>
          </div>
        </div>
      </section>

      {/* ────────────── EXPERIENCE HIGHLIGHTS ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <SectionTitle title={t('experience.title')} subtitle={t('experience.subtitle')}/>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCE_KEYS.map((key) => (
              <div
                  key={key}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70"
              >
                <p className="text-3xl font-extrabold text-indigo-400">
                  {t(`experience.items.${key}.value`)}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {t(`experience.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {t(`experience.items.${key}.text`)}
                </p>
              </div>
          ))}
        </div>
      </section>

      {/* ────────────── FEATURED PROJECTS ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle title={t('featured.title')} subtitle={t('featured.subtitle')}/>
          <Link
            to={`${getPath('/projects')}`}
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            {t('featured.viewAll')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

           {/* ────────────── SKILLS ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <SectionTitle title={t('skills.title')} subtitle={t('skills.subtitle')} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.key}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <h3 className="mb-3 text-sm font-semibold text-white">
                {t(`skills.groups.${group.key}`)}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <TechBadge key={item}>{item}</TechBadge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── CONTACT ────────────── */}
      <section className="container-page py-16 sm:py-20">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-500/10 via-slate-900/60 to-emerald-500/5 p-8 sm:p-12">
          <SectionTitle title={t('contacts.title')} subtitle={t('contacts.intro')} />

          <div className="flex flex-wrap gap-3">
            <EmailButton />

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github size={18} aria-hidden="true" />
              <span>{t('contacts.channels.github')}</span>
            </a>

            <a
              href={profile.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Send size={18} aria-hidden="true" />
              <span>{t('contacts.channels.telegram')}</span>
            </a>

            <Link
              to={`${getPath('/contacts')}`}
              className="btn-ghost"
            >
              <Phone size={18} aria-hidden="true" />
              <span>{t('contacts.channels.phone')}</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}