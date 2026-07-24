import { ImageResponse } from "next/og";
import sharp from "sharp";
import { join } from "path";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function OgImage() {
  const logoPng = await sharp(join(process.cwd(), "public/logo/logo-square.webp"))
    .resize(48, 48)
    .png()
    .toBuffer();
  const logoSrc = `data:image/png;base64,${logoPng.toString("base64")}`;

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
          <img
            src={logoSrc}
            width={48}
            height={48}
            style={{ borderRadius: 8 }}
          />
          <span style={{ color: "#ffffff", fontSize: 24, fontWeight: 700 }}>
            Bezpieczny Odbiór
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#d4881a22",
              border: "1px solid #d4881a55",
              borderRadius: 8,
              padding: "8px 16px",
              alignSelf: "flex-start",
            }}
          >
            <span style={{ color: "#d4881a", fontSize: 18, fontWeight: 700 }}>
              5.0 / 5
            </span>
            <span style={{ color: "#d4881a", fontSize: 16 }}>
              · {site.reviews.count} opinii Google
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
              }}
            >
              Profesjonalne odbiory
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
              }}
            >
              techniczne mieszkań
            </span>
          </div>

          <span style={{ color: "#aaaaaa", fontSize: 26, fontWeight: 400 }}>
            Kraków i Małopolska · Kamera termowizyjna · Raport w 48h
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #333333",
            paddingTop: 24,
          }}
        >
          <span style={{ color: "#666666", fontSize: 18 }}>
            bezpiecznyodbior.pl
          </span>
          <div
            style={{
              display: "flex",
              background: "#d4881a",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 8,
              padding: "10px 24px",
            }}
          >
            Bezpłatna wycena w 24h
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
