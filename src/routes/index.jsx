import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Programs from '../pages/Programs';
import ProgramDetail from '../pages/Programs/ProgramDetail';
import Stories from '../pages/Programs/Stories';
import Events from '../pages/Events';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/Blog/BlogDetail';
import Gallery from '../pages/Gallery';
import Donate from '../pages/Donate';
import Volunteer from '../pages/Volunteer';
import Contact from '../pages/Contact';
import FAQ from '../pages/Contact/FAQ';
import Impact from '../pages/Impact';
import AnnualReports from '../pages/AnnualReports';
import CSR from '../pages/CSR';
import Careers from '../pages/Careers';
import Transparency from '../pages/Transparency';
import Media from '../pages/Media';
import Team from '../pages/Team';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/:slug" element={<ProgramDetail />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/events" element={<Events />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/annual-reports" element={<AnnualReports />} />
      <Route path="/csr" element={<CSR />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/transparency" element={<Transparency />} />
      <Route path="/media" element={<Media />} />
    </Routes>
  );
}
