import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-14 lg:pl-52">
        <TopBar />
        <main className="flex-1 overflow-y-auto scrollbar-none">
          {children}
        </main>
      </div>
    </div>
  )
}
