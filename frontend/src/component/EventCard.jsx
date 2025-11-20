import * as React from "react";
// External dependencies
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator"; // New dependency


// --- Shared Utility Function ---
/**
 * Utility function to conditionally join class names and safely merge Tailwind classes.
 * Requires 'clsx' and 'tailwind-merge' to be installed.
 */
function cn() {
  return twMerge(clsx(arguments));
}


// ------------------------------------
// --- INTEGRATED RADIX LABEL COMPONENT ---
// ------------------------------------

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;


// ------------------------------------
// --- INTEGRATED BUTTON COMPONENT ---
// ------------------------------------

// 1. Button Variants
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// 2. Button Component
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";


// ------------------------------------
// --- INTEGRATED INPUT COMPONENT ---
// ------------------------------------

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";


// ------------------------------------
// --- INTEGRATED CARD COMPONENTS ---
// ------------------------------------

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";


// ------------------------------------
// --- INTEGRATED SEPARATOR COMPONENT ---
// ------------------------------------

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;


// ------------------------------------
// --- MAIN PASSWORD RECOVERY COMPONENT ---
// ------------------------------------

export const PasswordRecovery = () => {
  return (
    <div className="flex justify-center items-start pt-10 min-h-screen bg-gray-50">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Password Recovery
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address to receive a recovery link.
          </CardDescription>
        </CardHeader>
        
        {/* Added Separator between header and content */}
        <Separator className="mx-6" /> 

        <CardContent className="space-y-4 pt-6">
          <div className="w-full space-y-2">
            <Label htmlFor="email-input" className="text-lg font-medium text-gray-700">
              Enter Your Email
            </Label>
            <Input
              id="email-input"
              type="email"
              placeholder="Enter your email address"
              className="h-12 text-lg"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Close
          </Button>
          <Button
            className="flex-1 h-12 text-base font-bold rounded-lg"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};