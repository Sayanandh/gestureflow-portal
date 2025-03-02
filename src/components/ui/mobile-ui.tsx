
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Mobile optimized button
export const MobileButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("mobile-button touch-scale", className)}
    {...props}
  />
));
MobileButton.displayName = "MobileButton";

// Mobile optimized card
export const MobileCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("mobile-card", className)}
    {...props}
  />
));
MobileCard.displayName = "MobileCard";

export const MobileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardHeader>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("p-5", className)}
    {...props}
  />
));
MobileCardHeader.displayName = "MobileCardHeader";

export const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => (
  <CardContent
    ref={ref}
    className={cn("p-5 pt-0", className)}
    {...props}
  />
));
MobileCardContent.displayName = "MobileCardContent";

export const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CardFooter>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("p-5 pt-0 flex justify-center", className)}
    {...props}
  />
));
MobileCardFooter.displayName = "MobileCardFooter";

// Mobile optimized input
export const MobileInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("mobile-input", className)}
    {...props}
  />
));
MobileInput.displayName = "MobileInput";

// Mobile form group
export const MobileFormGroup: React.FC<{
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, className, children }) => (
  <div className={cn("space-y-2 mb-4", className)}>
    <Label htmlFor={htmlFor} className="text-sm font-medium">
      {label}
    </Label>
    {children}
  </div>
);
