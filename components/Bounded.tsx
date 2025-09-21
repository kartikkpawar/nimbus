import { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "section" | "footer";
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
  id?: string;
};

export function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
  id,
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
      id={id}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
