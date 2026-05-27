"use client"

import { Film, MoreHorizontal, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/lib/mockUpload"
import type { VideoFile } from "@/store/videoStore"
import { useState } from "react"

interface VideoCardProps {
  video: VideoFile
  onDelete: (id: string) => void
}

export function VideoCard({ video, onDelete }: VideoCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const uploadedDate = new Date(video.uploadedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-border/80 hover:shadow-lg hover:shadow-black/20">
      {/* Thumbnail placeholder */}
      <div className="relative flex h-36 items-center justify-center bg-secondary/60">
        <Film className="h-10 w-10 text-muted-foreground/30" />

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
            Open Editor
          </button>
        </div>

        {/* Status badge */}
        <div className="absolute right-2 top-2">
          <Badge
            variant={video.status === "complete" ? "success" : "secondary"}
            className="text-[10px]"
          >
            {video.status === "complete" ? "Ready" : video.status}
          </Badge>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">
            {video.name}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatFileSize(video.size)} · {uploadedDate}
          </p>
        </div>

        {/* Actions menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              menuOpen
                ? "bg-secondary text-foreground"
                : "text-muted-foreground opacity-0 hover:bg-secondary hover:text-foreground group-hover:opacity-100"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 w-36 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <button
                  onClick={() => {
                    onDelete(video.id)
                    setMenuOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
