"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center font-caption min-h-screen px-4">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold ">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/")}
            className="text-xl cursor-pointer text-blue-dark hover:bg-blue-light/80 flex justify-center items-center bg-blue-light h-14 px-8 rounded-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
