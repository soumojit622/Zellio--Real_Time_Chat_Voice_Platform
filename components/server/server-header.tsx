"use client";

import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Server,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";

type ServerHeaderProps = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center gap-2 h-12 border-neutral-200 dark:border-zinc-800 border-b dark:border-b-[1px] hover:bg-[#313338] transition text-white">
          <Server className="h-5 w-5 text-zinc-400" /> {/* Lucide icon here */}
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto text-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2 rounded-md bg-[#1e1f22] shadow-xl ring-1 ring-black/5 focus:outline-none text-sm text-zinc-300">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="px-3 py-2 flex justify-between items-center cursor-pointer 
                     bg-transparent hover:bg-[#5865F2]/20 !text-indigo-400 transition-colors duration-150"
          >
            Invite People
            <UserPlus className="h-4 w-4 !text-indigo-400" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 hover:bg-zinc-700/50 text-zinc-300 flex justify-between items-center cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-4 text-zinc-400" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="px-3 py-2 hover:bg-zinc-700/50 text-zinc-300 flex justify-between items-center cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 text-zinc-400" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="px-3 py-2 hover:bg-zinc-700/50 text-zinc-300 flex justify-between items-center cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 text-zinc-400" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator className="bg-zinc-700/50" />}

        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="px-3 py-2 flex items-center justify-between gap-2 cursor-pointer transition-colors duration-200 bg-transparent hover:bg-rose-500/20 text-rose-500 hover:text-rose-500 font-medium rounded-md"
          >
            <span className="text-rose-500">Delete Server</span>
            <Trash className="h-4 w-4 text-rose-500" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="px-3 py-2 flex items-center gap-2 cursor-pointer bg-transparent hover:bg-rose-500/10 transition"
          >
            <LogOut className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-500">
              Leave Server
            </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
