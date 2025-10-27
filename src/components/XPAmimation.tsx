// utils/xpToast.ts
import { toast } from "sonner";

// Main XP Toast function
export function showXP(
  type: "win" | "lose" | "draw" | "custom",
  amount?: number
) {
  switch (type) {
    case "win":
      toast.custom((t) => (
        <div
          className={`translate-x-[50%] translate-y-30 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
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
      toast.custom((t) => (
        <div
          className={`translate-x-[50%] translate-y-30 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
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
      toast.custom((t) => (
        <div
          className={`translate-x-[50%] translate-y-30 lg:translate-x-85 lg:translate-y-35 font-bold text-xl animate-xp-toast ${
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
