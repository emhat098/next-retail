import { FC, PropsWithChildren } from "react";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/navbar/navbar";
import ShoppingCartProvider from "@/providers/shopping-cart-provider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500","700", "900"]
});

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body className={roboto.className}>
        <ShoppingCartProvider>
          <Navbar />
          <main className="flex flex-col bg-gray-100 p-4">
            {children}
          </main>
        </ShoppingCartProvider>
        <Toaster duration={2000} position={'top-right'} />
      </body>
    </html>
  )
} 

export default MainLayout;