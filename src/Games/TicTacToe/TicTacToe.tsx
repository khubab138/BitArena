"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import TicTacToe_Logic from "./TicTacToe-Logic";

export default function TicTacToe() {
  return (
    <main className="flex justify-center  ">
      <div className="min-h-70 min-w-70 ">
        <TicTacToe_Logic />
      </div>
    </main>
  );
}
