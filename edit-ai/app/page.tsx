import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Film, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

const FEATURES = [
  {
    icon: Zap,
    title: "AI-powered cuts",
    desc: "Auto-detect scenes and trim silence in one click",
  },
  {
    icon: Film,
    title: "Multi-clip timeline",
    desc: "Drag, arrange, and layer clips on a flexible canvas",
  },
  {
    icon: Layers,
    title: "Smart export",
    desc: "Export for any platform — TikTok, YouTube, Reels",
  },
]

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="relative flex h-14 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Edit<span className="text-primary">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/upload">Start uploading</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          AI video editing, simplified
        </div>

        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Edit faster with{" "}
          <span className="text-primary">AI at your side</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground">
          Upload your clips, let AI do the heavy lifting. Cut, trim, caption, and
          export — in minutes, not hours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/upload" className="gap-2">
              Upload a video
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard">View dashboard</Link>
          </Button>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EditAI — All rights reserved
      </footer>
    </div>
  )
}
