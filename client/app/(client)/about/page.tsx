"use client";
import { Header } from "@/app/components";
import AboutPageDetail from "@/app/components/AboutPageDetail";
import Footer from "@/app/components/Footer";
import Heading from "@/app/utils/Heading";
import React, { useState } from "react";

const AboutPage = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Heading
        title={"About - Compile Academy"}
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords={"Compile Academy about"}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        setRoute={setRoute}
        route={route}
      />
      <div className="min-h-[90vh]">
        <AboutPageDetail />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
