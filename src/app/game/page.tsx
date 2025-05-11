import Game from "@/components/game";
import Navbar from "@/components/navbar";

export default function GamePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-8">
        <Game />
      </div>
    </>
  );
}
