import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UploadStatus = "pending" | "uploading" | "complete" | "error"

export interface VideoFile {
  id: string
  name: string
  size: number
  type: string
  duration?: number
  thumbnailUrl?: string
  uploadedAt: string
  status: UploadStatus
  progress: number
}

interface VideoStore {
  videos: VideoFile[]
  addVideo: (video: VideoFile) => void
  updateVideoProgress: (id: string, progress: number) => void
  updateVideoStatus: (id: string, status: UploadStatus) => void
  removeVideo: (id: string) => void
  clearAll: () => void
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videos: [],

      addVideo: (video) =>
        set((state) => ({
          videos: [video, ...state.videos],
        })),

      updateVideoProgress: (id, progress) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id ? { ...v, progress } : v
          ),
        })),

      updateVideoStatus: (id, status) =>
        set((state) => ({
          videos: state.videos.map((v) =>
            v.id === id ? { ...v, status } : v
          ),
        })),

      removeVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        })),

      clearAll: () => set({ videos: [] }),
    }),
    {
      name: "edit-ai-videos",
    }
  )
)
