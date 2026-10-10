import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { getPath } from '../App';

export default function NotFoundPage() {
  const { t } = useTranslation();
  useDocumentMeta(t('notFound.title'), t('notFound.text'));

  return (
    <PageTransition>
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-7xl font-black text-indigo-500/30 sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">{t('notFound.title')}</h1>
        <p className="mt-2 max-w-md text-sm text-slate-400">{t('notFound.text')}</p>
        <Link to={`${getPath('/')}`} className="btn-primary mt-8">
          {t('notFound.back')}
        </Link>
      </div>
    </PageTransition>
  );
}