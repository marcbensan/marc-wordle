"use client";

import { BOXES_LENGTH } from "@/constants/guess";
import { useEffect } from "react";

export default function Guess({
  word,
  guess,
  isGuessed,
}: {
  word: string;
  guess: string;
  isGuessed: boolean;
}) {
  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.addEventListener("keyup", handleKeys);
    };
  }, []);
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {BOXES_LENGTH.map((e, index) => (
        <div
          className="size-10 border border-gray-200 flex items-center justify-center uppercase"
          key={index}
        >
          <input />
        </div>
      ))}
    </div>
  );
}
