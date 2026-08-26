<<<<<<< HEAD
import { LuLoaderCircle } from "react-icons/lu";
=======
import { motion, useReducedMotion } from "motion/react";
import { LuLoaderCircle } from "react-icons/lu";
import { MOTION_EASE_OUT } from "@/lib/motion";
>>>>>>> v0.29.6
import { cn } from "@/lib/utils";
import {
  type RippleButtonProps as ButtonProps,
  RippleButton as UIButton,
} from "./ui/ripple";

type Props = ButtonProps & {
  isLoading: boolean;
  "aria-label"?: string;
};
export const LoadingButton = ({ isLoading, className, ...props }: Props) => {
<<<<<<< HEAD
=======
  const reduceMotion = useReducedMotion();

>>>>>>> v0.29.6
  return (
    <UIButton
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
      disabled={props.disabled || isLoading}
<<<<<<< HEAD
    >
      {isLoading ? (
        <LuLoaderCircle className="size-4 animate-spin" />
      ) : (
        props.children
      )}
=======
      aria-busy={isLoading}
    >
      <span className="inline-grid items-center justify-items-center">
        <motion.span
          animate={{
            opacity: isLoading ? 0 : 1,
            scale: reduceMotion || !isLoading ? 1 : 0.98,
          }}
          transition={{ duration: 0.1, ease: MOTION_EASE_OUT }}
          className="col-start-1 row-start-1 inline-flex items-center justify-center gap-2"
        >
          {props.children}
        </motion.span>
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isLoading ? 1 : 0,
            scale: reduceMotion || isLoading ? 1 : 0.9,
          }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.16,
            ease: MOTION_EASE_OUT,
          }}
          className="pointer-events-none col-start-1 row-start-1 inline-flex items-center justify-center"
        >
          <LuLoaderCircle className="size-4 animate-spin" />
        </motion.span>
      </span>
>>>>>>> v0.29.6
    </UIButton>
  );
};
