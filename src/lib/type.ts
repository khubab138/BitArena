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
