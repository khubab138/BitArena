import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="p-10">
      <div>
        <Link
          href={"/"}
          className="cursor-pointer roboto text-5xl md:text-6xl font-bold"
        >
          About BitArena
        </Link>
        <p className="text-xl md:text-2xl text-foreground/50 font-light">
          Unwind & Refocus Your Mind
        </p>
        <div className="border-l-6 pl-2 mt-4 border-l-blue-400">
          <h1 className="font-light text-xl ">
            At{" "}
            <Link href={"/"} className="font-bold ">
              BitArena
            </Link>
            , we’re driven by a <span className="font-bold ">passion</span> for
            creating <span className="font-bold">smart</span>,{" "}
            <span className="font-bold">engaging Games</span> that relax the
            mind while sharpening it. We believe play has the power to{" "}
            <span className="font-bold">boost brainpower</span>,
            <span className="font-bold">ease stress</span>, and bring together a
            <span className="font-bold"> community of thoughtful-players</span>
          </h1>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl font-semibold bg-gradient-to-r  from-chart-2 to-muted-foreground   bg-clip-text text-transparent">
            The Story
          </h1>
          <div className="flex items-center">
            <div className="flex items-center mt-2">
              <div className="border-2 h-5 w-5 rounded-full border-foreground" />
              <div className="border-1  w-15  border-foreground" />
              <div className="border-2 h-5 w-5 rounded-full border-foreground" />
            </div>
            <div className="ml-6 mt-2">
              <h1 className="bg-gradient-to-l  from-blue-400 to-muted-foreground   bg-clip-text text-transparent text-md md:text-lg">
                2025: Global Community
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold bg-gradient-to-r  from-chart-2 to-muted-foreground   bg-clip-text text-transparent">
          Meet the developer
        </h1>
        <div className="flex items-center mt-3  ">
          <a
            href="https://www.linkedin.com/in/muhammadkhubabsiddiqui"
            className="cursor-pointer h-20 w-25 md:h-30 md:w-30 overflow-hidden rounded-full border-3 border-chart-2"
          >
            <img
              src="DeveloperProfile.jpg"
              alt="muhammad khubab siddiqui"
              className=""
            />
          </a>
          <div className="ml-5">
            <h1 className="text:md md:text-xl font-semibold">
              Muhammad Khubab Siddiqui
            </h1>
            <p className="text-sm md:text-md font-light text-foreground/40">
              FullStack Web Developer
            </p>
            <p className="text-sm lg:text-md font-light text-foreground/40">
              SMIU Graduate
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
