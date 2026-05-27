"use client"

import Link from "next/link"
import { Upload, Film, Clock, HardDrive, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/upload/VideoCard"
import { useVideoStore } from "@/store/videoStore"
import { formatFileSize } from "@/lib/mockUpload"

export default function DashboardPage() {
  const { videos, removeVideo } = useVideoStore()

  const completedVideos = videos.filter((v) => v.status === "complete")
  const totalSize = videos.reduce((acc, v) => acc + v.size, 0)
  const recentCount = videos.filter((v) => {
    const dayAgo = Date.now() - 1000 * 60 * 60 * 24
    return new Date(v.uploadedAt).getTime() > dayAgo
  }).length

  const STATS = [
    {
      label: "Total clips",
      value: completedVideos.length,
      icon: Film,
      sub: `${videos.length} total`,
    },
    {
      label: "Storage used",
      value: formatFileSize(totalSize),
      icon: HardDrive,
      sub: "across all clips",
    },
    {
      label: "Recent uploads",
      value: recentCount,
      icon: Clock,
      sub: "in the last 24h",
    },
  ]

  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ label, value, icon: Icon, sub }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold tabular-nums text-foreground">
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-[10px] text-muted-foreground/60">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Clips section */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Your clips</h2>
          <Button size="sm" asChild>
            <Link href="/upload" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Upload
            </Link>
          </Button>
        </div>

        {completedVideos.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No clips yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload your first video to get started
            </p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/upload">Upload a clip</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {completedVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDelete={removeVideo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
