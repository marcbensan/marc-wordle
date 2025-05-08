"use client";

import { useEffect } from "react";

export default function Keyboard({ letterStates = {} }) {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const keyElement = document.querySelector(`[data-key="${key}"]`);

      if (keyElement) {
        keyElement.classList.add("scale-90");
        setTimeout(() => keyElement.classList.remove("scale-90"), 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getKeyColor = (key) => {
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === "enter" || normalizedKey === "backspace") {
      return "bg-blue-secondary hover:bg-blue-secondary/50";
    }

    const state = letterStates[normalizedKey];

    if (state === 2) {
      return "bg-green hover:bg-green/80 text-white";
    } else if (state === 1) {
      return "bg-yellow hover:bg-yellow/80 text-white";
    } else if (state === 0) {
      return "bg-blue-dark hover:bg-blue-dark/50 text-white";
    }

    return "bg-blue-secondary hover:bg-blue-secondary/50 text-white";
  };

  const handleClick = (key) => {
    const event = new KeyboardEvent("keydown", { key });
    window.dispatchEvent(event);
  };

  return (
    <div
      data-testid="keyboard"
      className="w-full max-w-lg px-2 z-10 mt-4 font-caption"
    >
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => {
            const isSpecialKey = key === "Enter" || key === "Backspace";
            const keyWidth = isSpecialKey ? "w-16" : "w-10";

            return (
              <button
                key={key}
                data-key={key.toLowerCase()}
                className={`${keyWidth} h-12 rounded-md font-medium ${getKeyColor(
                  key
                )} transition-all duration-150 text-white flex items-center justify-center`}
                onClick={() => handleClick(key)}
              >
                {key === "Backspace"
                  ? "←"
                  : key === "Enter"
                  ? "ENTER"
                  : key.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
