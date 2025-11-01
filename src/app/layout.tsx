import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { Providers } from "./Provider";


export const metadata: Metadata = {
  title: "Course App Dashboard",
  description: "Course App Dashboard",
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


   

