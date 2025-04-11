"use client";

import { type ChannelType, MemberRole } from "@prisma/client";
import { Plus, PlusCircle, Settings } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";

type ServerSectionProps = {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-3 px-1">
      <p className="text-[14px] tracking-widest uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
          >
            <PlusCircle className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
          >
            <Settings className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
