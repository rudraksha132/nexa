"use client";

import { useRef, useEffect, useState } from "react";
import { FlutedGlass } from "@paper-design/shaders-react";

export default function PaperShader() {
  const [shift, setShift] = useState(0.3);
  const [size, setSize] = useState(0.55);
  const animFrameRef = useRef<number | null>(null);
  const targetShiftRef = useRef(0.3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      // Map mouse X to shift range: 0.0 (far left) → 0.6 (far right)
      const normalized = e.clientX / window.innerWidth; // 0–1
      targetShiftRef.current = normalized * 0.6;
    };

    const onLeave = () => {
      targetShiftRef.current = 0.3; // reset to center
    };

    // Lerp toward target each frame for smooth spring-like feel
    const tick = () => {
      setShift((prev) => {
        const next = prev + (targetShiftRef.current - prev) * 0.08;
        return Math.abs(next - targetShiftRef.current) < 0.001
          ? targetShiftRef.current
          : next;
      });
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* FlutedGlass – covers full viewport, masked to only appear below the house/horizon */}
      <div
        id="paper-shader-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, transparent 0%, transparent 56%, black 64%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 56%, black 64%, black 100%)",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <FlutedGlass
          style={{ width: "100%", height: "100%" }}
          image="/hero.png"
          colorBack="#00000000"
          colorShadow="#000000"
          colorHighlight="#ffffff"
          size={0.55}
          shadows={0.25}
          highlights={0.1}
          shape="lines"
          angle={0}
          distortionShape="prism"
          distortion={0.82}
          shift={shift}
          stretch={0}
          blur={0}
          edges={0}
          margin={0}
          grainMixer={0}
          grainOverlay={0}
          fit="cover"
        />
      </div>
    </>
  );
}
