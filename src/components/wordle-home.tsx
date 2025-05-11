"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function WordleHome() {
  const router = useRouter();

  return (
    <div className="flex flex-col overflow-hidden mb-48">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Enjoy a quick game of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                WORDLE
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/images/wordle-pic.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-center object-cover h-full "
          draggable={false}
        />
      </ContainerScroll>

      <div className="w-full flex items-center font-subheading justify-center">
        <Button
          onClick={() => router.push("/game")}
          className="text-4xl cursor-pointer text-wordle-dark hover:bg-wordle-light/80 flex space-between bg-wordle-light h-18 w-56 rounded-full"
        >
          PLAY
        </Button>
      </div>
    </div>
  );
}
