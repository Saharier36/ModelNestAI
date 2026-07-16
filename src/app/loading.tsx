import { FiCpu } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-500" />
        <FiCpu className="h-6 w-6 text-orange-500" />
      </div>

      <div className="flex items-center gap-2 font-heading text-lg font-bold">
        ModelNest<span className="text-orange-500">AI</span>
      </div>

      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}
