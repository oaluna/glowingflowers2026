import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Instagram,
  Mail,
  MapPin,
  BookOpen,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { name: "Delivery Areas", href: "#", icon: MapPin },
  { name: "Care Guide", href: "#", icon: BookOpen },
  { name: "Wholesale", href: "#", icon: Briefcase },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Contact", href: "#", icon: Mail },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pill = pillRef.current;
    const form = formRef.current;

    if (!section || !pill || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pill,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 60%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        form,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 55%",
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-blush-100"
    >
      <div className="section-padding">
        {/* Large Closing Pill */}
        <div ref={pillRef} className="relative w-full max-w-6xl mx-auto mb-16">
          <div className="pill-image aspect-[21/9] w-full shadow-pill overflow-hidden">
            <img
              src="/images/closing_bouquet_hand.jpg"
              alt="Hands holding bouquet"
              className="w-full h-full object-cover"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-espresso/30 via-transparent to-transparent">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white text-center px-4 drop-shadow-lg">
                Send flowers like you mean it.
              </h2>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div ref={formRef} className="max-w-md mx-auto text-center mb-16">
          <p className="font-sans text-taupe mb-4">
            Get weekly stems & styling tips
          </p>
          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 text-coral">
              <span className="font-sans text-sm">
                Thank you for subscribing!
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-5 py-3 rounded-full bg-white border border-espresso/10 font-sans text-sm text-espresso placeholder:text-taupe/50 focus:outline-none focus:border-coral/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-coral text-white rounded-full font-sans text-sm font-medium hover:bg-coral-dark transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-12">
          {footerLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 font-sans text-sm text-taupe hover:text-coral transition-colors"
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-serif text-2xl text-espresso mb-2">
            Glowing Flowers
          </p>
          <p className="font-sans text-xs text-taupe">
            © 2026 Glowing Flowers. Fresh blooms delivered in Hanoi.
          </p>
        </div>
      </div>
    </footer>
  );
}
