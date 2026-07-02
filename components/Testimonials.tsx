import { ExternalLink, Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Opinie klientów</p>
          <h2 className="mt-2 section-heading">
            Ponad {site.reviews.count} pozytywnych opinii na Google
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-base font-semibold text-slate-900">
              {site.reviews.rating.toFixed(1)} / 5
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={site.socials.google}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary"
          >
            Zobacz wszystkie opinie na Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
