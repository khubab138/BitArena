"use client";
import { useTheme } from "./context/theme-provider";

// Hero.tsx
const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className="text-center mb-6">
      <img
        className="mx-auto  max-w-md transition-all duration-300"
        src={isDark ? "logo.png" : "logo_light.png"}
        alt="Jigsaw_puzzle"
      />
      <div>
        <h1 className="text-4xl font-bold m-0">BitArena</h1>
        <p className="text-lg text-gray-600 m-0">Unwind & Refocus Your Mind</p>
      </div>
    </section>
  );
};

export default Hero;
