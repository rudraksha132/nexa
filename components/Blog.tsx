"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const rows = sectionRef.current.querySelectorAll('.blog-row');
    
    gsap.set(rows, { opacity: 0, y: 40 });
    
    const st = gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="blog" className="blog-section" ref={sectionRef}>
      <div className="section-header" style={{ textAlign: "left", padding: "0 8vw", marginBottom: 40 }}>
        <AnimatedHeading 
          className="section-title" 
          text="Editorial & Insights" 
          elementType="h2" 
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }} 
        />
      </div>

      <div className="blog-list">
        <a href="#" className="blog-row">
          <div className="blog-row-meta">
            <span className="blog-meta-date">JAN 15, 2026</span>
            <span className="blog-meta-category">ENGINEERING</span>
          </div>
          <div className="blog-row-title">The Future of Web Development in 2026: Shift to Edge Compute</div>
        </a>

        <a href="#" className="blog-row">
          <div className="blog-row-meta">
            <span className="blog-meta-date">JAN 12, 2026</span>
            <span className="blog-meta-category">INFRASTRUCTURE</span>
          </div>
          <div className="blog-row-title">Cloud Migration: Why Monoliths Are Making a Calculated Return</div>
        </a>

        <a href="#" className="blog-row">
          <div className="blog-row-meta">
            <span className="blog-meta-date">JAN 10, 2026</span>
            <span className="blog-meta-category">ARTIFICIAL INTELLIGENCE</span>
          </div>
          <div className="blog-row-title">Applied AI in Business: Escaping the Demo Phase</div>
        </a>
      </div>
    </section>
  );
}
