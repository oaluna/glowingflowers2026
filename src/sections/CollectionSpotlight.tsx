import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

// 1. Import your CartContext and Firebase database config
import { useCart } from "@/context/CartContext";
import { ref, get } from "firebase/database";
import { rtdb } from "@/firebase";

import type { Product } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionSpotlight() {
  // GSAP Refs
  const sectionRef = useRef<HTMLElement>(null);
  const leftPillRef = useRef<HTMLDivElement>(null);
  const rightTopPillRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // State & Context
  const { addToCart } = useCart();
  const [arrangements, setArrangements] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the products from Firebase Realtime Database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(rtdb, 'products');
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const productsList = Object.keys(data).map(key => ({
            id: key, 
            ...data[key]
          })) as Product[];
          
          setArrangements(productsList);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. Setup GSAP Animations (Dependent on 'loading' state)
  useEffect(() => {
    // If we are still loading, do not try to animate (the elements don't exist yet)
    if (loading || arrangements.length < 2) return;

    const section = sectionRef.current;
    const leftPill = leftPillRef.current;
    const rightTopPill = rightTopPillRef.current;
    const textCard = textCardRef.current;
    const textContent = textContentRef.current;

    if (!section || !leftPill || !rightTopPill || !textCard || !textContent) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(leftPill, { x: "-60vw", opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(rightTopPill, { x: "60vw", opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0)
        .fromTo(textCard, { y: "40vh", opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.1)
        .fromTo(textContent.children, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: "none" }, 0.15);

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftPill, { x: 0, opacity: 1 }, { x: "-18vw", opacity: 0, ease: "power2.in" }, 0.7)
        .fromTo(rightTopPill, { x: 0, opacity: 1 }, { x: "18vw", opacity: 0, ease: "power2.in" }, 0.7)
        .fromTo(textCard, { y: 0, opacity: 1 }, { y: "18vh", opacity: 0, ease: "power2.in" }, 0.7);
    }, section);

    return () => ctx.revert();
  }, [loading, arrangements.length]); 

  // 4. Handle Loading and Empty States gracefully
  if (loading) {
    return <div className="h-screen flex items-center justify-center text-brandEarth/60 italic">Loading spotlight...</div>;
  }

  if (arrangements.length < 2) {
    return null; // Safety check: Hide section if there aren't enough products
  }

  // 5. Replace hardcoded images with dynamic Firebase data
  return (
    <section
      ref={sectionRef}
      id="collection-spotlight"
      className="relative w-full h-screen overflow-hidden bg-blush-100"
    >
      <div className="relative w-full h-full section-padding py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full items-center">
          
          {/* Left Tall Pill */}
          <div ref={leftPillRef} className="lg:col-span-4 h-[40vh] lg:h-[80vh]">
            <div className="pill-image w-full h-full shadow-pill overflow-hidden rounded-[100px]">
              <img
                src={arrangements[0].imgUrl}
                alt={arrangements[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-sans text-sm mt-4 text-espresso font-medium z-10">{arrangements[0].name}</p> 
          </div>

          {/* Right Side */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 h-auto lg:h-[80vh]">
            
            {/* Right Top Pill */}
            <div ref={rightTopPillRef} className="h-[30vh] lg:h-[38vh]">
              <div className="pill-image w-full h-full shadow-pill overflow-hidden rounded-[100px]">
                <img
                  src={arrangements[1].imgUrl}
                  alt={arrangements[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-sans text-sm mt-4 text-espresso font-medium z-10">{arrangements[1].name}</p> 
            </div>

            {/* Text Card */}
            <div
              ref={textCardRef}
              className="flex-1 min-h-[250px] lg:min-h-0 bg-blush-100 border-2 border-espresso/10 rounded-3xl p-8 lg:p-12 flex items-center"
            >
              <div ref={textContentRef} className="max-w-lg">
                <span className="eyebrow mb-4 block text-coral font-bold uppercase tracking-widest text-xs">Collection Spotlight</span>
                <h2 className="font-serif text-3xl lg:text-4xl text-espresso leading-tight mb-4">
                  The Peony Season Edit
                </h2>
                <p className="font-sans text-taupe leading-relaxed mb-6">
                  Soft, ruffled, and romantic—our peony arrangements are
                  designed to open beautifully at home.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Changed standard link to an actionable Add to Cart for the featured item */}
                  <button onClick={() => addToCart(arrangements[0])} className="btn-primary bg-espresso text-white px-6 py-2 rounded-full hover:bg-coral transition-colors">
                    Shop the Edit
                  </button>
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-1 font-sans text-sm text-taupe hover:text-coral transition-colors group"
                  >
                    View lookbook
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}