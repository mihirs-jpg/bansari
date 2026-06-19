import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StickyDonate from './components/common/StickyDonate';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes';
import './assets/styles/global.css';
import './assets/styles/animations.css';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <AppRoutes />
      </main>
      <Footer />
      <StickyDonate />
    </BrowserRouter>
  );
}
