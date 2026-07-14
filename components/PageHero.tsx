import Image from "next/image";
import { cn } from "@/lib/utils";
import { DEFAULT_HERO_IMAGE } from "@/lib/image";

type PageHeroProps = {
  imageSrc?: string;
  imageAlt: string;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
};

export function PageHero({
  imageSrc = DEFAULT_HERO_IMAGE,
  imageAlt,
  priority = true,
  className,
  contentClassName,
  children,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={70}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className={cn("container-page relative", contentClassName)}>{children}</div>
    </section>
  );
}
