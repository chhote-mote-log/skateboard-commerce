import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type BoundedProps<T extends ElementType> = {
  as?: T; // The element/component type
  className?: string; // Additional class names
  style?: React.CSSProperties; // Optional inline styles
  children: ReactNode; // Allow children (single/multiple)
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">; // Exclude conflicting props

export function Bounded<T extends ElementType = "section">({
  as: Comp = "section", // Default to "section" if no "as" provided
  className,
  children,
  ...restProps
}: BoundedProps<T>) {
  return (
    <Comp
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
