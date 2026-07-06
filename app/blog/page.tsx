import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { posts } from "@/lib/posts";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — Porady Ekspertów",
  description:
    "Porady i wskazówki dotyczące odbioru technicznego mieszkania od dewelopera. Dowiedz się, na co zwrócić uwagę podczas odbioru nieruchomości.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Porady Ekspertów | Bezpieczny Odbiór",
    description:
      "Porady i wskazówki dotyczące odbioru technicznego mieszkania od dewelopera.",
    url: `${site.url}/blog`,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Blog", item: "/blog" },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-16 text-center md:py-20">
          <h1 className="text-4xl font-extrabold text-brand md:text-5xl">
            Porady Ekspertów
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Wskazówki i wiedza od inżynierów — dowiedz się, jak skutecznie odebrać mieszkanie od dewelopera.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
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
