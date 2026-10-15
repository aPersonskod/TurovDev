import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const HomePage = lazy(() => import('./components/HomePage.jsx'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage.jsx'));
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage.jsx'));
const ContactsPage = lazy(() => import('./components/ContactsPage.jsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage.jsx'));
export function getPath(route){
  return `${route}`; // /TurovDev
}

function RouteFallback() {
  return (
    <div className="container-page py-24 text-center text-sm text-slate-500">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path={getPath('/')} element={<HomePage />} />
          <Route path={getPath('/projects')} element={<ProjectsPage />} />
          <Route path={getPath('/projects/:slug')} element={<ProjectDetailPage />} />
          <Route path={getPath('/contacts')} element={<ContactsPage />} /> 
          <Route path={getPath('/*')} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}