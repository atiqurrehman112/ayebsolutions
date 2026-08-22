import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

interface IconButtonProps extends Omit<ButtonProps, "size"> {
  readonly label: string;
  readonly size?: "sm" | "default" | "lg";
}
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, children, size = "default", ...props }, ref) => {
    const sizes = { sm: "size-9", default: "size-10", lg: "size-11" };
    return (
      <Button
        ref={ref}
        size="icon"
        aria-label={label}
        className={sizes[size]}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton };
