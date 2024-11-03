"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { RiMenu3Line } from "react-icons/ri";
import Link from "next/link";
import { Button } from "../ui/button";
import { LinkType } from "@/abstract/interface";
import { useSession } from "next-auth/react";

export default function MobileNav({ links }: { links: LinkType[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <RiMenu3Line className="w-8 h-8 text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center" aria-describedby="">
        <SheetTitle className="hidden">Menu</SheetTitle>
        <div className="mt-16 mb-16 text-center text-2xl">
          <Link href="/">
            <h1 className="text-2xl font-bold">
              The Educative <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            const { href, label } = link;
            return (
              <Link
                key={index}
                href={href}
                className={`${
                  link.href === pathname &&
                  "text-accent border-b-2 border-accent"
                } capitalize font-medium text-lg hover:text-accent hover:border-accent transition-all duration-300 ease-in-out`}
              >
                {label}
              </Link>
            );
          })}

          {
            session.status === "authenticated" ? (
              <Button
                onClick={() => {
                  router.push("/api/auth/signout");
                }}
                className="bg-transparent hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign out
              </Button>
            ) : (
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                className="bg-transparent hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign in
              </Button>
            )
          }

          <Button className="bg-primary ring-1 ring-accent shadow-md shadow-accent hover:bg-accent transition-all duration-500 ease-in-out ">
            Find Materials
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
