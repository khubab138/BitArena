"use client";
import React from "react";

import Hangman_Logic from "./Hangman-Logic";

export default function Hangman() {
  return (
    <main className="flex justify-center  ">
      <div className="min-h-80 min-w-80 px-5">
        <Hangman_Logic />
      </div>
    </main>
  );
}
