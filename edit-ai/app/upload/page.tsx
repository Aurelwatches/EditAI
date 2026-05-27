"use client"

import { useCallback } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { DropZone } from "@/components/upload/DropZone"
import { FileList } from "@/components/upload/FileList"
import { Button } from "@/components/ui/button"
import { useVideoStore } from "@/store/videoStore"
import { mockUploadFile, generateId } from "@/lib/mockUpload"
import type { VideoFile } from "@/store/videoStore"

export default function UploadPage() {
  const { videos, addVideo, updateVideoProgress, updateVideoStatus, removeVideo, clearAll } =
    useVideoStore()

  const isUploading = videos.some((v) => v.status === "uploading")

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      // Build initial records and add to store
      const newVideos: VideoFile[] = files.map((file) => ({
        id: generateId(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        status: "pending",
        progress: 0,
      }))

      // Add all at once so they appear immediately
      newVideos.forEach((v) => addVideo(v))

      // Upload each file concurrently
      await Promise.all(
        newVideos.map(async (videoRecord, i) => {
          const file = files[i]

          // Small stagger so UI isn't jarring
          await new Promise((r) => setTimeout(r, i * 120))

          updateVideoStatus(videoRecord.id, "uploading")

          try {
            await mockUploadFile(file, (progress) => {
              updateVideoProgress(videoRecord.id, progress)
            })
            updateVideoStatus(videoRecord.id, "complete")
          } catch {
            updateVideoStatus(videoRecord.id, "error")
          }
        })
      )
    },
    [addVideo, updateVideoProgress, updateVideoStatus]
  )

  const hasCompletedVideos = videos.some((v) => v.status === "complete")

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Page title */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-foreground">Upload videos</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Add clips to your library — MP4, MOV, WebM and more
        </p>
      </div>

      {/* Drop zone */}
      <DropZone onFilesSelected={handleFilesSelected} disabled={isUploading} />

      {/* File list */}
      <FileList
        videos={videos}
        onRemove={removeVideo}
        onClearAll={clearAll}
      />

      {/* CTA after uploads complete */}
      {hasCompletedVideos && !isUploading && (
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4 animate-fade-in">
          <p className="text-xs text-muted-foreground">
            {videos.filter((v) => v.status === "complete").length} clip(s) ready
          </p>
          <Button size="sm" asChild>
            <Link href="/dashboard" className="gap-1.5">
              Go to Dashboard
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
