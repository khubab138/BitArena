import React from "react";
import { Button } from "./ui/button";

type buttonType = {
  title: string;
  type?: string;
};

const CustomButton: React.FC<buttonType> = ({ title }) => {
  return (
    <Button className="inline-flex bg-[oklch(0.334_0.009_256.7)] active:bg-[oklch(0.434_0.009_256.7)] items-center gap-2 px-3 mx-1 my-1 py-1.5 rounded text-lg">
      {title}
    </Button>
  );
};

export default CustomButton;
