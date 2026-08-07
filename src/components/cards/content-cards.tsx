import { Check, Quote } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/status";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

interface ContentCardProps {
  readonly title: string;
  readonly description: string;
  readonly eyebrow?: string;
  readonly media?: ReactNode;
  readonly icon?: ReactNode;
  readonly href?: string;
  readonly linkLabel?: string;
  readonly className?: string;
  readonly children?: ReactNode;
}
function ContentCard({
  title,
  description,
  eyebrow,
  media,
  icon,
  href,
  linkLabel = "Learn more",
  className,
  children,
}: ContentCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden transition duration-normal ease-standard hover:-translate-y-1 hover:shadow-soft",
        className,
      )}
    >
      {media ? (
        <div className="aspect-[16/9] overflow-hidden bg-muted [&>*]:size-full">
          {media}
        </div>
      ) : null}
      <CardHeader>
        {icon ? (
          <div className="mb-3 grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground">
            {icon}
          </div>
        ) : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children ? (
        <CardContent className="flex-1">{children}</CardContent>
      ) : (
        <div className="flex-1" />
      )}
      {href ? (
        <CardFooter>
          <Button asChild variant="link" className="h-auto p-0">
            <Link href={href}>
              {linkLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}

function FeatureCard(props: ContentCardProps) {
  return <ContentCard {...props} />;
}
function ServiceCard(props: ContentCardProps) {
  return <ContentCard {...props} />;
}
function ProjectCard(props: ContentCardProps) {
  return <ContentCard {...props} />;
}
function BlogCard(props: ContentCardProps) {
  return <ContentCard {...props} />;
}

interface PersonCardProps {
  readonly name: string;
  readonly role: string;
  readonly bio?: string;
  readonly avatar: ReactNode;
  readonly className?: string;
}
function TeamCard({ name, role, bio, avatar, className }: PersonCardProps) {
  return (
    <Card className={cn("overflow-hidden text-center", className)}>
      <div className="aspect-square overflow-hidden bg-muted [&>*]:size-full">
        {avatar}
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
        {bio ? (
          <p className="pt-2 text-sm text-muted-foreground">{bio}</p>
        ) : null}
      </CardHeader>
    </Card>
  );
}

interface TestimonialCardProps {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly avatar?: ReactNode;
  readonly className?: string;
}
function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardContent className="flex-1 pt-6">
        <Quote
          className="mb-4 size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <blockquote className="text-lg leading-relaxed">“{quote}”</blockquote>
      </CardContent>
      <CardFooter className="gap-3">
        {avatar}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

interface PricingCardProps {
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly cadence?: string;
  readonly features: readonly string[];
  readonly actionLabel: string;
  readonly action?: ReactNode;
  readonly featured?: boolean;
  readonly className?: string;
}
function PricingCard({
  name,
  description,
  price,
  cadence,
  features,
  actionLabel,
  action,
  featured,
  className,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col",
        featured && "border-primary shadow-soft",
        className,
      )}
    >
      {featured ? (
        <Badge className="absolute right-4 top-4">Popular</Badge>
      ) : null}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="pt-4 text-4xl font-bold tracking-tight">
          {price}
          {cadence ? (
            <span className="text-sm font-normal text-muted-foreground">
              /{cadence}
            </span>
          ) : null}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-success"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {action ?? (
          <Button className="w-full" variant={featured ? "default" : "outline"}>
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

interface ValueCardProps {
  readonly label: string;
  readonly value: string;
  readonly change?: string;
  readonly icon?: ReactNode;
  readonly className?: string;
}
function StatCard({ label, value, change, icon, className }: ValueCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-start justify-between pt-6">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {change ? (
            <p className="mt-1 text-sm text-success">{change}</p>
          ) : null}
        </div>
        {icon ? <div className="rounded-lg bg-muted p-2.5">{icon}</div> : null}
      </CardContent>
    </Card>
  );
}
function MetricCard(props: ValueCardProps) {
  return <StatCard {...props} />;
}

export {
  BlogCard,
  ContentCard,
  FeatureCard,
  MetricCard,
  PricingCard,
  ProjectCard,
  ServiceCard,
  StatCard,
  TeamCard,
  TestimonialCard,
};
export type {
  ContentCardProps,
  PersonCardProps,
  PricingCardProps,
  TestimonialCardProps,
  ValueCardProps,
};
