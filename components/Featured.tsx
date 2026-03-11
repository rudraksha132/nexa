"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Featured() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const logos = sectionRef.current.querySelectorAll(".featured-logo");

    gsap.set(logos, { opacity: 0, y: 30 });

    const st = gsap.to(logos, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div className="featured-section" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag">Recognition</div>
        <h2 className="section-title">Featured On Leading Platforms</h2>
        <p className="section-subtitle">
          Trusted and recognized by top industry review platforms worldwide
        </p>
      </div>

      <div className="featured-container">
        <div className="featured-logos">
          {/* DesignRush */}
          <a
            href="https://www.designrush.com/agency/profile/nexa-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-logo"
          >
            <img src="https://www.nexa-solutions.in/static/images/platform/DesignRush.PNG" alt="DesignRush" />
            <span className="platform-name">DesignRush</span>
          </a>

          {/* SelectedFirms */}
          <a
            href="https://selectedfirms.co/agency/nexa-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-logo"
          >
            <img
              src="https://selectedfirms.co/public/assets/frontend/img/services/round/web-development.webp"
              alt="Top Web Development Company"
            />
            <span className="platform-name">SelectedFirms</span>
          </a>
        </div>
      </div>
    </div>
  );
}
