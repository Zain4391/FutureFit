import React from "react";
import CTA from "../components/CTA";
import DragAndDrop from "../components/DragAndDrop";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Working from "../components/Working";

const Landing = () => {
  return (
    <>
      <Hero />
      <Working />
      <DragAndDrop />
      <Features />
      <CTA />
    </>
  );
};

export default Landing;
