"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center text-white flex flex-col space-y-4">
        <h1 className="text-9xl font-bold ">404</h1>
        <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/")}
            className="text-xl cursor-pointer text-wordle-dark hover:bg-wordle-light/80 flex justify-center items-center bg-wordle-light h-14 px-8 rounded-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
