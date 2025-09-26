import React from "react";
import Cards from "./Cards";
import { CARDS } from "@/lib/data";

export default function CardSection() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1">
      {CARDS?.map((card, index) => (
        <Cards
          key={index}
          title={card.title}
          bgColor={card.bgColor}
          imgSrc={card.imgSrc}
          imgalt={card.imgalt}
          imgClasse={card.imgClasse}
          extraClasses={card.extraClasses}
          link={card.link}
        />
      ))}
    </div>
  );
}
