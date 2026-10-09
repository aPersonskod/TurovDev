import { useEffect } from 'react';

/**
 * Updates document.title and <meta name="description"> when the
 * given title/description change (e.g. on route or language change).
 */
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    if (typeof title === 'string' && title.length > 0) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    if (typeof description !== 'string') return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, [description]);
}