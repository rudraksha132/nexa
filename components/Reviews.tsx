"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const stats = sectionRef.current.querySelectorAll('.stat-box');
    const cards = sectionRef.current.querySelectorAll('.review-card');
    
    gsap.set(stats, { opacity: 0, y: 20 });
    gsap.set(cards, { opacity: 0, y: 30 });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.to(stats, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }).to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="reviews-section" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag" style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>Proven Results</div>
        <AnimatedHeading 
          className="section-title" 
          text="Trusted by Industry Leaders" 
          elementType="h2" 
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }} 
        />
        <p className="section-subtitle" style={{ color: "var(--dark-soft)" }}>Our track record speaks for itself</p>
      </div>

      <div className="reviews-stats">
        <div className="stat-box">
          <div className="stat-number">500+</div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">98%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">150+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support Available</div>
        </div>
      </div>

      <div className="reviews-slider">
        <div className="reviews-track">
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;Best IT consulting firm we&apos;ve worked with. Their cloud solutions reduced our operational costs significantly.&quot;</div>
            <div className="review-author">— David Chen, VP Operations</div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;Exceptional service and support. The AI implementation has revolutionized our customer service department.&quot;</div>
            <div className="review-author">— Lisa Thompson, Director</div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;Professional, efficient, and innovative. They delivered exactly what we needed, on time and within budget.&quot;</div>
            <div className="review-author">— Robert Johnson, CEO</div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;Outstanding cybersecurity solutions. We feel confident knowing our data is protected by Nexa&apos;s expertise.&quot;</div>
            <div className="review-author">— Amanda White, CISO</div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;The mobile app they developed has over 100k downloads and growing. Incredible work from start to finish.&quot;</div>
            <div className="review-author">— James Park, Founder</div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <div className="review-text">&quot;Nexa&apos;s team goes above and beyond. Their dedication to client success is unmatched in the industry.&quot;</div>
            <div className="review-author">— Emma Davis, Marketing Lead</div>
          </div>
        </div>
      </div>
    </div>
  );
}
