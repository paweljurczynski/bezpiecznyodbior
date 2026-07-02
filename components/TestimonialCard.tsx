import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-1 text-amber-500">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <Quote className="mt-4 h-6 w-6 text-brand-200" />
      <blockquote className="mt-2 flex-1 text-sm text-slate-700">
        {testimonial.text}
      </blockquote>
      <figcaption className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-slate-900">{testimonial.author}</p>
        <p className="text-xs text-slate-500">
          {testimonial.date} · opinia z Google
        </p>
        <p className="mt-1 text-xs font-semibold text-brand-600">
          {testimonial.highlight}
        </p>
      </figcaption>
    </figure>
  );
}
