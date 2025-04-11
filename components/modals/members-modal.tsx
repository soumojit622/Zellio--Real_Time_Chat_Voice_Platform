"use client";

import { MemberRole } from "@prisma/client";
import axios from "axios";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const MembersModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-xl bg-[#2B2D31] text-white shadow-2xl border border-zinc-700">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-3xl text-center font-bold tracking-wide">
            Manage Members
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-400 mt-1 text-sm">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-6 max-h-[420px] px-6 pr-4">
          {server?.members?.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-x-3 mb-6 rounded-md px-3 py-2 bg-[#1E1F22] border border-transparent hover:border-zinc-600 transition"
            >
              <UserAvatar
                alt={member.profile.name}
                src={member.profile.imageUrl}
                className="h-8 w-8"
              />

              <div className="flex flex-col gap-y-1">
                <div className="text-sm font-semibold flex items-center gap-x-1">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>

                <p className="text-xs text-zinc-400">{member.profile.email}</p>
              </div>

              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4 text-zinc-400 hover:text-zinc-200" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        side="left"
                        className="bg-[#1E1F22] border border-zinc-700 text-white shadow-md"
                      >
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center text-sm">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>

                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-[#1E1F22] border border-zinc-700">
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                                className="flex items-center gap-2 text-sm hover:bg-zinc-700"
                              >
                                <Shield className="h-4 w-4" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto text-green-500" />
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                                className="flex items-center gap-2 text-sm hover:bg-zinc-700"
                              >
                                <ShieldCheck className="h-4 w-4" />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto text-green-500" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator className="bg-zinc-600" />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                          className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-500/10"
                        >
                          <Gavel className="h-4 w-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-400 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
