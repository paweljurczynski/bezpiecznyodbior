import { SiteShell } from "@/components/SiteShell";

export default function SklepLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="pl">{children}</SiteShell>;
}
