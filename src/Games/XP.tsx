import { UserState } from "@/lib/type";
import { RootState } from "@/Store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BASE_XP = 200;
const GROWTH_RATE = 1.5;

export default function XP() {
  const UserName: UserState = useSelector((state: RootState) => state.User);
  const UserXp = UserName.xp;
  const UserLevel = UserName.level;
  const UserCoin = UserName.coin;
  const [xp, setXp] = useState(UserXp);
  const [xpToNext, setXpToNext] = useState(BASE_XP);
  const [level, setLevel] = useState<number>(UserLevel);
  const [coin, setCoin] = useState<number>(UserCoin);

  const calcXpNeeded = (lvl: number) => {
    return Math.floor(BASE_XP * Math.pow(GROWTH_RATE, lvl - 1));
  };

  useEffect(() => {
    setXpToNext(calcXpNeeded(level));
  }, [level]);

  function handleMatch(result: string) {
    let gainedXp: number = 0;
    if (result === "win") gainedXp = 100;
    else if (result === "lose") gainedXp = -50;
    else if (result === "draw") gainedXp = -20;
    addXp(gainedXp);
  }
  const addXp = (gainedXp: number) => {
    let newXp = xp + gainedXp;
    let newLevel = level;

    while (newXp >= calcXpNeeded(newLevel)) {
      newXp -= calcXpNeeded(newLevel);
      newLevel++;
    }
    setXp(newXp);
    setLevel(newLevel);
    setCoin(10 + newLevel);
  };

  return { xp, level, xpToNext, coin, handleMatch };
}
