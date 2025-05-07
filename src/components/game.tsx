"use client";

import { GUESS_LENGTH } from "@/constants/guess";
import { useEffect, useState } from "react";
import Guess from "./guess";
import Keyboard from "./keyboard";

export default function Game({ word }: { word: string }) {
  const [isGuessed, setIsGuessed] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<number>(0);

  //   const [guesses, setGuesses] = useAtom(guessesAtom);
  //   const [currentGuess, setCurrentGuess] = useAtom(currentGuessAtom);

  useEffect(() => {
    function handleSubmit() {
      // will submit to API
    }

    function handleKeys(e) {
      if (!isGuessed) {
        if (e.key === "Enter") {
          handleSubmit();
        }
        if (e.key === "Backspace") {
          guesses[currentGuess] = guesses[currentGuess].slice(
            0,
            guesses[currentGuess].length - 1
          );
        }
        if (guesses[currentGuess].length < 5 && e.key.match(/[A-z]/)) {
          guesses[currentGuess] = guesses[currentGuess] + e.key.toLowerCase();
        }
      }
    }
    window.addEventListener("keyup", handleKeys);
  }, []);

  return (
    <>
      {GUESS_LENGTH.map((_, index) => (
        <Guess key={index} word={"suirt"} guess={"buitr"} isGuessed={true} />
      ))}
      <h1>WIN / LOSE</h1>
      <Keyboard />
    </>
  );
}
