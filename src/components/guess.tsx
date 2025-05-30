"use client";

import { BOXES_LENGTH } from "@/constants/guess";
import { motion } from "framer-motion";

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
    <div className={`grid grid-cols-5 gap-2 mb-1 text-white text-lg`}>
      {Array(BOXES_LENGTH)
        .fill(0)
        .map((_, index) => {
          let boxColor = "bg-wordle-secondary";

          if (guess[index]) {
            if (!isGuessed) {
              boxColor = "bg-wordle-secondary";
            } else if (guessResult && guessResult.length > 0) {
              if (guessResult[index] === 2) {
                boxColor = "bg-green";
              } else if (guessResult[index] === 1) {
                boxColor = "bg-yellow";
              } else {
                boxColor = "bg-wordle-dark";
              }
            }
          }

          const flipVariants = {
            initial: {
              rotateX: 0,
            },
            flip: {
              rotateX: [0, 90, 0],
              transition: {
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeInOut",
              },
            },
          };

          return (
            <motion.div
              className={`size-12 border-2 flex items-center border-wordle-dark/70 rounded-sm justify-center uppercase font-extrabold ${boxColor}`}
              key={index}
              variants={flipVariants}
              initial="initial"
              animate={
                isGuessed && guessResult && guessResult.length > 0
                  ? "flip"
                  : "initial"
              }
              data-box-status={isGuessed ? guessResult[index] : null}
              data-testid="motion-box"
            >
              {guess[index] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.2,
                    scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
                  }}
                  data-testid="motion-letter"
                >
                  {guess[index]}
                </motion.div>
              )}
            </motion.div>
          );
        })}
    </div>
  );
}
