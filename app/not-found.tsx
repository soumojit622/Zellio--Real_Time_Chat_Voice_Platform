"use client";

import {
  Ghost,
  ArrowLeft,
  Search,
  Zap,
  Bug,
  EyeOff,
  Compass,
  Flame,
  XOctagon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const funMessages = [
  {
    icon: <XOctagon className="w-5 h-5 text-red-500" />,
    text: "Looks like this channel got deleted... or maybe it never existed",
  },
  {
    icon: <Compass className="w-5 h-5 text-yellow-400" />,
    text: "You’ve wandered into the shadow realm of Zellio",
  },
  {
    icon: <EyeOff className="w-5 h-5 text-indigo-400" />,
    text: "This page took an invisibility potion",
  },
  {
    icon: <Search className="w-5 h-5 text-green-400" />,
    text: "We searched high and low but... nada!",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    text: "404... but we promise we’re better at real-time messaging",
  },
];

export default function NotFound() {
  const [randomMessage, setRandomMessage] = useState<{
    icon: React.ReactNode;
    text: string;
  } | null>(null);

  useEffect(() => {
    const random = funMessages[Math.floor(Math.random() * funMessages.length)];
    setRandomMessage(random);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2B2D31] via-[#1e1f22] to-[#17181b] text-white flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Glowing Background Spots */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <GlowSpot className="top-[20%] left-[15%] w-32 h-32 bg-blue-500/10" />
        <GlowSpot className="top-[65%] left-[30%] w-24 h-24 bg-pink-500/10" />
        <GlowSpot className="top-[30%] right-[20%] w-20 h-20 bg-yellow-300/10" />
        <GlowSpot className="bottom-[10%] right-[10%] w-36 h-36 bg-green-400/10" />
        <GlowSpot className="bottom-[30%] left-[10%] w-28 h-28 bg-indigo-400/10" />
      </div>

      <motion.div
        className="text-center max-w-xl z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-6"
          whileHover={{ rotate: [0, 8, -8, 0], scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <Ghost className="h-20 w-20 text-[#5865F2] drop-shadow-[0_0_12px_#5865F2]" />
        </motion.div>

        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] via-indigo-400 to-blue-500 drop-shadow-md mb-2">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">
          Lost in the Zellioverse
        </h2>

        {randomMessage && (
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base min-h-[3rem] font-mono italic mb-6">
            {randomMessage.icon}
            <TypewriterText text={randomMessage.text} />
          </div>
        )}

        <div className="flex justify-center flex-wrap gap-3 mb-8">
          <Feature
            icon={<Search className="w-5 h-5" />}
            text="We looked everywhere"
          />
          <Feature icon={<Bug className="w-5 h-5" />} text="Maybe it's a bug" />
          <Feature
            icon={<Flame className="w-5 h-5" />}
            text="Or a hidden feature?"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#5865F2] hover:bg-[#4752c4] transition-colors text-white text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>

          <Link
            href="/easter-egg"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/20 text-white/80 hover:bg-white/10 transition text-sm"
          >
            <Zap className="w-4 h-4" />
            Surprise me
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-400 bg-[#1E1F22] px-3 py-2 rounded-md shadow-inner border border-white/5 backdrop-blur-sm">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i === text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

function GlowSpot({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-2xl animate-pulse ${className}`}
    />
  );
}
