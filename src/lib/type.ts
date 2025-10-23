export type CardProps = {
  title: string;
  link: string;
  bgColor?: string;
  imgSrc: string;
  imgalt: string;
  imgClasse: string;
  extraClasses?: boolean;
};
export type NavItem = {
  title: string;
  link: string;
  subOptions?: {
    title: string;
    link: string;
  }[];
};

export interface UserState {
  PlayerName: string;
  PLayerId: string;
  PlayerEmail: String;
  level: number;
  xp: number;
  coin: number;
  xpToNext: number;
}

export type SetUsersPayload = {
  Id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  coin: number;
  xpToNext: number;
};
