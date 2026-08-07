"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import { designTokens } from "@/config/design-tokens";

function PageTransition({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{
          duration: designTokens.durations.normal,
          ease: designTokens.easing.standard,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export { PageTransition };
