"use client";
import React from "react";
import TicTacToe_Custom from "./custom-Tictactoe";
import { Card } from "@/components/ui/card";

export default function page() {
  return (
    <main className="flex justify-center  ">
      <Card className="min-h-80 min-w-80 px-5">
        <TicTacToe_Custom />
      </Card>
    </main>
  );
}
