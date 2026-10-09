import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TechBadge from './TechBadge';
import PlaceholderGradient from './PlaceholderGradient';
import { getProjectCover } from '../utils/projectImages';
import { pickLocalized } from '../utils/localize';

const MAX_VISIBLE_TECH = 5;

export default function ProjectCard({ project }) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const title = pickLocalized(project.title, lang);
  const summary = pickLocalized(project.summary, lang);
  const cover = getProjectCover(project.slug);

  const visible = project.stack.slice(0, MAX_VISIBLE_TECH);
  const extra = project.stack.length - MAX_VISIBLE_TECH;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-2xl hover:shadow-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
        {cover ? (
          <img
            src={cover}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderGradient label={title} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold leading-snug text-white transition group-hover:text-indigo-300">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">{summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {visible.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
          {extra > 0 && <TechBadge>+{extra}</TechBadge>}
        </div>
      </div>
    </Link>
  );
}