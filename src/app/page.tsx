import Game from "@/components/game";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-6xl font-bold uppercase">Wordle</h1>
      <Game />
    </div>
  );
}
