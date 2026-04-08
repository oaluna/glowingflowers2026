import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CartProvider } from "./context/CartContext";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import CuratedPicks from "./sections/CuratedPicks";
import BuildBouquet from "./sections/BuildBouquet";
import HowItWorks from "./sections/HowItWorks";
import CollectionSpotlight from "./sections/CollectionSpotlight";
import SeasonalFavorites from "./sections/SeasonalFavorites";
import Gifting from "./sections/Gifting";
import Footer from "./sections/Footer";
import CartPanel from "./sections/CartPanel";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Setup global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st: ScrollTrigger) => st.vars.pin)
        .sort((a: ScrollTrigger, b: ScrollTrigger) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges: PinnedRange[] = pinned.map((st: ScrollTrigger) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r: PinnedRange) =>
                value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest: number, r: PinnedRange) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out",
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st: ScrollTrigger) => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-blush-100">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <CuratedPicks />
          <BuildBouquet />
          <HowItWorks />
          <CollectionSpotlight />
          <SeasonalFavorites />
          <Gifting />
          <Footer />
        </main>

        {/* Cart Panel */}
        <CartPanel />
      </div>
    </CartProvider>
  );
}

export default App;
