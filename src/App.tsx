import { MotionConfig } from 'framer-motion';
import Cafe from './components/Cafe';
import Experience from './components/Experience';
import FindUs from './components/FindUs';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import OneMoreFrame from './components/OneMoreFrame';
import Reviews from './components/Reviews';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <a href="#main" className="sr-only z-[70] rounded-md bg-ivory px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Experience />
          <OneMoreFrame />
          <Cafe />
          <Reviews />
          <FindUs />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
