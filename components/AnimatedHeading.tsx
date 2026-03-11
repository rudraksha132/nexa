"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedHeadingProps {
  text: string;
  elementType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function AnimatedHeading({
  text,
  elementType = "h2",
  className = "",
  style = {},
  delay = 0,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");

    // Initial state: hidden, moved down, rotated
    const st = gsap.fromTo(
      chars,
      {
        y: "115%", // Using "115%" as yOffset was not defined
        opacity: 0,
        rotateX: -40,
        filter: 'blur(10px)'
      },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.02,
        delay: delay,
        scrollTrigger: !delay ? {
          trigger: containerRef.current, // Changed 'container' to 'containerRef.current'
          start: "top 85%",
          toggleActions: "play none none none", // Added back toggleActions
        } : undefined
      }
    );

    return () => {
      st.kill();
    };
  }, [text, delay]);

  const Tag = elementType as React.ElementType;
  const words = text.split(" ");

  return (
    <Tag
      ref={containerRef as any}
      className={className}
      style={{ ...style, perspective: "1000px" }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="split-word"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="split-char"
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
                transformOrigin: "50% 100%",
              }}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
