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
import { CircleHelpIcon } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="w-full text-white">
      <NavigationMenu className="py-4 bg-blue-dark px-2 border-b border-blue-secondary flex justify-end">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogTrigger asChild>
                <button className="cursor-pointer hover:opacity-80 transition-opacity">
                  <CircleHelpIcon className="size-8" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-blue-dark font-caption text-white p-8 border-none">
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
                      <div className="w-6 h-6 bg-green-500 flex items-center justify-center">
                        A
                      </div>
                      <span>
                        Green indicates the letter is in the word and in the
                        correct spot.
                      </span>
                    </div>
                    <div className="flex items-center gap-8 mb-4">
                      <div className="w-6 h-6 bg-yellow-500 flex items-center justify-center">
                        B
                      </div>
                      <span>
                        Yellow indicates the letter is in the word but in the
                        wrong spot.
                      </span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-6 h-6 bg-blue-secondary flex items-center justify-center">
                        C
                      </div>
                      <span>
                        Blue indicates the letter is not in the word in any
                        spot.
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <button
                    className="px-4 py-2 bg-blue-primary text-white rounded cursor-pointer hover:bg-blue-secondary transition-colors"
                    onClick={() => setHelpOpen(false)}
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
