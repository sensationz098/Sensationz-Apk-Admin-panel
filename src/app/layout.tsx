import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Providers } from "./Provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export const metadata: Metadata = {
  title: "MyApp",
  description: "Next.js 16 + Tailwind example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
                   
      <main>
         <Providers>        
          <Header></Header>
   {children}</Providers>
       </main>
      </body>
    </html>
  );
}


   

