"use client";
import { Header } from "@/app/components";
import Footer from "@/app/components/Footer";
import Policy from "@/app/components/Policy";
import Heading from "@/app/utils/Heading";
import { useState } from "react";

const PrivacyPage = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Heading
        title={"Privacy Policy - Compile Academy"}
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
        <Policy />
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
