"use client";

import { BOXES_LENGTH } from "@/constants/guess";

export default function Guess({ guess }: { guess: string }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {BOXES_LENGTH.map((_, index) => {
        return (
          <div
            className={`size-10 border border-gray-200 flex items-center justify-center uppercase`}
            key={index}
          >
            {guess[index]}
          </div>
        );
      })}
    </div>
  );
}
