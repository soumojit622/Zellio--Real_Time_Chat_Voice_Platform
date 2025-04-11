"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { PlusCircle, ServerCog } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});

export const InitialModal = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      window.location.reload();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open>
      <DialogContent className="bg-[#1E1F22] p-0 overflow-hidden border border-[#2A2B2E] shadow-2xl rounded-2xl backdrop-blur-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-3xl text-center font-extrabold text-white flex items-center justify-center gap-2">
            <PlusCircle className="w-6 h-6 text-[#5865F2]" />
            Create Your Server
          </DialogTitle>

          <DialogDescription className="text-center text-[#B5BAC1] text-base mt-2">
            Give your server a personality with a name and image. You can always
            change it later.
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
              <div className="flex items-center justify-center flex-col gap-2">
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
                    <FormLabel className="uppercase text-xs font-semibold text-[#B5BAC1] flex items-center gap-1">
                      <ServerCog className="w-4 h-4 text-[#B5BAC1]" />
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        aria-disabled={isLoading}
                        placeholder="Enter server name"
                        className="bg-[#313338] border border-[#4E5058] text-white placeholder:text-[#6D6F78] px-4 py-2 rounded-md focus:ring-2 focus:ring-[#5865F2] transition duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-[#1E1F22] border-t border-white/5 px-6 py-4 rounded-b-xl">
              <Button
                disabled={isLoading}
                aria-disabled={isLoading}
                type="submit"
                variant="primary"
                className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold transition-all px-5 py-2 rounded-md flex items-center justify-center gap-2 shadow-lg"
              >
                <PlusCircle className="w-5 h-5" />
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
