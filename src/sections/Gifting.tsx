import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, PenLine, Cookie, Wine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const addOns = [
  {
    id: "note",
    name: "Handwritten note",
    price: 0,
    icon: PenLine,
  },
  {
    id: "vase",
    name: "Matte ceramic vase",
    price: 12,
    icon: Wine,
  },
  {
    id: "macaron",
    name: "Macaron box (4 pcs)",
    price: 15,
    icon: Cookie,
  },
];

export default function Gifting() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const images = imagesRef.current;
    const content = contentRef.current;

    if (!section || !images || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        images,
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
        content,
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

      const addOnItems = content.querySelectorAll(".addon-item");
      gsap.fromTo(
        addOnItems,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 70%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gifting"
      className="relative w-full py-20 lg:py-32 bg-blush-100"
    >
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div ref={imagesRef} className="space-y-6">
            <div className="pill-image aspect-video w-full shadow-pill">
              <img
                src="/images/gifting_vase.jpg"
                alt="Ceramic vase"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pill-image aspect-video w-full shadow-pill">
              <img
                src="/images/gifting_macaron.jpg"
                alt="Macaron box"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:pl-8">
            <h2 className="font-serif text-4xl lg:text-[clamp(34px,4.2vw,56px)] text-espresso leading-tight mb-4">
              Make it personal
            </h2>
            <p className="font-sans text-taupe leading-relaxed mb-8">
              Add a handwritten note, a vase, or a small treat. We&apos;ll wrap
              it like a gift.
            </p>

            {/* Add-ons List */}
            <div className="space-y-4 mb-8">
              {addOns.map((addon) => {
                const Icon = addon.icon;
                return (
                  <div
                    key={addon.id}
                    className="addon-item flex items-center justify-between p-4 bg-white rounded-2xl border border-espresso/5 hover:border-coral/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-coral" />
                      </div>
                      <span className="font-sans text-espresso">
                        {addon.name}
                      </span>
                    </div>
                    <span className="font-sans text-xl font-black text-taupe">
                      ${addon.price}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button className="btn-primary mb-4">Add Gifting Options</button>

            <a
              href="#"
              className="block font-sans text-sm text-taupe hover:text-coral transition-colors group"
            >
              Corporate gifting
              <ChevronRight className="w-4 h-4 inline-block transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
