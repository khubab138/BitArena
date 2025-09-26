"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import Hangman from "./Hangman";

export default function page() {
  return (
    <main className="flex justify-center  ">
      <Card className="min-h-80 min-w-80 px-5">
        <Hangman />
      </Card>
    </main>
  );
}
