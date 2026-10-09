import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import TechBadge from '../components/TechBadge';
import ProjectGallery from '../components/ProjectGallery';
import NotFoundPage from './NotFoundPage';

import useDocumentMeta from '../hooks/useDocumentMeta';
import { projects } from '../data/projects';
import { getProjectImages } from '../utils/projectImages';
import { pickLocalized } from '../utils/localize';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;

  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : null;

  useDocumentMeta(
    project ? `${pickLocalized(project.title, lang)} — ${t('nav.projects')}` : t('notFound.title'),
    project ? pickLocalized(project.summary, lang) : t('notFound.text')
  );

  if (!project) {
    return <NotFoundPage />;
  }

  const title = pickLocalized(project.title, lang);
  const summary = pickLocalized(project.summary, lang);
  const achievements = Array.isArray(project.achievements?.[lang])
    ? project.achievements[lang]
    : project.achievements?.en || [];

  const images = getProjectImages(project.slug);
  const links = project.links || {};
  const linkEntries = Object.entries(links).filter(([, url]) => Boolean(url));

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <PageTransition>
      <article className="container-page py-12 sm:py-16">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t('projects.backToProjects')}
        </Link>

        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">{summary}</p>
        </header>

        <div className="mt-10">
          <ProjectGallery images={images} title={title} />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr,1fr]">
          <div>
            <SectionTitle title={t('projects.keyContributions')} />
            <ul className="space-y-3">
              {achievements.map((text, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm leading-relaxed text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400"
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                {t('projects.techStack')}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            </div>

            {linkEntries.length > 0 && (
              <div>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                  {t('projects.links')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {linkEntries.map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      title={`${name} — ${t('projects.openInNewTab')}`}
                    >
                      {name.toLowerCase().includes('github') ? (
                        <Github size={18} aria-hidden="true" />
                      ) : (
                        <ExternalLink size={18} aria-hidden="true" />
                      )}
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* ────────── Prev / Next navigation ────────── */}
        <nav className="mt-16 grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-slate-700 hover:bg-slate-900/70"
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <ArrowLeft size={14} aria-hidden="true" />
              {t('projects.prev')}
            </span>
            <p className="mt-2 text-sm font-medium text-slate-200 group-hover:text-white">
              {pickLocalized(prev.title, lang)}
            </p>
          </Link>

          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-right transition hover:border-slate-700 hover:bg-slate-900/70"
          >
            <span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t('projects.next')}
              <ArrowRight size={14} aria-hidden="true" />
            </span>
            <p className="mt-2 text-sm font-medium text-slate-200 group-hover:text-white">
              {pickLocalized(next.title, lang)}
            </p>
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
}