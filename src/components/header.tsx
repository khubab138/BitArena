"use client";
import { Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./context/theme-provider";
import Navigations from "./Navigations";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import logo1 from "../../public/logo1.svg";
import logo2 from "../../public/logo2.svg";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full pt-4  ">
      <div className="container grid grid-cols-3 grid-rows-1  items-center   h-16 w-4/5 px-4 mx-auto rounded-xl bg-background/95 supports-[backdrop-filter]:bg-background/60">
        {/*Logo*/}

        <Link
          href={"/"}
          className="z-50 cursor-pointer  flex items-center col-span-1 row-start-1 col-start-2 md:col-start-1 md:justify-self-start justify-self-center  "
        >
          <Image
            src={isDark ? logo1 : logo2}
            height={10}
            width={50}
            alt="JigsawBrain"
            className="lg:h-12 h-8 flex "
          />
          <h1 className="hidden lg:block lg:text-2xl mx-1"> BitArena</h1>
        </Link>

        {/*Navigation*/}
        <div className="w-full col-span-1 row-start-1 col-start-1 md:col-start-2 md:justify-items-center  ">
          <Navigations />
        </div>

        <div className="col-span-1 row-start-1 col-start-3 md:col-start-3 md:justify-self-end justify-self-end ">
          <div className="flex items-center justify-between md:px-5 lg:w-1/8 ">
            {/*Login*/}
            <div className=" md:flex hidden">
              <div className="flex mx-2">
                <SignedOut>
                  <SignInButton>
                    <User className="mx-1 h-6 w-6 hover:text-primary active:text-secondary cursor-pointer  rounded-full text-foreground" />
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            {/*theme*/}
            <div
              className={`flex items-center mx-1 cursor-pointer transition-transform duration-500 ${
                isDark ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? (
                <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
              ) : (
                <Moon className="h-6 w-6 text-blue-500  rotate-0 transition-all" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
