import { Star } from "lucide-react";
import { site } from "@/lib/site";

function GoogleLogoSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

type Variant = "full" | "compact";

export function GoogleReviewsBadge({ variant = "full" }: { variant?: Variant }) {
  if (variant === "compact") {
    return (
      <a
        href={site.socials.google}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-sm transition-shadow hover:shadow-elegant"
      >
        <GoogleLogoSvg className="h-4 w-4 shrink-0" />
        <div className="flex items-center gap-0.5 text-[#FBBC05]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <span className="font-semibold text-foreground">
          {site.reviews.rating.toFixed(1)}
        </span>
        <span className="text-muted-foreground">
          ({site.reviews.count} opinii)
        </span>
      </a>
    );
  }

  return (
    <a
      href={site.socials.google}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-elegant"
    >
      <GoogleLogoSvg className="h-8 w-8 shrink-0" />
      <div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[#FBBC05]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-bold text-foreground">
            {site.reviews.rating.toFixed(1)}/5
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {site.reviews.count} opinii w Google
        </p>
      </div>
      <span className="ml-2 text-xs font-medium text-brand underline-offset-2 group-hover:underline">
        Zobacz opinie →
      </span>
    </a>
  );
}
