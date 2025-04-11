import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/clerk/user-button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NavigationItem } from "./navigation-item";
import { NavigationAction } from "./navigation-action";


export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <Link href="/">
        <Image
          src="/download.svg"
          alt="Zellio"
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <NavigationAction />

      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <SignedIn>
          <div className="hidden md:block">
            <UserButton />
          </div>

          <SignOutButton>
            <button
              className="md:hidden hover:bg-background/30 p-2.5 rounded-md"
              title="Log out"
            >
              <LogOut className="h-5 w-5 cursor-pointer" />
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};
