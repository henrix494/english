"use client";

import Level_List from "@/components/Level_List";
import { useState } from "react";
import Confetti from "react-confetti";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <main className="">
      <h2 className="text-center mt-20 text-4xl font-bold">Choose a level</h2>
      <Level_List />
      <div className="flex justify-center mt-10"></div>
    </main>
  );
}
