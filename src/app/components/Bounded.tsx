import { CSSProperties, ReactNode, ElementType} from "react";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  style?: CSSProperties;
  children: ReactNode; // This ensures any valid children can be passed
};

export function Bounded<T extends ElementType>({
  as:T,
  className,
  children,
  style,
  ...restProps
}: BoundedProps<T>) {
  return (
    <div className={className} style={style} {...restProps}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </div>
  );
}
