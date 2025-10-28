import { Github, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" md:py-4 flex justify-center ">
      <div>
        <h1 className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold">BitArena</span> — Designed & Developed by{" "}
          <span className="font-bold">Md. Khubab Siddiqui</span>
        </h1>
        <div className="flex justify-center items-center mt-2 ">
          <Link
            href={"https://github.com/khubab138"}
            className="mx-2 bg-foreground text-background rounded-full  flex items-center p-0.5"
          >
            <Github />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/muhammadkhubabsiddiqui"}
            className="mx-2 text-blue-500"
          >
            <LinkedinIcon />
          </Link>
          <Link href={"/info"} className="mx-2 text-yellow-200">
            <h1 className="text-3xl">✉</h1>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
