"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Detect mobile ── */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false); // close menu when switching to desktop
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Fade-in entrance ── */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.set(nav, { opacity: 0 });
    gsap.to(nav, { opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2 });
    return () => { gsap.killTweensOf(nav); };
  }, []);

  /* ── Overlay animation ── */
  useEffect(() => {
    const overlay = overlayRef.current;
    const linksContainer = linksContainerRef.current;
    if (!overlay || !linksContainer) return;

    if (menuOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });

      // Stagger animate links
      const linkEls = linksContainer.querySelectorAll(".mobile-nav-link");
      gsap.fromTo(
        linkEls,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => { gsap.set(overlay, { display: "none" }); },
      });
    }
  }, [menuOpen]);

  /* ── Scrollspy ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisible = 0;
        let mostVisibleId = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisible) {
            maxVisible = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        if (mostVisibleId) setActiveSection(mostVisibleId);
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const sectionIds = ["home", "services", "blog", "about", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Blog", id: "blog" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const handleScrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      // Small delay so overlay closes smoothly before scroll
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, menuOpen ? 300 : 0);
    },
    [menuOpen]
  );

  /* ═══════════════════════════════════════════
     MOBILE NAVBAR
  ═══════════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        {/* ── Fixed top bar ── */}
        <nav
          ref={navRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.1rem 1.4rem",
            pointerEvents: "auto",
          }}
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.04em",
              color: "var(--ink)",
              textDecoration: "none",
              position: "relative",
              zIndex: 210,
              background: "rgba(245, 240, 232, 0.45)",
              backdropFilter: "blur(8px) saturate(160%)",
              WebkitBackdropFilter: "blur(8px) saturate(160%)",
              border: "1px solid rgba(14, 13, 12, 0.12)",
              boxShadow: "0 2px 16px rgba(14, 13, 12, 0.06)",
              padding: "0.4rem 1.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "99px",
            }}
          >
            Nexa
          </a>

          {/* Menu / Close icon button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              position: "relative",
              zIndex: 210,
              background: "rgba(245, 240, 232, 0.45)",
              backdropFilter: "blur(8px) saturate(160%)",
              WebkitBackdropFilter: "blur(8px) saturate(160%)",
              border: "1px solid rgba(14, 13, 12, 0.12)",
              boxShadow: "0 2px 16px rgba(14, 13, 12, 0.06)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--ink)",
              padding: 0,
            }}
          >
            {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </nav>

        {/* ── Fullscreen overlay ── */}
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 199,
            background: "var(--bg)",
            display: "none",
            opacity: 0,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Nav links — perfectly centered */}
          <div
            ref={linksContainerRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              alignItems: "center",
              width: "100%",
            }}
          >
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleScrollTo(e, l.id)}
                className="mobile-nav-link"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 550,
                  fontSize: "clamp(32px, 10vw, 48px)",
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                  textAlign: "center",
                  width: "100%",
                  padding: "0.35rem 0",
                  opacity: 0,
                  display: "block",
                  transition: "color 0.2s",
                  fontFeatureSettings: "ss02",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ═══════════════════════════════════════════
     DESKTOP NAVBAR (unchanged)
  ═══════════════════════════════════════════ */
  return (
    <nav
      ref={navRef}
      style={{
        position: "absolute",
        top: "1.1rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        zIndex: 100,
        backgroundColor: "rgba(245, 240, 232, 0.78)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(14, 13, 12, 0.07)",
        padding: "0.5rem 1.4rem",
        borderRadius: "99px",
        fontFamily: "var(--font-display)",
        boxShadow: "0 2px 16px rgba(14, 13, 12, 0.06)",
        whiteSpace: "nowrap",
      }}
    >
      {/* Wordmark */}
      <a
        href="#home"
        onClick={(e) => handleScrollTo(e, "home")}
        style={{
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.04em",
          color: "var(--ink)",
          textDecoration: "none",
        }}
      >
        Nexa
      </a>

      {/* Separator dot */}
      <span style={{ color: "var(--accent)", fontSize: "0.9rem", opacity: 0.5, lineHeight: 1 }}>·</span>

      {/* Links */}
      <div style={{ display: "flex", gap: "0.1rem", alignItems: "center" }}>
        {links.map((l) => {
          const isActive = activeSection === l.id;
          return (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => handleScrollTo(e, l.id)}
              style={{
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "var(--ink)",
                opacity: isActive ? 1 : 0.42,
                textDecoration: "none",
                padding: "0.3rem 0.55rem",
                borderRadius: "99px",
                transition: "opacity 0.25s ease, background 0.25s ease",
                background: isActive ? "rgba(14,13,12,0.06)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) gsap.to(e.currentTarget, { opacity: 0.85, duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                if (!isActive) gsap.to(e.currentTarget, { opacity: 0.42, duration: 0.25 });
              }}
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
