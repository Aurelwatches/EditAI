"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/upload": "Upload",
}

export function TopBar() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? "Edit AI"

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm">
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-7 w-7 rounded-full bg-primary/20 ring-1 ring-primary/30" />
      </div>
    </header>
  )
}
