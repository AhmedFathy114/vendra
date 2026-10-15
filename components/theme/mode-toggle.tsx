"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" className="cursor-pointer" />
        }
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer font-medium transition-all duration-200 ease-out hover:translate-x-1 hover:text-red-800! focus-visible:translate-x-1 focus-visible:text-red-800! dark:hover:text-red-400! dark:focus-visible:text-red-400! py-2 hover:bg-transparent!"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer font-medium transition-all duration-200 ease-out hover:translate-x-1 hover:text-red-800! focus-visible:translate-x-1 focus-visible:text-red-800! dark:hover:text-red-400! dark:focus-visible:text-red-400! py-2 hover:bg-transparent!"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer font-medium transition-all duration-200 ease-out hover:translate-x-1 hover:text-red-800! focus-visible:translate-x-1 focus-visible:text-red-800! dark:hover:text-red-400! dark:focus-visible:text-red-400! py-2 hover:bg-transparent!"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
