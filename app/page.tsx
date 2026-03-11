"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Services from "@/components/Services";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Services />
        <Blog />
        <Testimonials />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
