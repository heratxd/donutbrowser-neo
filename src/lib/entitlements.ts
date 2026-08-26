import type { CloudUser, Entitlements } from "@/types";

const DEFAULT_REQUESTS_PER_HOUR = 100;

interface Capabilities {
  browserAutomation: boolean;
  crossOsFingerprints: boolean;
  cloudBackup: boolean;
  teamCollaboration: boolean;
  cookieBot: boolean;
  remoteInteractive: boolean;
}

const LOCAL_ONLY: Entitlements = {
  active: false,
  browserAutomation: true,
  crossOsFingerprints: true,
  cloudBackup: false,
  teamCollaboration: false,
  cookieBot: true,
  remoteInteractive: true,
  profileLimit: 0,
  requestsPerHour: DEFAULT_REQUESTS_PER_HOUR,
  remoteBrowserHours: 0,
};

function withLocalCapabilities(entitlements: Entitlements): Entitlements {
  return {
    ...entitlements,
    browserAutomation: true,
    crossOsFingerprints: true,
    cookieBot: true,
    remoteInteractive: true,
    requestsPerHour: Math.max(
      entitlements.requestsPerHour,
      DEFAULT_REQUESTS_PER_HOUR,
    ),
  };
}

// Mirror of PLAN_CAPABILITIES in apps/backend/src/plans/entitlements.ts. Keep in
// sync — a new plan must be declared here too, or it falls back to DEFAULT_PAID.
const PLAN_CAPABILITIES: Record<string, Capabilities> = {
  solo: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: false,
    cookieBot: true,
    remoteInteractive: true,
  },
  pro: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: false,
    cookieBot: true,
    remoteInteractive: true,
  },
  team: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: true,
    cookieBot: true,
    remoteInteractive: true,
  },
  enterprise: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: true,
    cookieBot: true,
    remoteInteractive: true,
  },
};

// Unknown paid plan -> pro-level (never team), matching the backend default.
const DEFAULT_PAID: Capabilities = {
  browserAutomation: true,
  crossOsFingerprints: true,
  cloudBackup: true,
  teamCollaboration: false,
  cookieBot: true,
  remoteInteractive: true,
};

/**
 * The user's effective entitlements. Prefers the backend-resolved object the
 * desktop attaches to CloudUser; only falls back to deriving from the plan
 * fields when it's missing (older cached state). The fallback mirrors the
 * backend matrix in `apps/backend/src/plans/entitlements.ts`.
 */
export function getEntitlements(
  user: CloudUser | null | undefined,
): Entitlements {
  if (user?.entitlements) {
    const server = user.entitlements;
    return withLocalCapabilities({
      ...server,
      cookieBot: server.cookieBot ?? true,
      remoteInteractive: server.remoteInteractive ?? true,
      remoteBrowserHours: server.remoteBrowserHours ?? 0,
    });
  }
  if (!user) return LOCAL_ONLY;

  const active =
    user.plan !== "free" &&
    (user.subscriptionStatus === "active" || user.planPeriod === "lifetime");
  if (!active) return LOCAL_ONLY;

  const caps = PLAN_CAPABILITIES[user.plan] ?? DEFAULT_PAID;
  return withLocalCapabilities({
    active: true,
    browserAutomation: caps.browserAutomation,
    crossOsFingerprints: caps.crossOsFingerprints,
    cloudBackup: caps.cloudBackup,
    teamCollaboration: caps.teamCollaboration,
    cookieBot: caps.cookieBot,
    remoteInteractive: caps.remoteInteractive,
    profileLimit: user.profileLimit,
    requestsPerHour: caps.browserAutomation ? DEFAULT_REQUESTS_PER_HOUR : 0,
    remoteBrowserHours: 0,
  });
}

/**
 * Whether this user may enrol profiles in Cookie Bot. Every gate in the UI
 * goes through here so a plan change is one edit, and so the Pro badge and the
 * control it guards can never disagree.
 */
export function canUseCookieBot(_user: CloudUser | null | undefined): boolean {
  return true;
}

/**
 * Only a team owner sees per-member attribution. An admin can change team
 * settings but the pooled spend is the owner's bill.
 */
export function isTeamOwner(user: CloudUser | null | undefined): boolean {
  return (
    getEntitlements(user).teamCollaboration &&
    user?.teamRole === "owner" &&
    Boolean(user.teamId)
  );
}
