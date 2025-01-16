import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Testimonials from './pages/Testimonials';
import Footer from './pages/Footer';
import { ROUTES } from './utils/constants';

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.TESTIMONIALS} element={<Testimonials />} />
          <Route path={ROUTES.CONTACT} element={<Footer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 