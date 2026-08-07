"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { designTokens } from "@/config/design-tokens";
import { cn } from "@/lib/utils";

const baseTransition = {
  duration: designTokens.durations.slow,
  ease: designTokens.easing.entrance,
} as const;
export const motionVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  },
  slideDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  },
  slideRight: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: baseTransition },
  },
  stagger: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
} satisfies Record<string, Variants>;

interface RevealProps extends HTMLMotionProps<"div"> {
  readonly variant?: keyof typeof motionVariants;
  readonly once?: boolean;
}
function ScrollReveal({
  variant = "slideUp",
  once = true,
  className,
  ...props
}: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={motionVariants[variant]}
      className={className}
      {...props}
    />
  );
}
function Fade(props: Omit<RevealProps, "variant">) {
  return <ScrollReveal variant="fade" {...props} />;
}
function Slide({
  direction = "up",
  ...props
}: Omit<RevealProps, "variant"> & {
  readonly direction?: "up" | "down" | "left" | "right";
}) {
  const variants = {
    up: "slideUp",
    down: "slideDown",
    left: "slideLeft",
    right: "slideRight",
  } as const;
  return <ScrollReveal variant={variants[direction]} {...props} />;
}
function Scale(props: Omit<RevealProps, "variant">) {
  return <ScrollReveal variant="scale" {...props} />;
}
function Stagger({ className, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={motionVariants.stagger}
      className={className}
      {...props}
    />
  );
}
function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={motionVariants.slideUp} {...props} />;
}

interface ParallaxProps extends HTMLMotionProps<"div"> {
  readonly offset?: number;
}
function Parallax({ offset = 48, style, ...props }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-offset, offset],
  );
  return <motion.div ref={ref} style={{ ...style, y }} {...props} />;
}

interface CounterProps {
  readonly value: number;
  readonly duration?: number;
  readonly formatter?: (value: number) => string;
  readonly className?: string;
}
function Counter({
  value,
  duration = 1.2,
  formatter = (current) => Math.round(current).toLocaleString(),
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(spring, (current) => formatter(current));
  const [display, setDisplay] = useState(formatter(0));
  useEffect(() => rounded.on("change", setDisplay), [rounded]);
  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);
  return (
    <span ref={ref} className={className}>
      {reducedMotion ? formatter(value) : display}
    </span>
  );
}

function HoverLift({ className, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: designTokens.durations.fast }}
      className={cn("will-change-transform", className)}
      {...props}
    />
  );
}

export {
  Counter,
  Fade,
  HoverLift,
  Parallax,
  Scale,
  ScrollReveal,
  Slide,
  Stagger,
  StaggerItem,
};
export type { CounterProps, ParallaxProps, RevealProps };
