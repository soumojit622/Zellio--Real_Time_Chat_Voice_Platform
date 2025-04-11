"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Trash2, XCircle } from "lucide-react";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteServer";

  const { server } = data;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push("/");
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden rounded-xl shadow-xl bg-[#2B2D31] text-white border border-[#1E1F22]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-3xl text-center font-extrabold text-rose-500 tracking-wide flex items-center justify-center gap-2">
            <Trash2 className="w-7 h-7 text-rose-500" />
            Delete Server
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-400 mt-3 leading-relaxed">
            This action cannot be undone. <br />
            You're about to permanently delete{" "}
            <span className="text-indigo-400 font-semibold">
              {server?.name} <span className="text-zinc-400">Server</span>
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-[#1E1F22] px-6 py-5 mt-4 border-t border-[#3F4147]">
          <div className="flex items-center justify-between w-full gap-4">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
              className="flex-1 bg-[#313338] text-zinc-300 hover:bg-[#3A3C41] hover:text-white transition-colors px-4 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="destructive"
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Confirm Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
