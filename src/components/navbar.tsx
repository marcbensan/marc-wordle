"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CircleHelpIcon, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  return (
    <div className="w-full text-white">
      <NavigationMenu className="p-4 bg-wordle-dark w-full border-b border-wordle-secondary flex justify-end">
        <NavigationMenuList className="flex w-full items-center space-x-4">
          <NavigationMenuItem className="flex flex-row space-x-1 items-center">
            <button
              onClick={() => router.push("/")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              data-testid="home-button"
            >
              <HomeIcon className="size-8" />
            </button>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex items-center">
            <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <DialogTrigger asChild>
                <button
                  data-testid="help-button"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <CircleHelpIcon className="size-8" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-wordle-dark text-white p-8 border-none">
                <DialogHeader>
                  <DialogTitle>How to Play</DialogTitle>
                  <DialogDescription>
                    Learn how to play Wordle
                  </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                  <h3 className="font-medium mb-2">Game Rules:</h3>
                  <ul className="space-y-2">
                    <li>• Guess the WORDLE in 6 tries.</li>
                    <li>• Each guess must be a valid 5-letter word.</li>
                    <li>
                      • The color of the tiles will change to show how close
                      your guess was to the word.
                    </li>
                  </ul>

                  <div className="mt-4">
                    <div className="flex items-center gap-8 mb-4">
                      <div className="w-6 h-6 bg-green flex items-center justify-center">
                        A
                      </div>
                      <span>
                        Green indicates the letter is in the word and in the
                        correct spot.
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <div className="w-6 h-6 bg-yellow flex items-center justify-center">
                        B
                      </div>
                      <span>
                        Yellow indicates the letter is in the word but in the
                        wrong spot.
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-6 h-6 bg-wordle-secondary flex items-center justify-center">
                        C
                      </div>
                      <span>
                        Gray indicates the letter is not in the word in any
                        spot.
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <button
                    className="px-4 py-2 bg-wordle-primary text-white rounded cursor-pointer hover:bg-wordle-secondary transition-colors"
                    onClick={() => setIsHelpOpen(false)}
                  >
                    Got it
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
