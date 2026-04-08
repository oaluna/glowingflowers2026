import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { BouquetSize, BouquetPalette } from "../types";

gsap.registerPlugin(ScrollTrigger);

const sizes: { id: BouquetSize; name: string; price: number }[] = [
  { id: "small", name: "Small", price: 320000 },
  { id: "medium", name: "Medium", price: 480000 },
  { id: "large", name: "Large", price: 650000 },
];

const palettes: { id: BouquetPalette; name: string; color: string }[] = [
  { id: "blush", name: "Blush", color: "#F0A5A9" },
  { id: "peach", name: "Peach", color: "#F5C4A1" },
  { id: "cream", name: "Cream", color: "#F5F0E8" },
  {
    id: "mixed",
    name: "Mixed",
    color: "linear-gradient(135deg, #F0A5A9 0%, #F5C4A1 50%, #F5F0E8 100%)",
  },
];

export default function BuildBouquet() {
  const [selectedSize, setSelectedSize] = useState<BouquetSize>("small");
  const [selectedPalette, setSelectedPalette] =
    useState<BouquetPalette>("blush");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const currentPrice =
    sizes.find((s) => s.id === selectedSize)?.price || 320000;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const controls = controlsRef.current;

    if (!section || !image || !controls) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { x: "-10vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        controls,
        { x: "10vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 48%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    const sizeName = sizes.find((s) => s.id === selectedSize)?.name;
    const paletteName = palettes.find((p) => p.id === selectedPalette)?.name;

    addToCart({
      id: `bouquet-${selectedSize}-${selectedPalette}`,
      name: `Custom Bouquet (${sizeName}, ${paletteName})`,
      price: currentPrice,
      image: "/images/builder_palette_blush.jpg",
      category: "custom",
    });
  };

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
      id="build-bouquet"
      className="relative w-full py-20 lg:py-32 bg-blush-100"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="order-2 lg:order-1">
            <div className="pill-image aspect-[4/5] lg:aspect-[4/5] w-full max-w-lg mx-auto shadow-pill">
              <img
                src="/images/builder_palette_blush.jpg"
                alt="Blush bouquet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Controls */}
          <div ref={controlsRef} className="order-1 lg:order-2 lg:pl-8">
            <span className="eyebrow mb-4 block">Build Your Bouquet</span>
            <h2 className="font-serif text-4xl lg:text-[clamp(34px,4.2vw,56px)] text-espresso leading-tight mb-4">
              Design a bouquet in 30 seconds
            </h2>
            <p className="font-sans text-taupe leading-relaxed mb-8">
              Pick a size and a palette. We&apos;ll handle the stems, the wrap,
              and the ribbon.
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="font-sans text-sm font-medium text-espresso mb-3 block">
                Size
              </label>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-6 py-3 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                      selectedSize === size.id
                        ? "bg-coral text-white shadow-md"
                        : "bg-white text-espresso border border-espresso/10 hover:border-coral/50"
                    } active:scale-[0.98]`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Selection */}
            <div className="mb-8">
              <label className="font-sans text-sm font-medium text-espresso mb-3 block">
                Palette
              </label>
              <div className="flex flex-wrap gap-3">
                {palettes.map((palette) => (
                  <button
                    key={palette.id}
                    onClick={() => setSelectedPalette(palette.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                      selectedPalette === palette.id
                        ? "bg-white text-espresso shadow-md ring-2 ring-coral"
                        : "bg-white text-espresso border border-espresso/10 hover:border-coral/50"
                    } active:scale-[0.98]`}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: palette.color,
                        border:
                          palette.id === "cream"
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                      }}
                    />
                    {palette.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div>
                <span className="font-sans text-sm text-taupe">From</span>
                <p className="font-serif text-2xl text-espresso">
                  {formatPrice(currentPrice)}
                </p>
              </div>
              <button onClick={handleAddToCart} className="btn-primary">
                Add to Cart
              </button>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-1 font-sans text-sm text-taupe hover:text-coral transition-colors mt-6 group"
            >
              See what&apos;s included
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
