"use client";

import { useEffect, useState } from "react";
import Guess from "./guess";
import Keyboard from "./keyboard";

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState(0);
  const [message, setMessage] = useState("");

  // Handle key presses for the game
  useEffect(() => {
    async function handleKeys(e) {
      if (isGameOver) return;

      if (e.key === "Enter") {
        if (guesses[currentGuess].length !== 5) {
          setMessage("Word must be 5 letters");
          return;
        }
        console.log(JSON.stringify({ guess: guesses[currentGuess] }));

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(apiUrl!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guess: guesses[currentGuess] }),
        });

        if (!res.ok) {
          console.error("Can not fetch");
        }

        const data = await res.json();

        console.log(data);

        // Check if the word is correct
        if (data.score.every((result: number) => result === 2)) {
          setIsGameOver(true);
          setMessage("You win!");
          return;
        }

        // Move to next guess if not the last guess
        if (currentGuess < 5) {
          setCurrentGuess(currentGuess + 1);
        } else {
          setIsGameOver(true);
          setMessage(`Game over! The word was ${answer}`);
        }
      } else if (e.key === "Backspace") {
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          newGuesses[currentGuess] = newGuesses[currentGuess].slice(0, -1);
          return newGuesses;
        });
        setMessage("");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (guesses[currentGuess].length < 5) {
          setGuesses((prevGuesses) => {
            const newGuesses = [...prevGuesses];
            newGuesses[currentGuess] =
              newGuesses[currentGuess] + e.key.toLowerCase();
            return newGuesses;
          });
          setMessage("");
        }
      }
    }

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [guesses, currentGuess, isGameOver]);

  // Handle virtual keyboard clicks
  //   const handleKeyClick = (key) => {
  //     if (isGameOver) return;

  //     // Simulate keypresses for the virtual keyboard
  //     const event = {
  //       key:
  //         key === "←" ? "Backspace" : key === "↵" ? "Enter" : key.toLowerCase(),
  //     };

  //     handleKeys(event);
  //   };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-rows-6 gap-1">
        {guesses.map((guess, index) => (
          <Guess key={index} guess={guess} />
        ))}
      </div>

      {message && <div className="text-center text-red-500 h-6">{message}</div>}

      {isGameOver && (
        <button
          onClick={() => {
            setGuesses(Array(6).fill(""));
            setCurrentGuess(0);
            setIsGameOver(false);
            setMessage("");
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Play Again
        </button>
      )}

      <Keyboard />
    </div>
  );
}
