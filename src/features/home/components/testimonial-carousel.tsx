"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { CmsMedia } from "@/components/media/cms-media";
import { IconButton } from "@/components/ui/icon-button";
import type { PublicTestimonial } from "@/lib/database/repositories/testimonials-repository";
import styles from "./testimonial-carousel.module.css";

export function TestimonialCarousel({
  testimonials,
}: {
  readonly testimonials: readonly PublicTestimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  if (!active) return null;

  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div
      className="mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Published testimonials"
    >
      <div
        className={`${styles.frame} overflow-hidden rounded-3xl border bg-card shadow-soft`}
      >
        <figure
          key={active.id}
          className={`${styles.slide} grid min-h-[25rem] lg:grid-cols-[.72fr_1.28fr]`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            className={`${styles.identityPanel} flex flex-col justify-between p-7 sm:p-10`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[.62rem] uppercase tracking-[.18em] text-primary-foreground/55">
                Published with consent
              </span>
              <span className="font-mono text-xs text-primary-foreground/55">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-16">
              {active.avatar ? (
                <CmsMedia
                  media={active.avatar}
                  alt={active.avatar.alt ?? active.reviewer_name}
                  sizes="64px"
                  className="size-16 rounded-2xl border border-primary-foreground/15 object-cover"
                />
              ) : (
                <span
                  className="grid size-16 place-items-center rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 text-xl font-semibold text-primary-foreground"
                  aria-hidden="true"
                >
                  {active.reviewer_name.slice(0, 1).toUpperCase()}
                </span>
              )}
              <figcaption className="mt-5 text-primary-foreground">
                <strong className="block text-xl">
                  {active.reviewer_name}
                </strong>
                {active.reviewer_role || active.company_name ? (
                  <span className="mt-1 block text-sm text-primary-foreground/60">
                    {[active.reviewer_role, active.company_name]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                ) : null}
              </figcaption>
            </div>
          </div>
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <Quote className="size-10 text-primary/20" aria-hidden="true" />
            <blockquote className="my-10 text-balance text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl lg:text-4xl">
              “{active.quote}”
            </blockquote>
            <div className="flex flex-wrap items-center justify-between gap-5 border-t pt-6">
              {testimonials.length > 1 ? (
                <>
                  <div className="flex gap-2" aria-label="Choose testimonial">
                    {testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.id}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`focus-ring min-h-11 rounded-full px-1 ${styles.dotButton}`}
                        aria-label={`Show testimonial ${index + 1}`}
                        aria-current={
                          index === activeIndex ? "true" : undefined
                        }
                      >
                        <span
                          className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      label="Previous testimonial"
                      variant="outline"
                      onClick={() => move(-1)}
                    >
                      <ArrowLeft className="size-4" aria-hidden="true" />
                    </IconButton>
                    <IconButton
                      label="Next testimonial"
                      variant="outline"
                      onClick={() => move(1)}
                    >
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </IconButton>
                  </div>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Verified feedback
                </span>
              )}
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
}
