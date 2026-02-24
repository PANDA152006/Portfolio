import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalCanvas from './components/GlobalCanvas';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Playground from './pages/Playground';
import TypographyAssignment from './pages/TypographyAssignment';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/typography-assignment" element={<TypographyAssignment />} />
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    <Router>
      <GlobalCanvas />
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
