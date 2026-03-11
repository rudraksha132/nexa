"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const boxes = sectionRef.current.querySelectorAll('.service-box');
    
    // Set initial state
    gsap.set(boxes, { opacity: 0, y: 70, scale: 0.94 });
    
    // Create ScrollTrigger animation with ease
    const st = gsap.to(boxes, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.3,
      stagger: { amount: 0.55, from: "start" },
      ease: "expo.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag" style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>Capabilities</div>
        <AnimatedHeading 
          className="section-title" 
          text="Technological Architecture" 
          elementType="h2" 
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }} 
        />
        <p className="section-subtitle">Systems built for scale, resilience, and conversion.</p>
      </div>
      
      <div className="services-container">

        {/* WEBSITE DEVELOPMENT */}
        <div className="service-box cell-1">
          <div className="service-box-title">Digital Platforms</div>
          <p className="service-box-desc">
            High-performance web architecture engineered for conversion.
          </p>
          <ul className="service-points">
            <li>Enterprise React & Next.js scaling</li>
            <li>Headless CMS integration</li>
            <li>WebGL & Canvas experiences</li>
          </ul>
        </div>

        {/* MOBILE APP DEVELOPMENT */}
        <div className="service-box cell-2">
          <div className="service-box-title">Mobile Systems</div>
          <p className="service-box-desc">
            Native and cross-platform mobile infrastructure.
          </p>
          <ul className="service-points">
            <li>React Native & Expo</li>
            <li>Real-time data synchronization</li>
            <li>Hardware API integration</li>
          </ul>
        </div>

        {/* N8N AUTOMATIONS */}
        <div className="service-box cell-3">
          <div className="service-box-title">Workflow Automation</div>
          <p className="service-box-desc">
            Algorithmic orchestration of business processes.
          </p>
          <ul className="service-points">
            <li>n8n & proprietary pipelines</li>
            <li>Autonomous CRM routing</li>
          </ul>
        </div>

        {/* AI & ML SOLUTIONS */}
        <div className="service-box cell-4">
          <div className="service-box-title">Applied AI</div>
          <p className="service-box-desc">
            Self-hosted, air-gapped machine learning models.
          </p>
          <ul className="service-points">
            <li>Local LLM deployment</li>
            <li>RAG & Vector Search</li>
          </ul>
        </div>

        {/* DATA ANALYSIS */}
        <div className="service-box cell-5">
          <div className="service-box-title">Data Architecture</div>
          <p className="service-box-desc">
            Telemetry, tracking, and generative optimization.
          </p>
          <ul className="service-points">
            <li>Server-side tracking</li>
            <li>Generative Engine Optimization</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
