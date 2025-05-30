"use client";

import { useEffect } from "react";

export default function Keyboard({
  letterStates = {},
}: {
  letterStates: { [key: string]: number };
}) {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const keyElement = document.querySelector(`[data-key="${key}"]`);

      if (keyElement) {
        keyElement.classList.add("scale-90");
        setTimeout(() => keyElement.classList.remove("scale-90"), 100);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function getKeyColor(key: string) {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === "enter" || normalizedKey === "backspace") {
      return "bg-wordle-secondary hover:bg-wordle-secondary/50";
    }

    const state = letterStates[normalizedKey];

    if (state === 2) {
      return "bg-green hover:bg-green/80";
    } else if (state === 1) {
      return "bg-yellow hover:bg-yellow/80";
    } else if (state === 0) {
      return "bg-wordle-dark hover:bg-wordle-dark/50";
    }

    return "bg-wordle-secondary hover:bg-wordle-secondary/50";
  }

  function handleClick(key: string) {
    const event = new KeyboardEvent("keydown", { key });
    window.dispatchEvent(event);
  }

  return (
    <div data-testid="keyboard" className="w-full px-2 mt-4">
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => {
            const isSpecialKey = key === "Enter" || key === "Backspace";
            const keyWidth = isSpecialKey ? "w-12" : "w-8 md:w-10";

            return (
              <button
                key={key}
                data-key={key.toLowerCase()}
                className={`${keyWidth} h-auto text-white cursor-pointer px-1 py-3 md:px-3 text-md rounded-md ${getKeyColor(
                  key
                )} transition-all duration-150 flex items-center justify-center`}
                onClick={() => handleClick(key)}
              >
                {key === "Backspace"
                  ? "←"
                  : key === "Enter"
                  ? "↩"
                  : key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
