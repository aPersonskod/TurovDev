import { useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Reports from "./components/Reports.jsx";
import {createViewRequest} from './api/reports';

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
    const [searchParams, setSearchParams] = useSearchParams();

    const sendData = async (recommender) => {
        try {
            await createViewRequest(recommender);
        } catch (e) {
            alert(e);
        }
    };
    
    useEffect(() => {
        let userId = localStorage.getItem('unique_user_id');
        let ref = searchParams.get('ref');
        if (!userId) {
     /*       if (ref){
                alert(`Hello my new dear friend!!! From ${ref}`);
            } else {
                alert(`Hello my new dear friend!!!`);
            }*/
            // 2. Если нет, создаем новый случайный ID
            userId = crypto.randomUUID(); // встроенный метод в современных браузерах
            localStorage.setItem('unique_user_id', userId);
            
            //send to backend ref
            let fromWho = !ref ? 'empty' : ref;
            (async () => {
                await sendData(fromWho);
            })();
        }
    }, []);
    
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path={getPath('/')} element={<HomePage />} />
          <Route path={getPath('/projects')} element={<ProjectsPage />} />
          <Route path={getPath('/projects/:slug')} element={<ProjectDetailPage />} />
          <Route path={getPath('/contacts')} element={<ContactsPage />} /> 
          <Route path={getPath('/reports/attendance')} element={<Reports />} /> 
          <Route path={getPath('/*')} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}