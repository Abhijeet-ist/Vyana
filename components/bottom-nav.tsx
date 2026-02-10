"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, BarChart3, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/check-in", label: "Check-in", icon: Compass },
  { href: "/resources", label: "Resources", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t"
      style={{
        backgroundColor: "hsl(0 0% 100% / 0.92)",
        backdropFilter: "blur(16px)",
        borderColor: "hsl(33 20% 85% / 0.5)",
      }}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-content items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-colors duration-200"
              style={{
                backgroundColor: isActive
                  ? "hsl(135 12% 26%)"
                  : "transparent",
              }}
            >
              <item.icon
                className="h-5 w-5"
                strokeWidth={1.75}
                style={{
                  color: isActive
                    ? "hsl(36 33% 93%)"
                    : "hsl(135 12% 26% / 0.4)",
                }}
              />
              <span
                className="text-[10px] font-medium"
                style={{
                  color: isActive
                    ? "hsl(36 33% 93%)"
                    : "hsl(135 12% 26% / 0.4)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
