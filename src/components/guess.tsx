"use client";

import { BOXES_LENGTH } from "@/constants/guess";

export default function Guess({
  guess,
  isGuessed,
  guessResult,
}: {
  guess: string;
  isGuessed: boolean;
  guessResult: number[];
}) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {BOXES_LENGTH.map((_, index) => {
        let boxColor = "bg-gray-800";

        if (guess[index]) {
          if (!isGuessed) {
            boxColor = "bg-gray-800";
          } else if (guessResult && guessResult.length > 0) {
            if (guessResult[index] === 2) {
              boxColor = "bg-green-500";
            } else if (guessResult[index] === 1) {
              boxColor = "bg-yellow-500";
            } else {
              boxColor = "bg-gray-700";
            }
          }
        }

        return (
          <div
            className={`size-12 border flex items-center border-gray-600 justify-center uppercase font-bold ${boxColor} transition-colors`}
            key={index}
          >
            {guess[index]}
          </div>
        );
      })}
    </div>
  );
}
