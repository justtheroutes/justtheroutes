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
    title: "Blogs",
    href: "/admin/blogs",
  },

  {
    title: "Website",
    href: "/",
  },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-black/5 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

        <Link
          href="/admin"
          className="text-2xl text-[#111111]"
        >
          JustTheRoutes Admin
        </Link>

        <div className="flex items-center gap-6">

          {links.map((item) => {
            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
                  active
                    ? "text-[#111111]"
                    : "text-[#111111]/60 hover:text-[#111111]"
                }`}
              >
                {item.title}
              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
}