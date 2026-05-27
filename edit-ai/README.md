# Edit AI

A production-ready Next.js video editing app scaffold with AI-ready architecture.

## Tech Stack

- **Next.js 14** (App Router)
- **TailwindCSS** — utility-first styling
- **Shadcn-style UI components** — Progress, Button, Badge (built from scratch, no CLI dependency)
- **Zustand** — lightweight global state with `localStorage` persistence
- **TypeScript** — strict mode throughout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
edit-ai/
├── app/
│   ├── layout.tsx            # Root layout with Geist font
│   ├── globals.css           # Design tokens + Tailwind base
│   ├── page.tsx              # Landing / home page
│   ├── dashboard/
│   │   ├── layout.tsx        # Uses AppShell
│   │   └── page.tsx          # Stats + video grid
│   └── upload/
│       ├── layout.tsx        # Uses AppShell
│       └── page.tsx          # Drag-and-drop upload flow
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx      # Sidebar + TopBar wrapper
│   │   ├── Sidebar.tsx       # Collapsible nav sidebar
│   │   └── TopBar.tsx        # Page header bar
│   ├── ui/
│   │   ├── button.tsx        # CVA-based button
│   │   ├── badge.tsx         # Status badge
│   │   └── progress.tsx      # Upload progress bar (Radix)
│   └── upload/
│       ├── DropZone.tsx      # Drag-and-drop + file picker
│       ├── FileItem.tsx      # Individual file row with progress
│       ├── FileList.tsx      # File list wrapper
│       └── VideoCard.tsx     # Dashboard clip card
│
├── store/
│   └── videoStore.ts         # Zustand store (persisted)
│
└── lib/
    ├── mockUpload.ts         # Mock upload handler (swap for Supabase/R2)
    └── utils.ts              # cn() helper
```

## Swapping the Mock Upload

All upload logic lives in `lib/mockUpload.ts`. To connect real storage:

1. Replace `mockUploadFile()` with your actual upload function (Supabase Storage, Cloudflare R2, S3, etc.)
2. Update `VideoFile` in `store/videoStore.ts` to include a `storageUrl` field
3. Persist video metadata to your database instead of (or alongside) localStorage

```typescript
// lib/mockUpload.ts → replace with:
import { createClient } from "@supabase/supabase-js"

export async function uploadFile(file: File, onProgress: (n: number) => void) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, ...)
  const { data, error } = await supabase.storage
    .from("videos")
    .upload(file.name, file)
  // ...
}
```

## Design System

| Token | Value |
|---|---|
| Background | `hsl(0 0% 4%)` — near-black |
| Primary | `hsl(142 71% 45%)` — green accent |
| Card | `hsl(0 0% 7%)` |
| Border | `hsl(0 0% 13%)` |
| Muted | `hsl(0 0% 55%)` |

All tokens are defined as CSS variables in `app/globals.css`.

## Roadmap (next steps)

- [ ] Connect Supabase Storage for real uploads
- [ ] Add video thumbnail generation (ffmpeg/wasm)
- [ ] Build timeline editor canvas
- [ ] Add AI transcription via Whisper
- [ ] Export / render pipeline
