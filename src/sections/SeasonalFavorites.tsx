import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";

gsap.registerPlugin(ScrollTrigger);

const seasonalProducts: Product[] = [
  {
    id: "sunlit-garden",
    name: "Sunlit Garden",
    price: 350000,
    image: "/images/seasonal_sunlit_garden.jpg",
    category: "seasonal",
  },
  {
    id: "blush-cloud",
    name: "Blush Cloud",
    price: 420000,
    image: "/images/seasonal_blush_cloud.jpg",
    category: "seasonal",
  },
  {
    id: "coral-charm",
    name: "Coral Charm",
    price: 380000,
    image: "/images/seasonal_coral_charm.jpg",
    category: "seasonal",
  },
  {
    id: "lemon-leaf-trio",
    name: "Lemon Leaf Trio",
    price: 260000,
    image: "/images/seasonal_lemon_leaf.jpg",
    category: "seasonal",
  },
  {
    id: "daisy-day",
    name: "Daisy Day",
    price: 220000,
    image: "/images/seasonal_daisy_day.jpg",
    category: "seasonal",
  },
  {
    id: "rose-eucalyptus",
    name: "Rose & Eucalyptus",
    price: 450000,
    image: "/images/seasonal_rose_eucalyptus.jpg",
    category: "seasonal",
  },
];

export default function SeasonalFavorites() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 60%",
            scrub: 0.5,
          },
        }
      );

      const productCards = grid.querySelectorAll(".product-card");
      gsap.fromTo(
        productCards,
        { y: "8vh", scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
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
      id="seasonal-favorites"
      className="relative w-full py-20 lg:py-32 bg-blush-100"
    >
      <div className="section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-4xl lg:text-[clamp(34px,4.2vw,56px)] text-espresso leading-tight mb-4">
            Seasonal Favorites
          </h2>
          <p className="font-sans text-taupe leading-relaxed max-w-md mx-auto">
            What Hanoi is ordering this week.
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {seasonalProducts.map((product, index) => (
            <div
              key={product.id}
              className={`product-card group ${
                index % 3 === 1 ? "lg:mt-8" : ""
              } ${index % 3 === 0 ? "lg:mt-0" : ""} ${
                index % 3 === 2 ? "lg:mt-4" : ""
              }`}
            >
              <div className="pill-outline aspect-[3/4] mb-4 relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lift group-hover:border-coral/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Quick Add Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="quick-add absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-espresso px-4 py-2 rounded-full font-sans text-xs font-medium flex items-center gap-1 shadow-card hover:bg-coral hover:text-white transition-colors duration-300"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-lg text-espresso mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-taupe">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <a href="#" className="btn-secondary inline-block">
            View All Bouquets
          </a>
        </div>
      </div>
    </section>
  );
}
