"use client";

import { useEffect, useState } from "react";
import Guess from "./guess";
import Keyboard from "./keyboard";

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [guessResults, setGuessResults] = useState(
    Array(6)
      .fill(null)
      .map(() => [])
  );
  const [currentGuess, setCurrentGuess] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function handleKeys(e) {
      if (isGameOver) return;

      if (e.key === "Enter") {
        if (guesses[currentGuess].length !== 5) {
          setMessage("Word must be 5 letters");
          return;
        }

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(apiUrl!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guess: guesses[currentGuess] }),
          });

          if (!res.ok) {
            console.error("Failed to fetch from API");
            setMessage("Error checking the word. Try again.");
            return;
          }

          const data = await res.json();

          // Check if the word is valid
          if (!data.is_valid_word) {
            setMessage("Your guess is not a valid word.");
            return;
          }

          // Save the result if the word is valid
          setGuessResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[currentGuess] = data.score;
            return newResults;
          });

          // Check if the word is correct
          if (data.score.every((result: number) => result === 2)) {
            setIsGameOver(true);
            setMessage("You win!");
            return;
          }

          if (currentGuess < 5) {
            setCurrentGuess(currentGuess + 1);
          } else {
            setIsGameOver(true);
            setMessage("Game over!");
          }
        } catch (err) {
          console.error("Error submitting guess", err);
          setMessage("Something went wrong. Please try again.");
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

  const getKeyboardLetterStates = () => {
    const letterStates = {};

    // Process all guessed words to determine letter states for keyboard
    for (let i = 0; i < currentGuess; i++) {
      const guess = guesses[i];
      const result = guessResults[i];

      if (guess && result && result.length === 5) {
        for (let j = 0; j < 5; j++) {
          const letter = guess[j];
          const currentState = letterStates[letter] || 0;
          // Keep the highest state (0: not found, 1: wrong position, 2: correct position)
          letterStates[letter] = Math.max(currentState, result[j]);
        }
      }
    }

    return letterStates;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-rows-6 gap-1">
        {guesses.map((guess, index) => (
          <Guess
            key={index}
            guess={guess}
            isGuessed={
              index < currentGuess || (isGameOver && index === currentGuess)
            }
            guessResult={guessResults[index]}
          />
        ))}
      </div>

      {message && <div className="text-center text-red-500 h-6">{message}</div>}

      {isGameOver && (
        <button
          onClick={() => {
            setGuesses(Array(6).fill(""));
            setGuessResults(
              Array(6)
                .fill(null)
                .map(() => [])
            );
            setCurrentGuess(0);
            setIsGameOver(false);
            setMessage("");
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Play Again
        </button>
      )}

      <Keyboard letterStates={getKeyboardLetterStates()} />
    </div>
  );
}
