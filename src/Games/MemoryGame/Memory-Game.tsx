"use client";
import React from "react";

import { Card } from "@/components/ui/card";
import MemoryGame_Logic from "./MemoryGame-Logic";

export default function MemoryGame() {
  return (
    <main className="flex justify-center  ">
      <div className="min-h-70 min-w-70 ">
        <MemoryGame_Logic />
      </div>
    </main>
  );
}
