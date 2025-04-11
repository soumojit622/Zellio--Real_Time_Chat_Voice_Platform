"use client";

import {
  ChannelType,
  type Channel,
  MemberRole,
  type Server,
} from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ActionTooltip } from "@/components/action-tooltip";
import { type ModalType, useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

type ServerChannelProps = {
  channel: Channel;
  server: Server;
  role?: MemberRole;
};

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all",
        "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
        params?.channelId === channel.id && "bg-zinc-200 dark:bg-zinc-700"
      )}
    >
      <Icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />

      <p
        className={cn(
          "text-sm font-medium truncate transition-colors",
          "text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300",
          params?.channelId === channel.id &&
            "text-primary dark:text-white group-hover:text-primary"
        )}
      >
        {channel.name}
      </p>

      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "editChannel")}
              className="w-4 h-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-opacity opacity-0 group-hover:opacity-100"
            />
          </ActionTooltip>

          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="w-4 h-4 text-zinc-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400 transition-opacity opacity-0 group-hover:opacity-100"
            />
          </ActionTooltip>
        </div>
      )}

      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-400 dark:text-zinc-500" />
      )}
    </button>
  );
};
