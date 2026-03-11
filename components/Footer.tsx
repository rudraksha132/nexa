"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const sections = sectionRef.current.querySelectorAll(
      ".footer-about, .footer-section"
    );

    gsap.set(sections, { opacity: 0, y: 20 });

    const st = gsap.to(sections, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <footer className="footer" ref={sectionRef}>
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-about">
          <div className="footer-logo">
            <div className="footer-logo-img">
              <img src="/logo.png" alt="Nexa Solutions" />
            </div>
          </div>
          <p className="footer-desc">
            Technological architecture & design intelligence for the modern
            web, based in Noida, India.
          </p>
        </div>

        {/* Services */}
        <div className="footer-section">
          <div className="footer-section-title">Capabilities</div>
          <div className="footer-links">
            <span className="footer-link">Digital Platforms</span>
            <span className="footer-link">Mobile Systems</span>
            <span className="footer-link">Applied AI</span>
            <span className="footer-link">Workflow Automation</span>
          </div>
        </div>

        {/* Company */}
        <div className="footer-section">
          <div className="footer-section-title">Company</div>
          <div className="footer-links">
            <span className="footer-link">About</span>
            <span className="footer-link">Blog</span>
            <span className="footer-link">Careers</span>
            <span className="footer-link">Contact</span>
          </div>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <div className="footer-section-title">Legal</div>
          <div className="footer-links">
            <span className="footer-link">Privacy Policy</span>
            <span className="footer-link">Terms</span>
            <span className="footer-link">Cookies</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Nexa Solutions. All rights reserved.</span>
        <span>Noida, Uttar Pradesh, India</span>
      </div>
    </footer>
  );
}
