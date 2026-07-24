import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

type Props = {
  size?: number;
  withText?: boolean;
  className?: string;
  href?: string | null;
  onClick?: () => void;
};

export function Logo({ size = 40, withText = true, className = "", href = "/", onClick }: Props) {
  const content = (
    <>
      <Image
        src="/logo/logo-square.webp"
        alt={`${site.name} — logo`}
        width={size}
        height={size}
        className="h-auto shrink-0"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span className="hidden font-display text-lg font-bold tracking-tight text-brand md:inline">
          {site.name}
        </span>
      )}
    </>
  );

  if (href === null) {
    return <div className={`flex items-center gap-2 ${className}`}>{content}</div>;
  }

  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2 ${className}`} aria-label={site.name}>
      {content}
    </Link>
  );
}
