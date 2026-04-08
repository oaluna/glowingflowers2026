import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flower2, Calendar, Gift } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Choose",
    description: "Browse bouquets, builds, and gifting add‑ons.",
    icon: Flower2,
  },
  {
    number: "02",
    title: "Schedule",
    description: "Same‑day delivery in Hanoi until 3pm.",
    icon: Calendar,
  },
  {
    number: "03",
    title: "Surprise",
    description: "Hand-delivered with a handwritten note.",
    icon: Gift,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;

    if (!section || !headline || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { y: 20, opacity: 0 },
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

      const cardElements = cards.querySelectorAll(".step-card");
      gsap.fromTo(
        cardElements,
        { y: "10vh", rotation: -2, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
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
      id="how-it-works"
      className="relative w-full py-20 lg:py-32 bg-blush-200"
    >
      <div className="section-padding">
        <h2
          ref={headlineRef}
          className="font-serif text-4xl lg:text-[clamp(34px,4.2vw,56px)] text-espresso leading-tight text-center mb-12 lg:mb-16"
        >
          How delivery works
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="step-card group bg-blush-100 rounded-pill p-8 lg:p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-coral/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-coral" />
                </div>
                <span className="font-serif text-5xl lg:text-6xl text-coral/30 mb-4 block">
                  {step.number}
                </span>
                <h3 className="font-serif text-2xl text-espresso mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-taupe leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
