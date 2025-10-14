import { Card } from "@/components/ui/card";
import React from "react";

export default function TicTacToeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
    // <div className=" max-h-screen min-h-[500px] grid grid-cols-12 grid-rows-[repeat(2,100px)_1fr_100px] gap-x-2 gap-y-2 ">
    //   {/* Game */}
    //   <div className="col-start-1 col-end-8 row-start-2 row-end-5 place-content-center">
    //     {children}
    //   </div>
    // </div>
  );
}
