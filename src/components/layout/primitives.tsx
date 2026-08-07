import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      reading: "max-w-reading",
      content: "max-w-content",
      wide: "max-w-[87.5rem]",
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "wide" },
});
interface ContainerProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}
function Container({ size, className, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size }), className)} {...props} />
  );
}

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  readonly as?: "section" | "div" | "article";
  readonly contained?: boolean;
  readonly containerSize?: ContainerProps["size"];
}
function SectionWrapper({
  as: Component = "section",
  contained = true,
  containerSize,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const content = contained ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );
  return (
    <Component className={cn("section-spacing", className)} {...props}>
      {content}
    </Component>
  );
}

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      12: "grid-cols-12",
    },
    gap: { sm: "gap-3", md: "gap-6", lg: "gap-8" },
  },
  defaultVariants: { columns: 3, gap: "md" },
});
interface GridProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {}
function Grid({ columns, gap, className, ...props }: GridProps) {
  return (
    <div className={cn(gridVariants({ columns, gap }), className)} {...props} />
  );
}

const stackVariants = cva("flex", {
  variants: {
    direction: { vertical: "flex-col", horizontal: "flex-row" },
    gap: { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6", xl: "gap-8" },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: { direction: "vertical", gap: "md", align: "stretch" },
});
interface StackProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {}
function Stack({ direction, gap, align, className, ...props }: StackProps) {
  return (
    <div
      className={cn(stackVariants({ direction, gap, align }), className)}
      {...props}
    />
  );
}

interface PolymorphicTextProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly children: ReactNode;
}
function Eyebrow({
  as: Component = "p",
  className,
  ...props
}: PolymorphicTextProps) {
  return (
    <Component
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Container,
  Eyebrow,
  Grid,
  SectionWrapper,
  Stack,
  containerVariants,
  gridVariants,
  stackVariants,
};
export type { ContainerProps, GridProps, SectionWrapperProps, StackProps };
