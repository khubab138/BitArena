import { GitBranchPlus, Github, GithubIcon, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-sm text-muted-foreground py-4">
      &copy; {new Date().getFullYear()} BitArena — Designed & Developed by Md.
      Khubab Siddiqui
    </footer>
  );
};

export default Footer;
