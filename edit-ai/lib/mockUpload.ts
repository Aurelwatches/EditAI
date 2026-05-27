/**
 * Mock upload handler — simulates a real upload flow with progress.
 * Replace `mockUploadFile` with your real Supabase/R2 upload logic later.
 */

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Simulates uploading a file with progressive status updates.
 * @param file - The File object to upload
 * @param onProgress - Callback fired as progress advances (0–100)
 * @returns Promise resolving to an UploadResult
 */
export async function mockUploadFile(
  file: File,
  onProgress: (progress: number) => void
): Promise<UploadResult> {
  return new Promise((resolve) => {
    let progress = 0

    // Simulate variable upload speed based on file size
    const chunkSize = Math.max(2, Math.min(15, Math.floor(file.size / 500_000)))
    const intervalMs = 80

    const interval = setInterval(() => {
      progress = Math.min(progress + chunkSize + Math.random() * 3, 99)
      onProgress(Math.floor(progress))

      if (progress >= 99) {
        clearInterval(interval)

        // Simulate brief finalization delay
        setTimeout(() => {
          onProgress(100)
          resolve({
            success: true,
            url: `https://mock-storage.edit-ai.dev/${encodeURIComponent(file.name)}`,
          })
        }, 300)
      }
    }, intervalMs)
  })
}

/**
 * Generates a unique ID for tracking files.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Returns a human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

/**
 * Returns the accepted MIME types for video upload.
 */
export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
  "video/x-matroska",
]

export const ACCEPTED_VIDEO_EXTENSIONS = ".mp4,.mov,.avi,.webm,.mkv"

/**
 * Max file size: 2 GB
 */
export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024
