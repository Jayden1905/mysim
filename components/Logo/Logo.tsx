import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div>
      <Link scroll={false} href={"/"} className="text-2xl font-bold">
        MYSIM
      </Link>
    </div>
  );
}
