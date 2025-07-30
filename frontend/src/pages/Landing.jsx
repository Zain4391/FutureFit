import React from "react";
import CTA from "../components/CTA";
import DragAndDrop from "../components/DragAndDrop";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Working from "../components/Working";

const Landing = () => {
  return (
    <>
      <Hero />
      <div id="how-it-works">
        <Working />
      </div>
      <DragAndDrop />
      <div id="features">
        <Features />
      </div>
      <div id="testimonials">
        <CTA />
      </div>
      <div id="about">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
