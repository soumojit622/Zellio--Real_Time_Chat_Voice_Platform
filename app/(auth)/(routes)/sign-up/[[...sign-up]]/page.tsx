"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#12152a] to-[#0f172a] relative overflow-hidden">
      {/* Glowing background orbs */}
      <div className="absolute w-[500px] h-[500px] bg-zinc-600 opacity-25 rounded-full blur-3xl top-[-10%] left-[-10%] animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-gray-600 opacity-20 rounded-full blur-3xl bottom-[-10%] right-[-10%] animate-pulse" />

      {/* Centered SignUp Card */}
      <div className="z-10 backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl shadow-black/50 px-8 py-10 sm:px-12 sm:py-14 w-full max-w-md flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <SignUp
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
