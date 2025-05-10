import Game from "@/components/game";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen py-8">
        <Game />
      </div>
    </>
  );
}
