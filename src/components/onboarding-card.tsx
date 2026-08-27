"use client";

<<<<<<< HEAD
=======
import { motion, useReducedMotion } from "motion/react";
>>>>>>> v0.29.6
import type { CardComponentProps } from "onborda";
import { useOnborda } from "onborda";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { ONBOARDING_TOUR_FINISHED_EVENT } from "@/lib/onboarding-signal";

// Custom Onborda card, themed with the app's CSS variables. Finishing the last
// step emits ONBOARDING_TOUR_FINISHED_EVENT so the page can show the celebratory
// thank-you dialog (skipping early does not emit it).
=======
import {
  ONBOARDING_TOUR_CLOSED_EVENT,
  ONBOARDING_TOUR_FINISHED_EVENT,
} from "@/lib/onboarding-signal";

// Custom Onborda card, themed with the app's CSS variables. Closing always
// persists completion; finishing the last step also asks the page to celebrate.
>>>>>>> v0.29.6
export function OnboardingCard({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}: CardComponentProps) {
  const { t } = useTranslation();
  const { closeOnborda } = useOnborda();
<<<<<<< HEAD
=======
  const reduceMotion = useReducedMotion();
>>>>>>> v0.29.6

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  // This step is completed by clicking the highlighted element (the "New"
  // button), not by a "Next" button — advancing manually would jump to a step
  // whose target doesn't exist yet and block the button. So hide "Next" here.
  const requiresAction = step.selector === '[data-onborda="create-profile"]';
<<<<<<< HEAD

  return (
    <div className="relative w-80 max-w-[90vw] rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm/tight font-semibold">{step.title}</h3>
=======
  const closeTour = () => {
    closeOnborda();
    window.dispatchEvent(new Event(ONBOARDING_TOUR_CLOSED_EVENT));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0.15 }
          : { type: "spring", stiffness: 300, damping: 30 }
      }
      className="relative flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-balance sm:text-sm">
          {step.title}
        </h3>
>>>>>>> v0.29.6
        <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
          {currentStep + 1}/{totalSteps}
        </span>
      </div>

<<<<<<< HEAD
      <div className="mt-2 text-xs/relaxed text-muted-foreground">
        {step.content}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
=======
      <div className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
        {step.content}
      </div>

      <div className="flex items-center justify-between gap-2">
>>>>>>> v0.29.6
        {isLast ? (
          <span />
        ) : (
          <Button
            variant="ghost"
            size="sm"
<<<<<<< HEAD
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => {
              closeOnborda();
            }}
=======
            className="text-muted-foreground hover:text-foreground"
            onClick={closeTour}
>>>>>>> v0.29.6
          >
            {t("onboarding.buttons.skip")}
          </Button>
        )}

        <div className="flex items-center gap-2">
          {!isFirst && !isLast && (
            <Button
              variant="outline"
              size="sm"
<<<<<<< HEAD
              className="h-7 px-2.5 text-xs"
=======
>>>>>>> v0.29.6
              onClick={() => {
                prevStep();
              }}
            >
              {t("onboarding.buttons.back")}
            </Button>
          )}
          {isLast ? (
            <Button
              size="sm"
<<<<<<< HEAD
              className="h-7 px-3 text-xs"
              onClick={() => {
                closeOnborda();
=======
              onClick={() => {
                closeTour();
>>>>>>> v0.29.6
                window.dispatchEvent(new Event(ONBOARDING_TOUR_FINISHED_EVENT));
              }}
            >
              {t("onboarding.buttons.finish")}
            </Button>
          ) : requiresAction ? null : (
            <Button
              size="sm"
<<<<<<< HEAD
              className="h-7 px-3 text-xs"
=======
>>>>>>> v0.29.6
              onClick={() => {
                nextStep();
              }}
            >
              {t("onboarding.buttons.next")}
            </Button>
          )}
        </div>
      </div>

      <span className="text-popover">{arrow}</span>
<<<<<<< HEAD
    </div>
=======
    </motion.div>
>>>>>>> v0.29.6
  );
}
