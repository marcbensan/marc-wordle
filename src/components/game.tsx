"use client";

import { BOXES_LENGTH, GUESS_LENGTH } from "@/constants/guess";
import { useEffect, useState } from "react";
import Guess from "./guess";
import Keyboard from "./keyboard";

export default function Game() {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<string[]>(
    Array(GUESS_LENGTH).fill("")
  );
  const [guessResults, setGuessResults] = useState<number[][]>(
    Array(GUESS_LENGTH)
      .fill(null)
      .map(() => [])
  );
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function handleKeys(e: KeyboardEvent) {
      if (isGameOver) return;

      if (e.key === "Enter") {
        if (guesses[currentGuess].length !== BOXES_LENGTH) {
          setMessage(`Word must be ${BOXES_LENGTH} letters`);
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

          if (!data.is_valid_word) {
            setMessage("Your guess is not a valid word.");
            return;
          }

          setGuessResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[currentGuess] = data.score;
            return newResults;
          });

          if (data.score.every((result: number) => result === 2)) {
            setIsGameOver(true);
            setMessage("Congratulations, you guessed the word!");
            return;
          }

          if (currentGuess < GUESS_LENGTH - 1) {
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
        if (guesses[currentGuess].length < BOXES_LENGTH) {
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

  function getKeyboardLetterStates() {
    const letterStates: { [key: string]: number } = {};

    for (let i = 0; i < currentGuess; i++) {
      const guess = guesses[i];
      const result = guessResults[i];

      if (guess && result && result.length === BOXES_LENGTH) {
        for (let j = 0; j < BOXES_LENGTH; j++) {
          const letter = guess[j];
          const currentState = letterStates[letter] || 0;
          letterStates[letter] = Math.max(currentState, result[j]);
        }
      }
    }

    return letterStates;
  }

  return (
    <div className="flex flex-col items-center min-h-screen mb-24 gap-2">
      <div className={`grid grid-rows-${GUESS_LENGTH} gap-1`}>
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

      {message && (
        <div
          className={`text-center ${
            message === "Congratulations, you guessed the word!"
              ? "text-green"
              : "text-red-500"
          }  h-6`}
        >
          {message}
        </div>
      )}

      {isGameOver && (
        <button
          onClick={() => {
            setGuesses(Array(GUESS_LENGTH).fill(""));
            setGuessResults(
              Array(GUESS_LENGTH)
                .fill(null)
                .map(() => [])
            );
            setCurrentGuess(0);
            setIsGameOver(false);
            setMessage("");
          }}
          className="px-4 py-2 cursor-pointer bg-green text-white rounded-full"
        >
          Play Again
        </button>
      )}

      <Keyboard letterStates={getKeyboardLetterStates()} />
    </div>
  );
}
