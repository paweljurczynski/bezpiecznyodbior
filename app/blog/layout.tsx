import { SiteShell } from "@/components/SiteShell";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="pl">{children}</SiteShell>;
}
