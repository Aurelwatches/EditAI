"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import { ACCEPTED_VIDEO_EXTENSIONS, ACCEPTED_VIDEO_TYPES, MAX_FILE_SIZE } from "@/lib/mockUpload"

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function DropZone({ onFilesSelected, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFiles = (files: FileList | File[]): File[] => {
    const fileArray = Array.from(files)
    const valid: File[] = []
    const errors: string[] = []

    for (const file of fileArray) {
      if (!ACCEPTED_VIDEO_TYPES.includes(file.type) && !file.name.match(/\.(mp4|mov|avi|webm|mkv)$/i)) {
        errors.push(`"${file.name}" is not a supported video format`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`"${file.name}" exceeds the 2 GB limit`)
        continue
      }
      valid.push(file)
    }

    if (errors.length > 0) {
      setError(errors[0])
      setTimeout(() => setError(null), 4000)
    }

    return valid
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (disabled) return

      const files = validateFiles(e.dataTransfer.files)
      if (files.length > 0) onFilesSelected(files)
    },
    [disabled, onFilesSelected]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const files = validateFiles(e.target.files)
      if (files.length > 0) onFilesSelected(files)
      // Reset so same file can be re-selected
      e.target.value = ""
    },
    [onFilesSelected]
  )

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={disabled}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 text-center transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-card hover:border-muted-foreground/40 hover:bg-secondary/30",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200",
            isDragging ? "bg-primary/20 scale-110" : "bg-secondary"
          )}
        >
          {isDragging ? (
            <Film className="h-7 w-7 text-primary animate-pulse-slow" />
          ) : (
            <Upload className="h-7 w-7 text-muted-foreground" />
          )}
        </div>

        {/* Text */}
        <p className="mb-1 text-sm font-medium text-foreground">
          {isDragging ? "Drop your videos here" : "Drag & drop videos here"}
        </p>
        <p className="text-xs text-muted-foreground">
          or{" "}
          <span className="text-primary underline underline-offset-2">
            browse files
          </span>
        </p>

        {/* Meta */}
        <p className="mt-4 text-xs text-muted-foreground/60">
          MP4, MOV, AVI, WebM, MKV · Up to 2 GB each · Multiple files supported
        </p>
      </button>

      {/* Error */}
      {error && (
        <p className="mt-2 text-xs text-destructive animate-fade-in">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_VIDEO_EXTENSIONS}
        multiple
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  )
}
