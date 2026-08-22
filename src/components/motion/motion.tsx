"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { designTokens } from "@/config/design-tokens";

const baseTransition = {
  duration: designTokens.durations.slow,
  ease: designTokens.easing.entrance,
} as const;

const motionVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  },
  stagger: { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } },
} satisfies Record<string, Variants>;

interface RevealProps extends HTMLMotionProps<"div"> {
  readonly once?: boolean;
}

function Fade({ once = true, className, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={motionVariants.fade}
      className={className}
      {...props}
    />
  );
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

export { Fade, Stagger, StaggerItem };
