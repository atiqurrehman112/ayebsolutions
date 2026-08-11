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

export { Container, Eyebrow, SectionWrapper };
