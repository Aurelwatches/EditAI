"use client"

import { Film, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/lib/mockUpload"
import type { VideoFile } from "@/store/videoStore"

interface FileItemProps {
  video: VideoFile
  onRemove: (id: string) => void
}

const STATUS_CONFIG = {
  pending: {
    label: "Queued",
    badgeVariant: "secondary" as const,
    icon: null,
  },
  uploading: {
    label: "Uploading",
    badgeVariant: "default" as const,
    icon: Loader2,
  },
  complete: {
    label: "Done",
    badgeVariant: "success" as const,
    icon: CheckCircle2,
  },
  error: {
    label: "Failed",
    badgeVariant: "destructive" as const,
    icon: AlertCircle,
  },
}

export function FileItem({ video, onRemove }: FileItemProps) {
  const config = STATUS_CONFIG[video.status]
  const StatusIcon = config.icon

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 animate-fade-in",
        video.status === "complete" && "border-primary/20"
      )}
    >
      {/* File icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Film className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* File info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-foreground">
            {video.name}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge variant={config.badgeVariant} className="flex items-center gap-1">
              {StatusIcon && (
                <StatusIcon
                  className={cn(
                    "h-3 w-3",
                    video.status === "uploading" && "animate-spin"
                  )}
                />
              )}
              {config.label}
            </Badge>

            {/* Remove button — only when not uploading */}
            {video.status !== "uploading" && (
              <button
                onClick={() => onRemove(video.id)}
                className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Size + progress row */}
        <div className="mt-1.5 flex items-center gap-2">
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatFileSize(video.size)}
          </span>
          {(video.status === "uploading" || video.status === "complete") && (
            <div className="flex flex-1 items-center gap-2">
              <Progress value={video.progress} className="h-1" />
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {video.progress}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
