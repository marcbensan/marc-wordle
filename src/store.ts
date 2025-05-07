import { atom } from "jotai";

export const wordAtom = atom(""); // the word to be guessed
export const guessesAtom = atom([]); // an array of guesses
export const currentGuessAtom = atom(0); // which guess we are on
