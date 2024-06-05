"use client";
import { Header } from "@/app/components";
import Footer from "@/app/components/Footer";
import Policy from "@/app/components/Policy";
import FAQs from "@/app/components/home/FAQ";
import Heading from "@/app/utils/Heading";
import { useState } from "react";

const FAQPage = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Heading
        title={"Faqs - Compile Academy"}
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords={"Compile Academy about"}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={4}
        setRoute={setRoute}
        route={route}
      />
      <div className="min-h-screen">
      <FAQs />

      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
