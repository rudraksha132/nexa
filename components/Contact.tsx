"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "./AnimatedHeading";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    const infoBox = sectionRef.current.querySelector('.contact-info-box');
    const formBox = sectionRef.current.querySelector('.contact-form');
    
    gsap.set([infoBox, formBox], { opacity: 0, y: 30, filter: 'blur(10px)' });
    
    const st = gsap.to([infoBox, formBox], {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    return () => { st.kill(); };
  }, []);

  return (
    <div className="contact-section" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag" style={{ background: "transparent", border: "1px solid var(--accent)", color: "var(--accent)" }}>Get In Touch</div>
        <AnimatedHeading 
          className="section-title" 
          text="Let's Build Something Amazing" 
          elementType="h2" 
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: "var(--ink)" }} 
        />
        <p className="section-subtitle" style={{ color: "var(--dark-soft)" }}>Ready to transform your business? Contact us today</p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info-box">
          <div className="contact-info-title">Contact Information</div>
          <div className="contact-info-text">Have a project in mind? We&apos;d love to hear from you. Reach out to us and let&apos;s discuss how we can help your business grow.</div>

          <div className="contact-detail">
            <div className="contact-icon">📞</div>
            <div className="contact-detail-text">
              <div className="contact-detail-label">Phone</div>
              <div className="contact-detail-value">+91 8077 313241</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-icon">✉️</div>
            <div className="contact-detail-text">
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-value">contact@nexa-solutions.in</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-icon">📍</div>
            <div className="contact-detail-text">
              <div className="contact-detail-label">Address</div>
              <div className="contact-detail-value">Tapasya Tower, Noida 201313, Uttar Pradesh, India</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-icon">🌐</div>
            <div className="contact-detail-text">
              <div className="contact-detail-label">Website</div>
              <div className="contact-detail-value">www.nexa-solutions.in</div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="form-title">Send us a Message</div>

          <form action="/contact" method="POST">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" name="name" className="form-input" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" name="email" className="form-input" placeholder="contact@nexa-solutions.in" required />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phone" className="form-input" placeholder="+91 98765 43210" required />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" name="subject" className="form-input" placeholder="How can we help?" />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-textarea" placeholder="Tell us about your project..." required></textarea>
            </div>

            <button type="submit" className="form-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
