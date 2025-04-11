"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Copy, Link, MailPlus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { ActionTooltip } from "../action-tooltip";
import { useOrigin } from "@/hooks/use-origin";

export const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "invite";

  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden rounded-xl bg-[#2B2D31] text-white shadow-2xl border border-zinc-700">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-3xl font-bold text-center text-white tracking-wide flex items-center justify-center gap-x-2">
            <MailPlus className="w-7 h-7 text-indigo-500" />
            Invite Friends
          </DialogTitle>
          <p className="text-md text-center text-zinc-400 mt-1">
            Share the link to let others join your server.
          </p>
        </DialogHeader>

        <div className="p-6">
          <Label className="uppercase text-[13px] font-bold text-zinc-400 tracking-wider flex items-center gap-x-1">
            <Link className="w-4 h-4" />
            Server invite link
          </Label>

          <div className="flex items-center mt-3 gap-x-3">
            <Input
              className="flex-1 bg-[#1E1F22] border border-zinc-700 rounded-md px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              tabIndex={-1}
              value={inviteUrl}
              disabled={isLoading}
              aria-disabled
            />
            <ActionTooltip
              side="left"
              align="end"
              label={copied ? "Copied!" : "Copy to clipboard"}
            >
              <Button
                disabled={isLoading}
                onClick={onCopy}
                size="icon"
                className={`bg-[#313338] hover:bg-[#3E4045] text-white transition rounded-md p-2 ${
                  copied ? "animate-pulse" : ""
                }`}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </ActionTooltip>
          </div>

          <div className="text-right">
            <Button
              disabled={isLoading}
              onClick={onNew}
              variant="link"
              size="sm"
              className="text-sm mt-4 text-zinc-400 hover:text-zinc-300 transition inline-flex items-center gap-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              Generate a new link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
