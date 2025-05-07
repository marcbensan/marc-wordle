"use client";

import { BOXES_LENGTH } from "@/constants/guess";
import { motion } from "motion/react";

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
    <div className="grid grid-cols-5 gap-2 mb-1 z-10 font-caption text-white text-lg">
      {BOXES_LENGTH.map((_, index) => {
        let boxColor = "bg-blue-secondary";

        if (guess[index]) {
          if (!isGuessed) {
            boxColor = "bg-blue-secondary";
          } else if (guessResult && guessResult.length > 0) {
            if (guessResult[index] === 2) {
              boxColor = "bg-green";
            } else if (guessResult[index] === 1) {
              boxColor = "bg-yellow";
            } else {
              boxColor = "bg-blue-secondary";
            }
          }
        }

        return (
          <div
            className={`size-12 border-2 flex items-center border-blue-dark/70 rounded-sm justify-center uppercase font-extrabold ${boxColor} transition-colors`}
            key={index}
          >
            {guess[index] && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
                }}
              >
                {guess[index]}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
