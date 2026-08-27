"use client";

<<<<<<< HEAD
=======
import { motion } from "motion/react";
>>>>>>> v0.29.6
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { FiWifi } from "react-icons/fi";
import { GoGear, GoKebabHorizontal } from "react-icons/go";
import {
  LuCloud,
<<<<<<< HEAD
=======
  LuCookie,
  LuInfo,
>>>>>>> v0.29.6
  LuKeyboard,
  LuPlug,
  LuPuzzle,
  LuUser,
  LuUsers,
} from "react-icons/lu";
<<<<<<< HEAD
=======
import { launchDonutClone } from "@/lib/donut-physics";
import { MOTION_SPRING_POSITION } from "@/lib/motion";
>>>>>>> v0.29.6
import { cn } from "@/lib/utils";
import { Logo } from "./icons/logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type AppPage =
  | "profiles"
  | "proxies"
  | "extensions"
  | "groups"
<<<<<<< HEAD
=======
  | "cookieBot"
>>>>>>> v0.29.6
  | "vpns"
  | "settings"
  | "integrations"
  | "account"
  | "import"
  | "shortcuts";

const CLICK_THRESHOLD = 5;
const CLICK_WINDOW_MS = 2000;
<<<<<<< HEAD
const GRAVITY = 2200;
const BOUNCE_DAMPING = 0.6;
const INITIAL_HORIZONTAL_SPEED = 350;
const SPIN_SPEED = 720;
const MIN_BOUNCE_VELOCITY = 60;
=======
>>>>>>> v0.29.6
const LOGO_HIDDEN_KEY = "donut-logo-hidden";

function useLogoEasterEgg({
  currentPage,
  onNavigate,
}: {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}) {
  const clickTimestamps = useRef<number[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [wobbleKey, setWobbleKey] = useState(0);
  const [isFalling, setIsFalling] = useState(false);
  /**
   * Click count toward the bounce trigger while the user is on the profiles
   * page. Capped at 4: each click here grows the logo by 25%, so step 4 has
   * doubled the original size. Click 5 fires `triggerFall` and resets.
   */
  const [growStep, setGrowStep] = useState(0);
  const resetTimeoutRef = useRef<number | null>(null);
  const [isHidden, setIsHidden] = useState(() => {
    try {
      return sessionStorage.getItem(LOGO_HIDDEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const logoRef = useRef<HTMLButtonElement>(null);
<<<<<<< HEAD
  const animFrameRef = useRef<number>(0);
=======
  const cancelFallRef = useRef<(() => void) | null>(null);
>>>>>>> v0.29.6

  const triggerFall = useCallback(() => {
    const el = logoRef.current;
    if (!el || isFalling) return;
    setIsFalling(true);

<<<<<<< HEAD
    const rect = el.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;

    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.left = `${startX}px`;
    clone.style.top = `${startY}px`;
    clone.style.zIndex = "9999";
    clone.style.pointerEvents = "none";
    clone.style.margin = "0";
    document.body.appendChild(clone);
    el.style.visibility = "hidden";

    let x = 0;
    let y = 0;
    let vy = -500;
    // Roll right first, bounce off the right wall, then escape the left.
    let vx = INITIAL_HORIZONTAL_SPEED;
    let rotation = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Read live so a mid-animation window resize moves the floor/wall.
      const floorY = window.innerHeight;
      const rightWall = window.innerWidth;

      vy += GRAVITY * dt;
      x += vx * dt;
      y += vy * dt;
      rotation += SPIN_SPEED * dt * (vx > 0 ? 1 : -1);

      const currentBottom = startY + y + rect.height;
      if (currentBottom >= floorY && vy > 0) {
        y = floorY - startY - rect.height;
        vy =
          Math.abs(vy) > MIN_BOUNCE_VELOCITY
            ? -Math.abs(vy) * BOUNCE_DAMPING
            : -MIN_BOUNCE_VELOCITY * 3;
      }

      // Right-wall bounce: hit, reverse horizontal velocity (with a tiny
      // damping), and keep rolling. Left wall has no bounce — the donut
      // exits the window off the left edge.
      const currentRight = startX + x + rect.width;
      if (currentRight >= rightWall && vx > 0) {
        x = rightWall - startX - rect.width;
        vx = -Math.abs(vx) * 0.9;
      }

      clone.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

      const offScreenLeft = startX + x + rect.width < -200;
      const offScreenBottom = startY + y > floorY + 100;
      const offScreenTop = startY + y + rect.height < -200;

      if (offScreenLeft || offScreenBottom || offScreenTop) {
        clone.remove();
=======
    cancelFallRef.current = launchDonutClone(el, {
      onExit: () => {
>>>>>>> v0.29.6
        try {
          sessionStorage.setItem(LOGO_HIDDEN_KEY, "1");
        } catch {
          // ignore — sessionStorage unavailable in some Tauri WebViews
        }
        setIsHidden(true);
        setIsFalling(false);
<<<<<<< HEAD
        return;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
=======
      },
    });
>>>>>>> v0.29.6
  }, [isFalling]);

  useEffect(() => {
    return () => {
<<<<<<< HEAD
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
=======
      cancelFallRef.current?.();
>>>>>>> v0.29.6
    };
  }, []);

  const handleClick = useCallback(() => {
    if (isFalling || isHidden) return;

    // First behaviour: any click from elsewhere in the app just routes the
    // user back to the profiles list. Growing the donut requires the user
    // to already be home — that keeps the easter egg from accidentally
    // firing during normal navigation.
    if (currentPage !== "profiles") {
      onNavigate("profiles");
      clickTimestamps.current = [];
      setGrowStep(0);
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      return;
    }

    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < CLICK_WINDOW_MS,
    );
    clickTimestamps.current.push(now);

    if (clickTimestamps.current.length >= CLICK_THRESHOLD) {
      clickTimestamps.current = [];
      setGrowStep(0);
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      triggerFall();
    } else {
      setGrowStep(
        Math.min(clickTimestamps.current.length, CLICK_THRESHOLD - 1),
      );
      setWobbleKey((k) => k + 1);
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = window.setTimeout(() => {
        clickTimestamps.current = [];
        setGrowStep(0);
        resetTimeoutRef.current = null;
      }, CLICK_WINDOW_MS);
    }
  }, [currentPage, isFalling, isHidden, onNavigate, triggerFall]);

  // Leaving the profiles page mid-streak cancels growth so we never end up
  // with an outsized logo when the user returns later.
  useEffect(() => {
    if (currentPage !== "profiles") {
      clickTimestamps.current = [];
      setGrowStep(0);
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    }
  }, [currentPage]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    logoRef,
    isPressed,
    setIsPressed,
    wobbleKey,
    isFalling,
    isHidden,
    growStep,
    handleClick,
  };
}

interface RailNavProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
<<<<<<< HEAD
=======
  onOpenAbout: () => void;
  /**
   * A remote session is running right now. The Cookie Bot item carries a dot so
   * the state is legible from every other page — an overnight job you cannot
   * see from where you are standing may as well not be observable at all.
   */
  cookieBotRunning?: boolean;
}

/** Shared-element indicator that slides between the active rail items. */
function ActiveIndicator() {
  return (
    <motion.span
      aria-hidden="true"
      layoutId="rail-indicator"
      transition={MOTION_SPRING_POSITION}
      className="absolute inset-y-1.5 left-[-7px] w-[2px] rounded-full bg-foreground"
    />
  );
>>>>>>> v0.29.6
}

interface RailItem {
  page: AppPage;
  Icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
}

const TOP_ITEMS: RailItem[] = [
  { page: "profiles", Icon: LuUser, labelKey: "rail.profiles" },
  { page: "proxies", Icon: FiWifi, labelKey: "rail.network" },
  { page: "extensions", Icon: LuPuzzle, labelKey: "rail.extensions" },
  { page: "groups", Icon: LuUsers, labelKey: "rail.groups" },
<<<<<<< HEAD
=======
  { page: "cookieBot", Icon: LuCookie, labelKey: "rail.cookieBot" },
>>>>>>> v0.29.6
  { page: "integrations", Icon: LuPlug, labelKey: "rail.integrations" },
  { page: "account", Icon: LuCloud, labelKey: "rail.account" },
];

interface MoreMenuItem {
  page: AppPage;
  Icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  hintKey: string;
}

const MORE_ITEMS: MoreMenuItem[] = [
  {
    page: "import",
    Icon: FaDownload,
    labelKey: "rail.more.importProfile",
    hintKey: "rail.more.importProfileHint",
  },
  {
    page: "shortcuts",
    Icon: LuKeyboard,
    labelKey: "rail.more.keyboardShortcuts",
    hintKey: "rail.more.keyboardShortcutsHint",
  },
];

<<<<<<< HEAD
export function RailNav({ currentPage, onNavigate }: RailNavProps) {
=======
export function RailNav({
  currentPage,
  onNavigate,
  onOpenAbout,
  cookieBotRunning = false,
}: RailNavProps) {
>>>>>>> v0.29.6
  const { t } = useTranslation();
  const [moreOpen, setMoreOpen] = useState(false);
  const {
    logoRef,
    isPressed,
    setIsPressed,
    wobbleKey,
    isFalling,
    isHidden,
    growStep,
    handleClick,
  } = useLogoEasterEgg({ currentPage, onNavigate });

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!moreOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [moreOpen]);

>>>>>>> v0.29.6
  return (
    <nav className="relative flex w-10 shrink-0 flex-col items-center gap-1 border-r border-border bg-background py-2">
      {!isHidden ? (
        <button
          ref={logoRef}
          type="button"
          aria-label={t("header.donutLogo")}
          className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md bg-transparent text-foreground select-none"
          onClick={handleClick}
          onPointerDown={() => {
            setIsPressed(true);
          }}
          onPointerUp={() => {
            setIsPressed(false);
          }}
          onPointerLeave={() => {
            setIsPressed(false);
          }}
        >
          {/* Inner wrapper survives clicks (no `key`) so the scale change
              animates smoothly across the wiggle layer's remounts. */}
          <span
            style={{
              transform: isPressed
                ? `scale(${(1 + growStep * 0.25) * 0.9})`
                : `scale(${1 + growStep * 0.25})`,
            }}
            className="inline-grid place-items-center transition-transform duration-300 ease-out will-change-transform"
          >
            <span
              key={wobbleKey}
              className={cn(
                "inline-grid place-items-center",
                !isFalling &&
                  !isPressed &&
                  wobbleKey > 0 &&
                  "animate-[wiggle_0.3s_ease-in-out]",
              )}
            >
              <Logo className="size-5 will-change-transform" />
            </span>
          </span>
        </button>
      ) : (
        <div className="size-7 shrink-0" />
      )}

      <div className="my-1 h-px w-5 shrink-0 bg-border" />

      <div className="flex min-h-0 w-full scrollbar-none flex-col items-center gap-1 overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {TOP_ITEMS.map(({ page, Icon, labelKey }) => {
          const active = currentPage === page;
          return (
            <Tooltip key={page} delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(page);
                  }}
                  aria-label={t(labelKey)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative grid size-7 shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-100",
                    active
<<<<<<< HEAD
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-card-foreground",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-1.5 left-[-7px] w-[2px] rounded-full bg-foreground"
                    />
                  )}
                  <Icon className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">{t(labelKey)}</TooltipContent>
=======
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {active && <ActiveIndicator />}
                  <Icon className="size-3.5" />
                  {page === "cookieBot" && cookieBotRunning && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1 right-1 size-1.5 rounded-full bg-success"
                    />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {page === "cookieBot" && cookieBotRunning
                  ? t("rail.cookieBotRunning")
                  : t(labelKey)}
              </TooltipContent>
>>>>>>> v0.29.6
            </Tooltip>
          );
        })}
      </div>

      <div className="flex-1" />

      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => {
              setMoreOpen((v) => !v);
            }}
            aria-label={t("rail.more.label")}
            aria-expanded={moreOpen}
            className={cn(
              "grid size-7 shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-100",
              moreOpen
<<<<<<< HEAD
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-card-foreground",
=======
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
>>>>>>> v0.29.6
            )}
          >
            <GoKebabHorizontal className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{t("rail.more.label")}</TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => {
              onNavigate("settings");
            }}
            aria-label={t("rail.settings")}
            aria-current={currentPage === "settings" ? "page" : undefined}
            className={cn(
              "relative grid size-7 shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-100",
              currentPage === "settings"
<<<<<<< HEAD
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-card-foreground",
            )}
          >
            {currentPage === "settings" && (
              <span
                aria-hidden="true"
                className="absolute inset-y-1.5 left-[-7px] w-[2px] rounded-full bg-foreground"
              />
            )}
=======
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {currentPage === "settings" && <ActiveIndicator />}
>>>>>>> v0.29.6
            <GoGear className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{t("rail.settings")}</TooltipContent>
      </Tooltip>

      {moreOpen && (
        <>
          <button
            type="button"
            aria-label={t("rail.more.closeAriaLabel")}
            className="fixed inset-0 z-30 cursor-default bg-transparent"
            onClick={() => {
              setMoreOpen(false);
            }}
          />
<<<<<<< HEAD
          <div className="absolute bottom-14 left-11 z-40 w-56 animate-in rounded-lg border border-border bg-card p-1 shadow-2xl duration-100 fade-in-0 slide-in-from-bottom-1">
=======
          <div
            role="menu"
            aria-label={t("rail.more.label")}
            className="surface-material-card absolute bottom-14 left-11 z-40 w-56 animate-in rounded-lg border border-border p-1 shadow-2xl duration-100 fade-in-0 slide-in-from-bottom-1"
          >
>>>>>>> v0.29.6
            {MORE_ITEMS.map(({ page, Icon, labelKey, hintKey }) => (
              <button
                key={page}
                type="button"
<<<<<<< HEAD
=======
                role="menuitem"
>>>>>>> v0.29.6
                onClick={() => {
                  setMoreOpen(false);
                  onNavigate(page);
                }}
<<<<<<< HEAD
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-100 hover:bg-accent"
=======
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-100 hover:bg-accent hover:text-accent-foreground"
>>>>>>> v0.29.6
              >
                <span className="grid size-5 shrink-0 place-items-center rounded bg-muted text-muted-foreground">
                  <Icon className="size-3" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-xs font-medium text-foreground">
                    {t(labelKey)}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    {t(hintKey)}
                  </span>
                </span>
              </button>
            ))}
<<<<<<< HEAD
=======
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMoreOpen(false);
                onOpenAbout();
              }}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-100 hover:bg-accent hover:text-accent-foreground"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded bg-muted text-muted-foreground">
                <LuInfo className="size-3" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-medium text-foreground">
                  {t("rail.more.about")}
                </span>
                <span className="truncate text-[10px] text-muted-foreground">
                  {t("rail.more.aboutHint")}
                </span>
              </span>
            </button>
>>>>>>> v0.29.6
          </div>
        </>
      )}
    </nav>
  );
}
