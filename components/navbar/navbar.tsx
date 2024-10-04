'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Package, ShoppingCart, Users, Settings, Menu } from "lucide-react";
import { FC, PropsWithChildren, useState } from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Next Retail</h1>
      <Sheet modal={true} open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            {"The application navigations"}
          </SheetDescription>
          <nav className="flex flex-col mt-4" onClick={() => setOpen(!isOpen)}>
            <NavItem
              href="/products"
              icon={<Package className="mr-2 h-4 w-4" />}
            >
              {"Products"}
            </NavItem>
            <NavItem
              href="/orders"
              icon={<ShoppingCart className="mr-2 h-4 w-4" />}
            >
              {"Orders"}
            </NavItem>
            <NavItem
              href="/customers"
              icon={<Users className="mr-2 h-4 w-4" />}
            >
              {"Customers"}
            </NavItem>
            <NavItem
              href="/settings"
              icon={<Settings className="mr-2 h-4 w-4" />}
            >
              {"Settings"}
            </NavItem>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

interface NavItemProps extends PropsWithChildren {
  href: string;
  icon: React.ReactElement;
}

const NavItem: FC<NavItemProps> = ({ href, icon, children }) => {
  return (
    <Link href={href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export default Navbar;