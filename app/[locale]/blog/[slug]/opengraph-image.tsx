import { ImageResponse } from "next/og";
import sharp from "sharp";
import { join } from "path";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ locale: "pl", slug: p.slug }));
}

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  const logoPng = await sharp(join(process.cwd(), "public/logo/logo-square.webp"))
    .resize(40, 40)
    .png()
    .toBuffer();
  const logoSrc = `data:image/png;base64,${logoPng.toString("base64")}`;

  const title = post?.title ?? "Blog";
  const category = post?.category ?? "Artykuł";
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              background: "#d4881a22",
              border: "1px solid #d4881a55",
              borderRadius: 6,
              padding: "6px 14px",
              color: "#d4881a",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {category}
          </div>
          {readingTime && (
            <span style={{ color: "#666666", fontSize: 16 }}>
              {readingTime} czytania
            </span>
          )}
        </div>

        <span
          style={{
            color: "#ffffff",
            fontSize: title.length > 60 ? 42 : 50,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
            maxWidth: 900,
          }}
        >
          {title}
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333333",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={logoSrc} width={40} height={40} style={{ borderRadius: 6 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ color: "#ffffff", fontSize: 18, fontWeight: 700 }}>
                Bezpieczny Odbiór
              </span>
              <span style={{ color: "#666666", fontSize: 15 }}>
                bezpiecznyodbior.pl
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#d4881a", fontSize: 18, fontWeight: 700 }}>
              5.0 / 5
            </span>
            <span style={{ color: "#aaaaaa", fontSize: 16 }}>
              · {site.reviews.count} opinii Google
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
