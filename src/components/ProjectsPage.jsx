import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageTransition from '../components/PageTransition';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { projects } from '../data/projects';

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-full border px-3 py-1.5 text-xs font-medium transition',
        active
          ? 'border-indigo-500 bg-indigo-500 text-white'
          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-600 hover:text-white',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default function ProjectsPage() {
  const { t } = useTranslation();
  useDocumentMeta(t('meta.projects.title'), t('meta.projects.description'));

  const [filter, setFilter] = useState('all');

  const allTech = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.stack.forEach((tech) => set.add(tech)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.stack.includes(filter))),
    [filter]
  );

  return (
    <PageTransition>
      <div className="container-page py-16 sm:py-20">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.intro')} />

        <div
          role="group"
          aria-label={t('projects.filterLabel')}
          className="mb-8 flex flex-wrap gap-2"
        >
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('projects.filterAll')}
          </FilterChip>
          {allTech.map((tech) => (
            <FilterChip key={tech} active={filter === tech} onClick={() => setFilter(tech)}>
              {tech}
            </FilterChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-sm text-slate-400">
            {t('projects.empty')}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}