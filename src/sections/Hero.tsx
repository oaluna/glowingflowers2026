import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/logo.png";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const centerPillRef = useRef<HTMLDivElement>(null);
  const leftPillRef = useRef<HTMLDivElement>(null);
  const rightPillRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const centerPill = centerPillRef.current;
    const leftPill = leftPillRef.current;
    const rightPill = rightPillRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;

    if (!section || !centerPill || !leftPill || !rightPill || !headline || !cta)
      return;

    const ctx = gsap.context(() => {
      // Entrance animation (auto-play on load)
      const entranceTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      entranceTl
        .fromTo(
          centerPill,
          { opacity: 0, scale: 0.92, y: "6vh" },
          { opacity: 0.65, scale: 4, y: 0, duration: 1.2 }
        )
        .fromTo(
          leftPill,
          { opacity: 0, x: "-12vw" },
          { opacity: 1, x: 0, duration: 1 },
          0.2
        )
        .fromTo(
          rightPill,
          { opacity: 0, x: "12vw" },
          { opacity: 1, x: 0, duration: 1 },
          0.2
        )
        .fromTo(
          headline,
          { opacity: 0, y: "-2vh" },
          { opacity: 1, y: 0, duration: 0.8 },
          0.4
        )
        .fromTo(
          cta,
          { opacity: 0, y: "2vh" },
          { opacity: 1, y: 0, duration: 0.8 },
          0.6
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([centerPill, leftPill, rightPill, headline, cta], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          centerPill,
          { y: 0, scale: 4, opacity: 0.65 },
          { y: "-18vh", scale: 1, ease: "power2.in" },
          0.7
        )
        .fromTo(centerPill, { opacity: 0.65 }, { opacity: 0 }, 0.7)
        .fromTo(
          leftPill,
          { x: 0, rotation: 0, opacity: 1 },
          { x: "-28vw", rotation: -6, opacity: 0, ease: "power2.in" },
          0.7
        )
        .fromTo(
          rightPill,
          { x: 0, rotation: 0, opacity: 1 },
          { x: "28vw", rotation: 6, opacity: 0, ease: "power2.in" },
          0.7
        )
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: "-10vh", opacity: 0, ease: "power2.in" },
          0.7
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: "-10vh", opacity: 0, ease: "power2.in" },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-blush-100"
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(43,31,27,0.03)_100%)]" />

      {/* Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Floating Pill */}
        <div
          ref={leftPillRef}
          className="absolute left-[6vw] lg:left-[12vw] top-1/2 -translate-y-1/2 w-[24vw] lg:w-[22vw] h-[56vh] lg:h-[72vh] z-10"
        >
          <div className="pill-image w-full h-full shadow-pill">
            <img
              src="/images/hero_left_stems.jpg"
              alt="Tall stems arrangement"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center Hero Pill */}
        <div
          ref={centerPillRef}
          className="absolute left-1/2 top-[52vh] -translate-x-1/2 -translate-y-1/2 w-[60vw] lg:w-[34vw] h-[55vh] lg:h-[78vh] z-0"
        >
          <div className="pill-image w-full h-full shadow-pill">
            <img
              src="https://images.pexels.com/photos/21928747/pexels-photo-21928747.jpeg"
              alt="Beautiful bouquet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Floating Pill */}
        <div
          ref={rightPillRef}
          className="absolute right-[6vw] lg:right-[12vw] top-1/2 -translate-y-1/2 w-[24vw] lg:w-[22vw] h-[56vh] lg:h-[72vh] z-10"
        >
          <div className="pill-image w-full h-full shadow-pill">
            <img
              src="/images/hero_right_detail.jpg"
              alt="Flower detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div
          ref={headlineRef}
          className="absolute top-[12vh] lg:top-[14vh] left-1/2 -translate-x-1/2 text-center z-30 w-[90vw] lg:min-w-[52vw] lg:max-w-[720px] px-4"
        >
          <img
            src={logo}
            className="w-72 h-auto mx-auto lg:w-full lg:p-12 lg:h-auto object-contain mb-4 lg:mb-6 bg-transparent"
          />
          <p className="font-sans font-black text-base lg:text-4xl text-taupe-300 max-w-md mx-auto leading-relaxed">
            Fresh, seasonal blooms delivered in Hanoi—arranged like a love
            letter.
          </p>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute bottom-[8vh] lg:bottom-[10vh] left-1/2 -translate-x-1/2 z-30"
        >
          <a href="#curated-picks" className="btn-primary inline-block">
            Explore the Collection
          </a>
        </div>
      </div>
    </section>
  );
}
