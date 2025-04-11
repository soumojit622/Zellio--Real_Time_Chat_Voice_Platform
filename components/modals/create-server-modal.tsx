"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { PlusCircle, Server, ServerCog } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createServer";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden bg-[#2b2d31] border border-white/10 shadow-xl rounded-lg backdrop-blur-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-extrabold text-white drop-shadow-md flex items-center justify-center gap-2">
            <Server className="w-6 h-6 text-[#5865F2]" />
            Create your server
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-400">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            autoCapitalize="off"
            autoComplete="off"
          >
            <div className="space-y-8 px-6">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 tracking-wide flex items-center gap-1">
                      <ServerCog className="w-4 h-4" />
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        className="dark:bg-zinc-700/40 bg-zinc-100/10 border border-zinc-600 placeholder:text-zinc-400 text-white focus:ring-2 focus:ring-[#5865F2] focus:outline-none"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="px-6 py-4 bg-[#1e1f22] border-t border-white/5">
              <Button
                disabled={isLoading}
                aria-disabled={isLoading}
                variant="primary"
                className="bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold transition-colors px-5 py-2 rounded-md flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
