import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

gsap.registerPlugin(ScrollTrigger);

const curatedProducts: Product[] = [
  {
    id: "pink-peony-bunch",
    name: "Pink Peony Bunch",
    price: 280000,
    image: "/images/product_pink_peony.jpg",
    category: "curated",
    description: "Hand-selected each morning",
  },
  {
    id: "pastel-tulip-set",
    name: "Pastel Tulip Set",
    price: 195000,
    image: "/images/product_pastel_tulip.jpg",
    category: "curated",
    description: "Soft spring colors",
  },
  {
    id: "white-ranunculus",
    name: "White Ranunculus",
    price: 240000,
    image: "/images/product_white_ranunculus.jpg",
    category: "curated",
    description: "Delicate and romantic",
  },
];

export default function CuratedPicks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
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
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  From {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
