"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  LayoutDashboard,
  Upload,
  Sparkles,
  Settings,
  HelpCircle,
} from "lucide-react"

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload", href: "/upload", icon: Upload },
]

const BOTTOM_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-14 flex-col border-r border-border bg-card lg:w-52">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-3 lg:px-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="hidden text-sm font-semibold tracking-tight lg:block">
          Edit<span className="text-primary">AI</span>
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex h-9 items-center gap-3 rounded-md px-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span className="hidden lg:block">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="flex flex-col gap-1 border-t border-border p-2">
        {BOTTOM_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex h-9 items-center gap-3 rounded-md px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden lg:block">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
