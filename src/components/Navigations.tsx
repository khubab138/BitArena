"use client";

import { Menu, User, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { NavItem } from "@/lib/type";
import { NavOptions } from "@/lib/data";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navigations = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navOpt, setNavOpt] = useState<number | null>(null);

  return (
    <nav>
      {/* Desktop*/}
      <div className="hidden md:flex items-center cursor-pointer">
        {NavOptions.map((nav: NavItem, index: number) => (
          <div
            key={nav.title}
            className="relative mx-4"
            onMouseEnter={() => setNavOpt(index)}
            onMouseLeave={() => setNavOpt(null)}
          >
            <Link
              href={nav.link || "#"}
              className="flex text-lg text-foreground hover:text-primary active:text-secondary font-extralight"
            >
              <p className="flex">{nav.title}</p>
            </Link>

            {/* Sub-navigation dropdown */}
            {navOpt === index && nav.subOptions && (
              <div className="absolute top-full left-0 overflow-x-hidden bg-foreground/70 text-background  shadow-md z-50">
                {nav.subOptions.map((subnav, i) => (
                  <Link
                    key={i}
                    href={subnav.link}
                    className="block px-4 py-2 hover:bg-foreground/80 hover:text-primary transition"
                  >
                    {subnav.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden relative w-[70vw] ">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>

        <div
          className={`w-full absolute overflow-hidden flex flex-col bg-foreground/90 text-background max-h-screen  py-3 rounded-tr-2xl rounded-b-2xl  duration-500 transform transition-all ease-in-out ${
            isOpen
              ? "opacity-100 pointer-events-auto translate-y-5 "
              : "opacity-0 pointer-events-none translate-y-0 translate-x-0"
          }`}
        >
          {NavOptions.map((nav: NavItem, index) => (
            <Link
              key={index}
              href={nav.link}
              className="w-full  px-5 pb-4 text-2xl font-extralight border-b-2 active:text-secondary transform transition-all duration-700 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(10px)",
                transitionDelay: isOpen ? `${index * 200}ms` : "0ms",
              }}
              onClick={() => setIsOpen(false)}
            >
              {nav.title}
            </Link>
          ))}
          <div className="flex justify-between mt-30 bg-background/90 m-2 rounded-lg">
            <SignedOut>
              <SignInButton>
                <User className="mx-1 h-8 w-8 active:text-secondary  rounded-full text-foreground" />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignUpButton>
              <h1 className=" text-foreground mr-2 p-1 active:text-secondary text-center ">
                Create Account
              </h1>
            </SignUpButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigations;
