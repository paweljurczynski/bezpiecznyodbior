import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Phone, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { posts } from "@/lib/posts";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` },
        ])}
      />

      <section className="border-b border-border bg-gradient-to-b from-brand-soft/50 to-background">
        <div className="container-page py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Wróć do bloga
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-brand md:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_280px]">
          <article className="prose prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-brand
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:space-y-1 prose-ul:my-4
            prose-hr:my-8 prose-hr:border-border
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-brand/20 bg-brand p-6 text-brand-foreground">
              <h3 className="text-lg font-bold">Potrzebujesz odbioru?</h3>
              <p className="mt-2 text-sm opacity-90">
                Skontaktuj się z nami — bezpłatną wycenę prześlemy w ciągu 24 godzin.
              </p>
              <Button asChild size="default" variant="cta" className="mt-4 w-full">
                <Link href="/kontakt">
                  Zamów wycenę <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="default" variant="outline" className="mt-2 w-full border-brand-foreground/30 bg-transparent text-brand-foreground hover:bg-brand-foreground/10">
                <a href={`tel:${site.phone}`}>
                  <Phone className="mr-2 h-4 w-4" /> {site.phoneDisplay}
                </a>
              </Button>
            </div>

            {posts.filter((p) => p.slug !== post.slug).length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Inne artykuły
                </h3>
                <ul className="mt-4 space-y-3">
                  {posts
                    .filter((p) => p.slug !== post.slug)
                    .map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="text-sm font-medium text-brand hover:underline"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
