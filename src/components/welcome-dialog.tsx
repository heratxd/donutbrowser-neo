"use client";

<<<<<<< HEAD
import { AnimatePresence, motion } from "motion/react";
=======
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
>>>>>>> v0.29.6
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LuArrowRight,
  LuBriefcase,
<<<<<<< HEAD
=======
  LuCamera,
>>>>>>> v0.29.6
  LuCookie,
  LuFolders,
  LuGithub,
  LuGlobe,
  LuHeart,
  LuLoaderCircle,
  LuMic,
  LuNetwork,
  LuShieldCheck,
  LuTerminal,
  LuTriangleAlert,
  LuUsers,
} from "react-icons/lu";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useBrowserSetup } from "@/hooks/use-browser-setup";
import { usePermissions } from "@/hooks/use-permissions";
import { getBrowserDisplayName } from "@/lib/browser-utils";
<<<<<<< HEAD

type WelcomeStep = "intro" | "license" | "permissions" | "setup";

const panelTransition = {
=======
import { getCurrentOS } from "@/lib/platform";

type WelcomeStep = "intro" | "license" | "permissions" | "setup";

const panelSpring = {
>>>>>>> v0.29.6
  type: "spring",
  stiffness: 260,
  damping: 28,
} as const;

const panelVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

// Concrete feature list shown on the intro step, rendered as an icon grid.
const FEATURES = [
  { key: "welcome.features.items.setDefault", Icon: LuGlobe },
  { key: "welcome.features.items.proxy", Icon: LuNetwork },
  { key: "welcome.features.items.vpn", Icon: LuShieldCheck },
  { key: "welcome.features.items.profiles", Icon: LuUsers },
  { key: "welcome.features.items.api", Icon: LuTerminal },
  { key: "welcome.features.items.openSource", Icon: LuGithub },
  { key: "welcome.features.items.groups", Icon: LuFolders },
  { key: "welcome.features.items.cookies", Icon: LuCookie },
] as const;

<<<<<<< HEAD
function formatBytes(bytes: number): string {
  if (!(bytes > 0)) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const value = bytes / 1024 ** exponent;
  const rounded = exponent === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${units[exponent]}`;
}

function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  if (total < 60) return `${total}s`;
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${minutes}m ${String(remainder).padStart(2, "0")}s`;
=======
const BYTE_UNITS = ["byte", "kilobyte", "megabyte", "gigabyte"] as const;

function formatBytes(bytes: number, locale: string): string {
  const exponent = Math.min(
    BYTE_UNITS.length - 1,
    bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0,
  );
  const value = bytes / 1024 ** exponent;
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit: BYTE_UNITS[exponent],
    unitDisplay: "short",
    maximumFractionDigits: exponent === 0 ? 0 : 1,
  }).format(value);
}

function formatDuration(seconds: number, locale: string): string {
  const total = Math.max(0, Math.round(seconds));
  const formatUnit = (
    value: number,
    unit: "minute" | "second",
    minimumIntegerDigits = 1,
  ) =>
    new Intl.NumberFormat(locale, {
      style: "unit",
      unit,
      unitDisplay: "narrow",
      minimumIntegerDigits,
    }).format(value);

  if (total < 60) return formatUnit(total, "second");
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${formatUnit(minutes, "minute")} ${formatUnit(
    remainder,
    "second",
    2,
  )}`;
}

function SetupProgress({ value, label }: { value: number; label: string }) {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const determined = normalizedValue > 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determined ? normalizedValue : undefined}
      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
    >
      {determined ? (
        <motion.div
          className="h-full origin-left rounded-full bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: normalizedValue / 100 }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      ) : (
        <div className="h-full w-1/3 rounded-full bg-primary motion-safe:animate-progress-indeterminate motion-reduce:translate-x-0" />
      )}
    </div>
  );
>>>>>>> v0.29.6
}

export function WelcomeDialog({
  isOpen,
  needsSetup,
  onComplete,
}: {
  isOpen: boolean;
  /**
   * Whether this user still needs the browser-download + profile-creation flow.
   * False when they already have a profile — then the welcome and commercial-use
   * steps still show, but "continue" finishes onboarding instead of proceeding
   * to permissions/download.
   */
  needsSetup: boolean;
  onComplete: () => void;
}) {
<<<<<<< HEAD
  const { t } = useTranslation();
  const { requestPermission } = usePermissions();
  const [step, setStep] = useState<WelcomeStep>("intro");
=======
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const {
    requestPermission,
    isMicrophoneAccessGranted,
    isCameraAccessGranted,
    isInitialized,
    requiresSystemPermissions,
  } = usePermissions(isOpen);
  const [step, setStep] = useState<WelcomeStep>("intro");
  const permissionsGranted = isMicrophoneAccessGranted && isCameraAccessGranted;
  const showPermissionsStep =
    requiresSystemPermissions &&
    (step === "permissions" || !isInitialized || !permissionsGranted);
  const visibleSteps: WelcomeStep[] = [
    "intro",
    "license",
    ...(showPermissionsStep ? (["permissions"] as const) : []),
    ...(needsSetup ? (["setup"] as const) : []),
  ];
  const currentStepIndex = Math.max(0, visibleSteps.indexOf(step));
  const panelTransition = reduceMotion
    ? ({ duration: 0.15 } as const)
    : panelSpring;
>>>>>>> v0.29.6
  // Where the "skip" / "continue" affordances go: into the setup flow when a
  // browser/profile is still needed, otherwise straight to completion.
  const advanceToSetup = () => {
    if (needsSetup) setStep("setup");
    else onComplete();
  };
  const [requesting, setRequesting] = useState(false);

  // Track the required browser's download + extraction the whole time the
  // dialog is open, so progress is live by the time the user reaches setup.
  const setup = useBrowserSetup("wayfern", isOpen);
  const browserName = getBrowserDisplayName("wayfern");

  const requestPermissions = useCallback(async () => {
    setRequesting(true);
    try {
<<<<<<< HEAD
      await requestPermission("microphone");
      await requestPermission("camera");
=======
      if (!isMicrophoneAccessGranted) {
        await requestPermission("microphone");
      }
      if (!isCameraAccessGranted) {
        await requestPermission("camera");
      }
>>>>>>> v0.29.6
    } catch (err) {
      console.error("Permission request failed:", err);
    } finally {
      setRequesting(false);
      setStep("setup");
    }
<<<<<<< HEAD
  }, [requestPermission]);
=======
  }, [isCameraAccessGranted, isMicrophoneAccessGranted, requestPermission]);
>>>>>>> v0.29.6

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        dismissible={false}
<<<<<<< HEAD
        className="overflow-x-hidden sm:max-w-xl"
      >
        <DialogTitle className="sr-only">{t("welcome.title")}</DialogTitle>

=======
        className="overflow-x-hidden p-4 sm:max-w-xl sm:p-6"
      >
        <DialogTitle className="sr-only">{t("welcome.title")}</DialogTitle>

        <div
          role="progressbar"
          aria-label={t("welcome.title")}
          aria-valuemin={1}
          aria-valuemax={visibleSteps.length}
          aria-valuenow={currentStepIndex + 1}
          className="mx-auto h-1 w-24 overflow-hidden rounded-full bg-muted"
        >
          <motion.div
            className="h-full origin-left rounded-full bg-primary"
            initial={false}
            animate={{
              scaleX: (currentStepIndex + 1) / visibleSteps.length,
            }}
            transition={panelTransition}
          />
        </div>

>>>>>>> v0.29.6
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={panelTransition}
              className="flex flex-col gap-7"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
<<<<<<< HEAD
                  transition={{ ...panelTransition, delay: 0.05 }}
=======
                  transition={{
                    ...panelTransition,
                    delay: reduceMotion ? 0 : 0.05,
                  }}
>>>>>>> v0.29.6
                  className="text-foreground"
                >
                  <Logo className="size-12" />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-balance">
                    {t("welcome.title")}
                  </h2>
<<<<<<< HEAD
                  <p className="mx-auto max-w-[55ch] text-sm text-pretty text-muted-foreground">
=======
                  <p className="mx-auto max-w-[55ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                    {t("welcome.tagline")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
<<<<<<< HEAD
                <p className="text-sm font-medium text-muted-foreground">
=======
                <p className="text-base/7 font-medium text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                  {t("welcome.features.title")}
                </p>
                <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {FEATURES.map(({ key, Icon }, i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        ...panelTransition,
<<<<<<< HEAD
                        delay: 0.12 + i * 0.04,
                      }}
                      className="flex items-center gap-2.5"
                    >
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <dt className="text-sm font-medium text-foreground">
=======
                        delay: reduceMotion ? 0 : 0.12 + i * 0.04,
                      }}
                      className="flex min-w-0 items-center gap-2.5"
                    >
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <dt className="text-base/7 font-medium text-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                        {t(key)}
                      </dt>
                    </motion.div>
                  ))}
                </dl>
              </div>

<<<<<<< HEAD
              <div className="flex items-center justify-between">
=======
              <div className="flex flex-wrap items-center justify-between gap-2">
>>>>>>> v0.29.6
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={advanceToSetup}
                >
                  {t("welcome.skip")}
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setStep("license")}
                >
                  {t("welcome.next")}
                  <LuArrowRight className="size-4 shrink-0" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "license" && (
            <motion.div
              key="license"
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={panelTransition}
              className="flex flex-col gap-7"
            >
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                  {t("welcome.license.title")}
                </h2>
<<<<<<< HEAD
                <p className="mx-auto max-w-[55ch] text-sm/6 text-pretty text-muted-foreground">
=======
                <p className="mx-auto max-w-[55ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                  {t("welcome.license.body")}
                </p>
              </div>

              <dl className="flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-lg border p-4">
<<<<<<< HEAD
                  <LuHeart className="mt-0.5 size-4 shrink-0 text-success" />
                  <div className="flex flex-col gap-0.5 text-left">
                    <dt className="text-sm font-medium text-foreground">
                      {t("welcome.license.personalTitle")}
                    </dt>
                    <dd className="text-sm text-pretty text-muted-foreground">
=======
                  <LuHeart className="mt-0.5 size-4 shrink-0 text-success-text" />
                  <div className="flex flex-col gap-0.5 text-left">
                    <dt className="text-base/7 font-medium text-foreground sm:text-sm/6">
                      {t("welcome.license.personalTitle")}
                    </dt>
                    <dd className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                      {t("welcome.license.personalDesc")}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <LuBriefcase className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col gap-0.5 text-left">
<<<<<<< HEAD
                    <dt className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {t("welcome.license.commercialTitle")}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {t("welcome.license.trialBadge")}
                      </span>
                    </dt>
                    <dd className="text-sm text-pretty text-muted-foreground">
=======
                    <dt className="flex flex-wrap items-center gap-2 text-base/7 font-medium text-foreground sm:text-sm/6">
                      {t("welcome.license.commercialTitle")}
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-text">
                        {t("welcome.license.trialBadge")}
                      </span>
                    </dt>
                    <dd className="text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                      {t("welcome.license.commercialDesc")}
                    </dd>
                  </div>
                </div>
              </dl>

<<<<<<< HEAD
              <div className="flex items-center justify-between">
=======
              <div className="flex flex-wrap items-center justify-between gap-2">
>>>>>>> v0.29.6
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={advanceToSetup}
                >
                  {t("welcome.skip")}
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
<<<<<<< HEAD
                    if (needsSetup) setStep("permissions");
                    else onComplete();
=======
                    if (!needsSetup) {
                      onComplete();
                    } else if (
                      getCurrentOS() === "macos" &&
                      !(isInitialized && permissionsGranted)
                    ) {
                      setStep("permissions");
                    } else {
                      setStep("setup");
                    }
>>>>>>> v0.29.6
                  }}
                >
                  {t("welcome.license.agree")}
                  <LuArrowRight className="size-4 shrink-0" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "permissions" && (
            <motion.div
              key="permissions"
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={panelTransition}
              className="flex flex-col gap-7"
            >
<<<<<<< HEAD
              <div className="flex flex-col gap-2 text-center">
                <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-balance">
                  <LuMic className="size-5 shrink-0" />
                  {t("welcome.permissions.title")}
                </h2>
                <p className="mx-auto max-w-[55ch] text-sm/6 text-pretty text-muted-foreground">
=======
              <div className="flex flex-col items-center gap-3 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={panelTransition}
                  className="flex size-12 items-center justify-center gap-1.5 rounded-full bg-primary/10 text-primary-text"
                  aria-hidden="true"
                >
                  <LuMic className="size-4 shrink-0" />
                  <LuCamera className="size-4 shrink-0" />
                </motion.div>
                <h2 className="text-2xl font-semibold tracking-tight text-balance">
                  {t("welcome.permissions.title")}
                </h2>
                <p className="mx-auto max-w-[55ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                  {t("welcome.permissions.desc")}
                </p>
              </div>

<<<<<<< HEAD
              <div className="flex items-center justify-between">
=======
              <div className="flex flex-wrap items-center justify-between gap-2">
>>>>>>> v0.29.6
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  disabled={requesting}
                  onClick={advanceToSetup}
                >
                  {t("welcome.permissions.skip")}
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  disabled={requesting}
                  onClick={() => {
                    void requestPermissions();
                  }}
                >
                  {requesting && (
                    <LuLoaderCircle className="size-4 shrink-0 animate-spin" />
                  )}
                  {requesting
                    ? t("welcome.permissions.requesting")
                    : t("welcome.permissions.grant")}
                </Button>
              </div>
            </motion.div>
          )}

          {step === "setup" && (
            <motion.div
              key="setup"
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={panelTransition}
              className="flex flex-col items-center gap-6 text-center"
            >
              {setup.phase === "error" ? (
                <>
                  <div className="flex flex-col items-center gap-2">
<<<<<<< HEAD
                    <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-balance text-destructive">
                      <LuTriangleAlert className="size-5 shrink-0" />
                      {t("welcome.ready.errorTitle")}
                    </h2>
                    <p className="max-w-[55ch] text-sm/6 text-pretty text-muted-foreground">
=======
                    <h2 className="flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight text-balance text-destructive-text">
                      <LuTriangleAlert className="size-5 shrink-0" />
                      {t("welcome.ready.errorTitle")}
                    </h2>
                    <p className="max-w-[55ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                      {setup.error?.stage === "downloading"
                        ? t("welcome.ready.errorDownload", {
                            browser: browserName,
                          })
                        : setup.error?.stage === "extracting" ||
                            setup.error?.stage === "verifying"
                          ? t("welcome.ready.errorExtraction", {
                              browser: browserName,
                            })
                          : t("welcome.ready.errorGeneric", {
                              browser: browserName,
                            })}
                    </p>
                  </div>

                  {/* No escape hatch here: a browser must finish downloading
                      before onboarding can complete, so the only action on
                      failure is to retry. */}
                  <Button
                    size="sm"
                    onClick={() => {
                      setup.retry();
                    }}
                  >
                    {t("welcome.ready.retry")}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-balance">
                      {t("welcome.ready.title")}
                    </h2>
<<<<<<< HEAD
                    <p className="max-w-[55ch] text-sm/6 text-pretty text-muted-foreground">
=======
                    <p className="max-w-[55ch] text-base/7 text-pretty text-muted-foreground sm:text-sm/6">
>>>>>>> v0.29.6
                      {setup.phase === "ready"
                        ? t("welcome.ready.descReady")
                        : setup.phase === "extracting"
                          ? t("welcome.ready.descExtracting")
                          : t("welcome.ready.descDownloading")}
                    </p>
                  </div>

                  {setup.phase === "downloading" && (
                    <div className="flex w-full max-w-xs flex-col gap-2">
<<<<<<< HEAD
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.max(setup.downloadPercent, 4)}%`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 24,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground tabular-nums">
=======
                      <SetupProgress
                        value={setup.downloadPercent}
                        label={t("welcome.ready.downloading")}
                      />
                      <div className="flex items-center justify-between text-base/7 text-muted-foreground tabular-nums sm:text-sm/6">
>>>>>>> v0.29.6
                        <span className="inline-flex items-center gap-1.5">
                          <LuLoaderCircle className="size-4 shrink-0 animate-spin" />
                          {t("welcome.ready.downloading")}
                        </span>
                        <span>{setup.downloadPercent}%</span>
                      </div>
<<<<<<< HEAD
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground tabular-nums">
                        <span>
                          {setup.totalBytes != null
                            ? t("welcome.ready.stats", {
                                downloaded: formatBytes(setup.downloadedBytes),
                                total: formatBytes(setup.totalBytes),
                              })
                            : formatBytes(setup.downloadedBytes)}
=======
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground tabular-nums">
                        <span>
                          {setup.totalBytes != null
                            ? t("welcome.ready.stats", {
                                downloaded: formatBytes(
                                  setup.downloadedBytes,
                                  i18n.language,
                                ),
                                total: formatBytes(
                                  setup.totalBytes,
                                  i18n.language,
                                ),
                              })
                            : formatBytes(setup.downloadedBytes, i18n.language)}
>>>>>>> v0.29.6
                        </span>
                        {setup.speedBytesPerSec > 0 && (
                          <span>
                            {t("welcome.ready.speed", {
<<<<<<< HEAD
                              speed: formatBytes(setup.speedBytesPerSec),
=======
                              speed: formatBytes(
                                setup.speedBytesPerSec,
                                i18n.language,
                              ),
>>>>>>> v0.29.6
                            })}
                          </span>
                        )}
                        {setup.etaSeconds != null &&
                          Number.isFinite(setup.etaSeconds) &&
                          setup.etaSeconds > 0 && (
                            <span>
                              {t("welcome.ready.timeLeft", {
<<<<<<< HEAD
                                time: formatDuration(setup.etaSeconds),
=======
                                time: formatDuration(
                                  setup.etaSeconds,
                                  i18n.language,
                                ),
>>>>>>> v0.29.6
                              })}
                            </span>
                          )}
                      </div>
                    </div>
                  )}

                  {setup.phase === "extracting" && (
                    <div className="flex w-full max-w-xs flex-col gap-2">
                      {setup.extractionOvertime ? (
<<<<<<< HEAD
                        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground tabular-nums">
=======
                        <div className="flex items-center justify-center gap-1.5 text-base/7 text-muted-foreground tabular-nums sm:text-sm/6">
>>>>>>> v0.29.6
                          <LuLoaderCircle className="size-4 shrink-0 animate-spin" />
                          {t("welcome.ready.almostFinished")}
                        </div>
                      ) : (
                        <>
<<<<<<< HEAD
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <motion.div
                              className="h-full rounded-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.max(setup.extractionPercent, 4)}%`,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 24,
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground tabular-nums">
=======
                          <SetupProgress
                            value={setup.extractionPercent}
                            label={t("welcome.ready.extracting")}
                          />
                          <div className="flex items-center justify-between text-base/7 text-muted-foreground tabular-nums sm:text-sm/6">
>>>>>>> v0.29.6
                            <span className="inline-flex items-center gap-1.5">
                              <LuLoaderCircle className="size-4 shrink-0 animate-spin" />
                              {t("welcome.ready.extracting")}
                            </span>
                            <span>{setup.extractionPercent}%</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {setup.phase === "ready" && (
                    <Button size="sm" className="gap-1.5" onClick={onComplete}>
                      <LuArrowRight className="size-4 shrink-0" />
                      {t("welcome.ready.cta")}
                    </Button>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
