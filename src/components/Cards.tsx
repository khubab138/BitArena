"use client";
import React, { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardProps } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useTheme } from "./context/theme-provider";
import Link from "next/link";

const Cards: React.FC<CardProps> = ({
  title,
  bgColor,
  imgSrc,
  imgalt,
  imgClasse,
  extraClasses,
  link,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Link
      href={link}
      onMouseOver={() => setClicked(!clicked)}
      onClick={() => setClicked(!clicked)}
      className={`group  my-3 lg:my-0 mx-auto  ${
        isDark ? "bg-card-foreground" : "bg-card"
      } overflow-hidden h-[270px] border-none rounded-2xl shadow-lg w-67`}
    >
      <div
        className={`${bgColor}   overflow-hidden h-[135px]  w-full rounded-t-2xl flex items-center justify-center`}
      >
        <img
          src={imgSrc}
          width={100}
          alt={imgalt}
          className={cn(
            imgClasse,
            clicked &&
              "transition-transform duration-500 rotate-[360deg] scale-125"
          )}
        />
        {extraClasses && !clicked && (
          <div
            className={
              "absolute  flex justify-center items-center text-6xl text-[oklch(0.334_0.009_256.7)] font-bold w-[268px] h-[135px] rounded-t-2xl  bg-white/30 backdrop-blur-sm opacity-100 group-hover:opacity-0 transition-opacity duration-500 "
            }
          >
            ?
          </div>
        )}
      </div>
      {/* Lower content area (white card body) */}
      <div className="h-1/2 bg-[oklch(1 0 0)]">
        <CardHeader className=" p-0">
          <CardTitle className="text-2xl text-center font-bold text-[oklch(0.334_0.009_256.7)]">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 mt-3">
          <div className="flex items-center justify-center">
            <Button
              //   onClick={onPlay}
              className="inline-flex bg-[oklch(0.334_0.009_256.7)] items-center gap-2 px-3 py-1.5 rounded-full text-sm"
            >
              Play Now
            </Button>
          </div>
        </CardContent>
      </div>
    </Link>
  );
};

export default Cards;
