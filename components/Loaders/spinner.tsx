import React from "react";
import { ImSpinner6 } from "react-icons/im";

type Props = {
  height?: string;
  width?: string;
};

export default function Spinner({ height, width }: Props) {
  const h = height || "h-10";
  const w = width || "w-10";

  return (
    <ImSpinner6
      className={`h-${h} w-${w} animate-spin text-secondary dark:text-white`}
    />
  );
}
