"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    href: "/admin",
  },

  {
    title: "Destinations",
    href: "/admin/destinations",
  },

  {
    title: "Experiences",
    href: "/admin/experiences",
  },

  {
    title: "Journal",
    href: "/admin/blogs",
  },

  {
    title: "Cabs",
    href: "/admin/cabs",
  },

  {
    title: "Stays",
    href: "/admin/stays",
  },

  {
    title: "Heritage",
    href: "/admin/heritage-shop",
  },

  {
    title: "Website",
    href: "/",
  },
];

export default function AdminNavbar() {
  const pathname =
    usePathname();

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-black/5 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="h-20 flex items-center justify-between gap-10">

          <Link
            href="/admin"
            className="text-2xl whitespace-nowrap text-[#111111]"
          >
            JustTheRoutes Admin
          </Link>

          <div className="flex-1 overflow-x-auto scrollbar-hide">

            <div className="flex items-center gap-4 xl:gap-6 min-w-max">

              {links.map((item) => {
                const active =
                  pathname ===
                  item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm whitespace-nowrap transition px-4 py-2 rounded-full ${
                      active
                        ? "bg-[#1F3A32] text-white"
                        : "text-[#111111]/60 hover:text-[#111111] hover:bg-black/5"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}