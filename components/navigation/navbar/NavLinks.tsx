"use client";
import React, { use } from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300",
              "flex items-center justify-start gap-4 bg-transparent p-4 "
            )}
            href={item.route}
            key={item.label}
          >
            <Image
              className={cn({ "invert-colors": !isActive })}
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose key={item.route} asChild>
            {LinkComponent}
          </SheetClose>
        ) : (
          <div key={item.route}>{LinkComponent}</div>
        );
      })}
    </>
  );
};

export default NavLinks;
