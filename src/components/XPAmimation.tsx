import { toast } from "sonner";

export function showXP(
  type: "win" | "lose" | "draw" | "custom",
  amount?: number
) {
  switch (type) {
    case "win":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.custom((t: any) => (
        <div
          className={`translate-x-[50%] translate-y-40 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
            t.visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            color: "#03FD07",

            textShadow:
              "0 0 15px rgba(3, 253, 7, 0.7), 0 0 25px rgba(40, 203, 111, 0.6)",
          }}
        >
          +{amount}
        </div>
      ));

      break;

    case "lose":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.custom((t: any) => (
        <div
          className={`translate-x-[50%] translate-y-40 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
            t.visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            textShadow:
              "0 0 15px rgba(253, 3, 3, 0.7), 0 0 25px rgba(220, 44, 38, 0.6)",
          }}
        >
          -{amount}
        </div>
      ));

      break;

    case "draw":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.custom((t: any) => (
        <div
          className={`translate-x-[50%] translate-y-40 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
            t.visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            textShadow:
              "0 0 15px rgba(253, 3, 3, 0.7), 0 0 25px rgba(220, 44, 38, 0.6)",
          }}
        >
          +{amount || 100}
        </div>
      ));

      break;

    default:
      break;
  }
}
