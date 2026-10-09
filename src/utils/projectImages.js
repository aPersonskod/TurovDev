/**
 * Resolves images that live under `src/assets/projects/<slug>/`.
 * All files with a supported extension are picked up automatically
 * by Vite and sorted alphabetically (01, 02, 03, ...).
 */

const modules = import.meta.glob(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,avif,svg}',
  { eager: true, import: 'default' }
);

export function getProjectImages(slug) {
  if (!slug) return [];
  return Object.entries(modules)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
}

export function getProjectCover(slug) {
  const all = getProjectImages(slug);
  return all.length > 0 ? all[0] : null;
}