"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LinkType } from "@/abstract/interface";
import { useSession } from "next-auth/react";

const Nav = ({ links }: { links: LinkType[] }) => {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  return (
    <>
      <div className="flex gap-8 mr-5">
        {links.map((link, index) => {
          const { href, label } = link;
          return (
            <Link
              key={index}
              href={href}
              className={`${
                link.href === pathname && "text-accent border-b-2 border-accent"
              } capitalize font-medium text-lg hover:text-accent hover:border-accent transition-all duration-300 ease-in-out`}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5">
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
        <Button className="bg-primary ring-1 ring-accent shadow-md shadow-accent hover:bg-accent transition-all duration-500 ease-in-out">
          Find Materials
        </Button>
      </div>
    </>
  );
};

export default Nav;
