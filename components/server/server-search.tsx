"use client";

import { Search, SearchX, type LucideIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, type ReactElement, useEffect } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type ServerSearchProps = {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: ReactElement<LucideIcon> | null;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
};

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member")
      router.push(`/servers/${params?.serverId}/conversations/${id}`);
    if (type === "channel")
      router.push(`/servers/${params?.serverId}/channels/${id}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full flex items-center gap-3 px-4 py-2 rounded-md transition bg-transparent hover:bg-[#2e2f31] dark:hover:bg-[#3c3f41]"
      >
        <Search className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors duration-200" />

        <p className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-200">
          Search
        </p>

        <kbd
          title="Press Ctrl/Cmd + K to open search modal"
          className="ml-auto text-[10px] font-mono font-medium text-zinc-400 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 rounded px-2 py-[2px] bg-zinc-200 dark:bg-zinc-800/60 group-hover:border-white group-hover:text-white group-hover:bg-zinc-700/40 transition-all duration-200"
        >
          Ctrl/Cmd + K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search channels, users, or messages..."
          className="focus:outline-none focus:ring-0 text-sm placeholder:text-zinc-500 text-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 px-3 py-2 border-b border-zinc-200 dark:border-zinc-700"
        />
        <CommandList className="max-h-80 overflow-y-auto">
          <CommandEmpty className="flex items-center justify-center gap-2 p-4 text-sm text-zinc-500 dark:text-zinc-400">
            <SearchX className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            <span>No results found.</span>
          </CommandEmpty>

          {data.map(({ label, type, data: subData }) => {
            if (!subData?.length) return null;

            return (
              <CommandGroup key={label}>
                <div className="px-3 pt-3 pb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  {label}
                </div>
                {subData.map(({ id, icon, name }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => onClick({ id, type })}
                    className="flex items-center px-3 py-2 rounded-md text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    {icon}
                    <span className="ml-3 truncate">{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
