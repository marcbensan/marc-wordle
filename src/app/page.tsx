import Guess from "@/components/guess";
import Keyboard from "@/components/keyboard";
import { GUESS_LENGTH } from "@/constants/guess";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-6xl font-bold uppercase">Wordle</h1>
      {GUESS_LENGTH.map((guess, index) => (
        <Guess key={index} word={"audio"} guess={"suite"} isGuessed={false} />
      ))}
      <h1>WIN / LOSE</h1>
      <Keyboard />
    </div>
  );
}
