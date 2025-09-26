"use client";
import React from "react";

import { Card } from "@/components/ui/card";
import MemoryGame from "./memory-game";

export default function page() {
  return (
    <main className="flex justify-center  ">
      <Card className="min-h-80 min-w-80 px-5">
        <MemoryGame />
      </Card>
    </main>
  );
}
