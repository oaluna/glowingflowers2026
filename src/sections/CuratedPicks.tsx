import { useState, useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { AppContext } from "@/AppContext";
import { ref, get } from "firebase/database";
import { rtdb } from "@/firebase";

import type {Product} from "@/types"

gsap.registerPlugin(ScrollTrigger);

export default function CuratedPicks() {
  const context = useContext(AppContext);
  const [curatedProducts, setCuratedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  if (!context) throw new Error("Catalog must be used within an AppProvider");
  const { addToCart } = context;

  useEffect(() => {
    const fetchCuratedProducts = async () => {
      try {
        const productsRef = ref(rtdb, "products");
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const productsList = Object.keys(data).slice(0, 3).map((key) => ({
            id: key,
            ...data[key],
          })) as Product[];

          setCuratedProducts(productsList);
        } else {
          console.log("No arrangements found in database.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuratedProducts();
  }, []);

  useEffect(() => {
    if (loading || curatedProducts.length === 0) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { x: "-6vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
            end: "top 55%",
            scrub: 0.5,
          },
        }
      );

      // Cards animation with stagger
      const cardElements = cards.querySelectorAll(".product-card");
      gsap.fromTo(
        cardElements,
        { y: "10vh", scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 75%",
            end: "top 45%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [loading, curatedProducts.length]);


  if (loading) {
    return (
      <div className="text-center mt-20 text-brandEarth/60 italic">
        Loading beautiful arrangements...
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="curated-picks"
      className="relative w-full py-20 lg:py-32 bg-blush-100"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16 max-w-md">
          <span className="eyebrow mb-4 block">Curated Picks</span>
          <h2 className="font-serif text-4xl lg:text-[clamp(34px,4.2vw,56px)] text-espresso leading-tight mb-4">
            This week&apos;s freshest stems
          </h2>
          <p className="font-sans text-taupe leading-relaxed">
            Hand-selected each morning from local growers. Limited quantities.
          </p>
        </div>

        {/* Product Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {curatedProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="pill-outline aspect-[3/4] mb-6 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lift group-hover:border-coral/30">
                <img
                src={product.imgUrl}
                alt={product.name}
              />
                {/* Quick Add Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="quick-add absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-espresso px-6 py-3 rounded-full font-sans text-sm font-medium flex items-center gap-2 shadow-card hover:bg-coral hover:text-white transition-colors duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Quick Add
                </button>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-espresso mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-taupe mb-2">
                {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}