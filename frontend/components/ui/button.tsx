import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-white hover:bg-primary/90 active:scale-95 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-95",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-11 px-6 text-sm min-w-[120px]",
  lg: "h-14 px-10 text-base min-w-[160px]",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

// Export button styles for use with Link components
export const buttonStyles = {
  base: baseStyles,
  variants,
  sizes,
  getClasses: (
    variant: ButtonVariant = "default",
    size: ButtonSize = "default"
  ) => cn(baseStyles, variants[variant], sizes[size]),
};
