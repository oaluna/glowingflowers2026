import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPillRef = useRef<HTMLDivElement>(null);
  const rightTopPillRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftPill = leftPillRef.current;
    const rightTopPill = rightTopPillRef.current;
    const textCard = textCardRef.current;
    const textContent = textContentRef.current;

    if (!section || !leftPill || !rightTopPill || !textCard || !textContent)
      return;

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
        .fromTo(
          leftPill,
          { x: "-60vw", opacity: 0 },
          { x: 0, opacity: 1, ease: "none" },
          0
        )
        .fromTo(
          rightTopPill,
          { x: "60vw", opacity: 0 },
          { x: 0, opacity: 1, ease: "none" },
          0
        )
        .fromTo(
          textCard,
          { y: "40vh", opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.1
        )
        .fromTo(
          textContent.children,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: "none" },
          0.15
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftPill,
          { x: 0, opacity: 1 },
          { x: "-18vw", opacity: 0, ease: "power2.in" },
          0.7
        )
        .fromTo(
          rightTopPill,
          { x: 0, opacity: 1 },
          { x: "18vw", opacity: 0, ease: "power2.in" },
          0.7
        )
        .fromTo(
          textCard,
          { y: 0, opacity: 1 },
          { y: "18vh", opacity: 0, ease: "power2.in" },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

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
            <div className="pill-image w-full h-full shadow-pill">
              <img
                src="/images/spotlight_left_peony.jpg"
                alt="Peony arrangement"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-8 h-auto lg:h-[80vh]">
            {/* Right Top Pill */}
            <div ref={rightTopPillRef} className="h-[30vh] lg:h-[38vh]">
              <div className="pill-image w-full h-full shadow-pill">
                <img
                  src="/images/spotlight_right_top_peony.jpg"
                  alt="Peony close-up"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Card */}
            <div
              ref={textCardRef}
              className="flex-1 min-h-[250px] lg:min-h-0 bg-blush-100 border-2 border-espresso/10 rounded-3xl p-8 lg:p-12 flex items-center"
            >
              <div ref={textContentRef} className="max-w-lg">
                <span className="eyebrow mb-4 block">Collection Spotlight</span>
                <h2 className="font-serif text-3xl lg:text-4xl text-espresso leading-tight mb-4">
                  The Peony Season Edit
                </h2>
                <p className="font-sans text-taupe leading-relaxed mb-6">
                  Soft, ruffled, and romantic—our peony arrangements are
                  designed to open beautifully at home.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#seasonal-favorites" className="btn-primary">
                    Shop the Edit
                  </a>
                  <a
                    href="#"
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
