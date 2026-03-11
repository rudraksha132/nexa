"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      text: "Nexa delivered a digital infrastructure that fundamentally shifted our internal routing speed. An essential upgrade.",
      author: "SARAH JENKINS — CTO, VELOCITY RETAIL",
    },
    {
      text: "The web performance optimization allowed us to increase core conversion by 28% within the first month of deployment.",
      author: "DAVID CHEN — DIRECTOR OF GROWTH, OPTIMAL",
    },
    {
      text: "Their systematic approach to architectural design and their absolute clarity in communication is unmatched in NOIDA.",
      author: "PRIYA SHARMA — FOUNDER, ZENITH LOGISTICS",
    },
    {
      text: "Autonomous workflows built by Nexa saved our operations team roughly 40 hours a week in manual data entry alone.",
      author: "MARCUS WEBB — COO, HORIZON FINANCE",
    },
    {
      text: "Beautiful execution of a complex headless architecture. They understand both aesthetic nuance and engineering depth.",
      author: "ELENA ROSTOVA — HEAD OF PRODUCT, AURA INC",
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !trackRef.current) return;
    
    const track = trackRef.current;
    
    // We calculate how far the track needs to slide.
    // We want the last card to be visible at the end of scroll.
    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 80); // 80px buffer
    };

    const st = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: 1.2, // cinematic lag on scrub
        invalidateOnRefresh: true, // Recalculate if window resizes
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="testimonials-section" style={{ background: "var(--bg)" }}>
      <div className="section-header" style={{ alignItems: "flex-start", textAlign: "left" }}>
        <div className="section-tag" style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>Client Proof</div>
        <AnimatedHeading 
          className="section-title" 
          text="Market Validation" 
          elementType="h2" 
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }} 
        />
      </div>
      
      <div className="marquee-container">
        <div className="marquee-track" ref={trackRef}>
          {testimonials.map((t, idx) => (
            <div className="testimonial-card-editorial" key={idx}>
              <div className="testimonial-editorial-text">
                &quot;{t.text}&quot;
              </div>
              <div className="testimonial-editorial-author">
                {t.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
