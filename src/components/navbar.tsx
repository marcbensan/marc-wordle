import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CircleHelpIcon, SettingsIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full text-white">
      <NavigationMenu className="py-4 bg-blue-dark px-2 border-b border-zinc-400 flex justify-end">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <CircleHelpIcon className="size-8" />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SettingsIcon className="size-8" />
          </NavigationMenuItem>
          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
