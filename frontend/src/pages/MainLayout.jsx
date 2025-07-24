import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen bg-gray-900 text-white overflow-x-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar {
            display: none;
          }
          body {
            overflow-x: hidden;
          }
        `,
        }}
      />

      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
