import React from "react";
import Hero from "../components/hero";
import CardSection from "@/components/Card-Section";

const page = () => {
  return (
    <main className=" flex flex-col">
      <Hero />
      <CardSection />
    </main>
  );
};

export default page;
