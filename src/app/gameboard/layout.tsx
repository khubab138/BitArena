import { Card } from "@/components/ui/card";

export default function GameDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  playerinfo: React.ReactNode;
}>) {
  return (
    <div className="max-h-screen min-h-[500px] grid grid-cols-12 grid-rows-[repeat(2,100px)_1fr_100px] gap-x-2 gap-y-2 p-4">
      {/* Sidebar (hidden on small screens, visible on md and up) */}
      <Card className="hidden md:block col-start-2 col-end-4 row-start-1 row-end-5 bg-background/30">
        <div className="p-4"></div>
      </Card>

      {/* Game */}
      <div className="col-start-2 md:col-start-4 col-end-12 row-start-1 row-end-5 place-content-center ">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
