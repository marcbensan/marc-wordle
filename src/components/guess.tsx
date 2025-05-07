"use client";

import { BOXES_LENGTH } from "@/constants/guess";

export default function Guess({
  word,
  guess,
  isGuessed,
}: {
  word: string;
  guess: string;
  isGuessed: boolean;
}) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {BOXES_LENGTH.map((_, index) => {
        const boxColor = !isGuessed
          ? "bg-black"
          : guess[index] === word[index]
          ? "bg-green-400"
          : word.includes(guess[index])
          ? "bg-yellow-400"
          : "bg-black";

        return (
          <div
            className={`size-10 border border-gray-200 flex items-center justify-center uppercase ${boxColor}`}
            key={index}
          >
            {guess[index]}
          </div>
        );
      })}
    </div>
  );
}
