"use client";
import { RootState } from "@/Store/store";
import { Coins } from "lucide-react";
import { useSelector } from "react-redux";

export default function GameDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = useSelector((state: RootState) => state.User);

  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[50px_auto_50px] gap-2 p-2">
      <div className="bg-foreground/20 rounded-lg py-2 col-span-12 md:col-start-4 md:col-span-6 row-start-1 flex items-center ">
        <div className="px-3 grid md:grid-cols-2 sm:grid-rows w-full">
          <div className=" flex flex-col">
            <h1 className="text-md sm:text-sm font-semibold text-ring">
              {userInfo.PlayerName}
            </h1>
            <h1 className="hidden lg:block text-xs font-thin text-foreground/40">
              {userInfo.PLayerId}
            </h1>
          </div>

          <div className=" flex items-center pr-4 ">
            <div className="flex mx-1">
              <Coins className="text-yellow-500 mx-1" />
              <h1 className="font-bold"> {userInfo.coin}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="mx-1 text-green-300">Level</h1>
              <h1 className="font-bold">{userInfo.level}</h1>
            </div>
            <div className="flex mx-2">
              <h1 className="mx-1 font-bold text-chart-2">XP</h1>
              <h1 className=" font-bold">{userInfo.xp}</h1>
            </div>
            <div className="flex mr-2">
              <div className="flex mx-2 text-yellow-400">
                +<Coins />
              </div>
              <h1 className="font-bold">{userInfo.xpToNext}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className=" col-span-12 md:col-start-4 md:col-span-6 row-start-2 flex items-start justify-center">
        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
}
