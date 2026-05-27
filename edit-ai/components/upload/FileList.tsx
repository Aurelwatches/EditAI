"use client"

import { Trash2 } from "lucide-react"
import { FileItem } from "./FileItem"
import { Button } from "@/components/ui/button"
import type { VideoFile } from "@/store/videoStore"

interface FileListProps {
  videos: VideoFile[]
  onRemove: (id: string) => void
  onClearAll: () => void
}

export function FileList({ videos, onRemove, onClearAll }: FileListProps) {
  if (videos.length === 0) return null

  const completedCount = videos.filter((v) => v.status === "complete").length
  const uploadingCount = videos.filter((v) => v.status === "uploading").length

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            Files ({videos.length})
          </span>
          {uploadingCount > 0 && (
            <span className="text-xs text-muted-foreground">
              · {uploadingCount} uploading
            </span>
          )}
          {completedCount > 0 && uploadingCount === 0 && (
            <span className="text-xs text-primary">
              · {completedCount} complete
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear all
        </Button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`stagger-${Math.min(index + 1, 5)}`}
            style={{ animationFillMode: "forwards" }}
          >
            <FileItem video={video} onRemove={onRemove} />
          </div>
        ))}
      </div>
    </div>
  )
}
