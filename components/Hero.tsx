"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PaperShader from "./PaperShader";
import AnimatedHeading from "./AnimatedHeading";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    /* Grab shader dynamically to sync transformations */
    const shader = document.getElementById("paper-shader-container");

    /* set initial states — prevents FOUC */
    gsap.set(eyebrowRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0 });
    gsap.set(image, { scale: 1.1, filter: "blur(20px)" });
    if (shader) gsap.set(shader, { scale: 1.1, filter: "blur(20px)", transformOrigin: "center center" });

    /* entrance timeline */
    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(image, {
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power3.inOut",
    });

    if (shader) {
      tl.to(shader, {
        scale: 1,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.inOut",
      }, "<"); // Sync exactly with image
    }

    tl.to(
      eyebrowRef.current,
      { opacity: 0.55, duration: 0.8, ease: "power2.out" },
      "-=1.0"
    )
      .to(
        ctaRef.current,
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

    /* scroll parallax & pin */
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        scrub: 0.5,
      },
    });

    st.to(image, { scale: 1.15, ease: "none" });
    if (shader) st.to(shader, { scale: 1.15, ease: "none" }, "<"); // Sync scroll parallax

    st.to(
      [eyebrowRef.current, ctaRef.current],
      { opacity: 0, y: -60, stagger: 0.05, ease: "none" },
      "<15%"
    );

    return () => {
      tl.kill();
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* ── LAYER 1: IMAGE (z-1) ── */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 1,
          willChange: "transform, filter",
        }}
      >
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

      {/* ── LAYER 2+3: PAPER SHADER (z-2, z-3) ── */}
      <PaperShader />

      {/* ── LAYER 4: VEIL GRADIENT (z-4) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(8,6,4,0.15) 0%, rgba(8,6,4,0.00) 35%, rgba(14, 13, 12, 0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── LAYER 5: CONTENT (z-5) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0 clamp(1rem, 4vw, 1.5rem) clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 1.5rem)",
        }}
      >
        {/* Headline / Brand Name */}
        <AnimatedHeading
          text={"NEXA\nSOLUTIONS"}
          elementType="h1"
          delay={1.2}
          style={{
            fontWeight: 700,
            fontSize: "clamp(52px, 12vw, 220px)",
            lineHeight: 0.85,
            letterSpacing: "0em",
            color: "#F5F0E8",
            margin: 0,
            textTransform: "uppercase",
          }}
        />

        {/* Eyebrow tagline */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(11px, 1vw, 13px)",
            fontWeight: 500,
            color: "rgba(245, 240, 232, 0.55)",
            lineHeight: 1.5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "1rem 0 0 0",
            maxWidth: "420px",
          }}
        >
          Technological Architecture & Design Intelligence. Noida, IN.
        </p>

        {/* CTA links */}
        <div ref={ctaRef} style={{ display: "flex", gap: "1.25rem", marginTop: "0.75rem" }}>
          <a
            href="#contact"
            style={{
              color: "#F5F0E8",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              opacity: 0.65,
              borderBottom: "1px solid rgba(245,240,232,0.3)",
              paddingBottom: "2px",
              transition: "opacity 0.2s",
            }}
          >
            Contact
          </a>
          <a
            href="#services"
            style={{
              color: "#F5F0E8",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              opacity: 0.65,
              borderBottom: "1px solid rgba(245,240,232,0.3)",
              paddingBottom: "2px",
              transition: "opacity 0.2s",
            }}
          >
            Services
          </a>
        </div>
      </div>
    </section>
  );
}
