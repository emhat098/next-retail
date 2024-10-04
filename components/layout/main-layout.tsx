import { FC, PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500","700", "900"]
});

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body className={roboto.className}>
        <Navbar />
        <main className="flex flex-col h-screen bg-gray-100 p-4">
          {children}
        </main>
      </body>
    </html>
  )
} 

export default MainLayout;