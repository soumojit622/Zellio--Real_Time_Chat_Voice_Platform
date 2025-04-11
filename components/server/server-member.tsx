"use client";

import {
  MemberRole,
  type Member,
  type Profile,
  type Server,
} from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
        "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
        params?.memberId === member.id && "bg-zinc-200 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        alt={member.profile.name}
        className="h-9 w-9 ring-1 ring-zinc-300 dark:ring-zinc-600 rounded-full"
      />

      <p
        className={cn(
          "text-sm font-medium truncate transition-colors",
          "text-zinc-600 group-hover:text-zinc-800 dark:text-zinc-300 dark:group-hover:text-white",
          params?.memberId === member.id && "text-primary dark:text-white"
        )}
      >
        {member.profile.name}
      </p>

      <div className="ml-auto text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition">
        {icon}
      </div>
    </button>
  );
};
