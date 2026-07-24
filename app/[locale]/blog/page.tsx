import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { posts } from "@/lib/posts";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { baseOpenGraph, baseTwitter } from "@/lib/metadata-i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pl") return {};
  const pathname = getPathname({ locale: "pl", href: "/blog" });
  const title = "Blog — Porady Ekspertów";
  const description =
    "Porady i wskazówki dotyczące odbioru technicznego mieszkania od dewelopera. Dowiedz się, na co zwrócić uwagę podczas odbioru nieruchomości.";
  const url = `${site.url}${pathname}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: baseOpenGraph("pl", `${title} | ${site.name}`, description, url),
    twitter: baseTwitter(`${title} | ${site.name}`, description),
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "pl") notFound();
  setRequestLocale(locale as Locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Blog", item: "/blog" },
        ])}
      />

      <PageHero
        imageAlt="Wnętrze nowego mieszkania — odbiór techniczny"
        contentClassName="py-16 text-center md:py-20"
      >
        <h1 className="text-4xl font-extrabold text-white md:text-5xl">
          Porady Ekspertów
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Wskazówki i wiedza od specjalistów — dowiedz się, jak skutecznie odebrać mieszkanie od dewelopera.
        </p>
      </PageHero>

      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
              className="group block"
            >
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-elegant">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug text-foreground group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <time className="text-xs text-muted-foreground" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="flex items-center gap-1 text-sm font-semibold text-brand group-hover:underline">
                    Dowiedz się więcej <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
