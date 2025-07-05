import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...rest }: Props) {
  return (
    <button
      className={twMerge(
        "inline-flex items-center rounded-2xl px-4 py-2 font-medium bg-primary text-white shadow",
        className
      )}
      {...rest}
    />
  );
}
