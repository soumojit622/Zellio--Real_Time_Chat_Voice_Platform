import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import { appFileRouter } from "./api/uploadthing/core";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#5865F2",
};
export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#7289DA",
          colorBackground: "#0E0F12",
          colorInputBackground: "#1A1C1F",
          colorInputText: "#F0F1F3",
        },
        layout: {
          logoImageUrl: "/download.svg",
        },
        elements: {
          card: "bg-[#111214] border border-[#2A2B2E] shadow-xl rounded-2xl backdrop-blur-sm",
          formButtonPrimary:
            "bg-[#7289DA] hover:bg-[#5b6eae] text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out shadow-md",
          headerTitle: "text-white text-3xl font-bold tracking-wide",
          headerSubtitle: "text-[#AAB1C1] text-base",
          socialButtonsBlockButton:
            "bg-[#1B1D21] hover:bg-[#2C2E32] text-white border border-[#35373B] transition duration-300 ease-in-out rounded-lg",
          formFieldLabel: "text-[#8D9096] font-medium",
          formFieldInput:
            "bg-[#1A1C1F] border border-[#303236] text-white placeholder:text-[#6A6D72] rounded-md px-4 py-2 focus:ring-2 focus:ring-[#7289DA] transition-all duration-200",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
            storageKey="zellio"
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(appFileRouter)} />
            <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
