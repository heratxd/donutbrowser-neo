"use client";

import { invoke } from "@tauri-apps/api/core";
<<<<<<< HEAD
import { open } from "@tauri-apps/plugin-dialog";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFolder } from "react-icons/fa";
=======
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFileArchive, FaFolder } from "react-icons/fa";
import { LuChevronRight } from "react-icons/lu";
>>>>>>> v0.29.6
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
<<<<<<< HEAD
=======
  AnimatedDisclosureChevron,
  AnimatedDisclosureContent,
} from "@/components/ui/animated-disclosure";
import {
>>>>>>> v0.29.6
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@/components/ui/animated-tabs";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import { Checkbox } from "@/components/ui/checkbox";
>>>>>>> v0.29.6
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
=======
import { Progress } from "@/components/ui/progress";
>>>>>>> v0.29.6
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WayfernConfigForm } from "@/components/wayfern-config-form";
<<<<<<< HEAD
import { useBrowserSupport } from "@/hooks/use-browser-support";
import { useProxyEvents } from "@/hooks/use-proxy-events";
import { parseBackendError, translateBackendError } from "@/lib/backend-errors";
import { getBrowserDisplayName, getBrowserIcon } from "@/lib/browser-utils";
import { cn } from "@/lib/utils";
import type { DetectedProfile, WayfernConfig } from "@/types";
import { RippleButton } from "./ui/ripple";

const getMappedBrowser = (_browser: string): "wayfern" => {
  return "wayfern";
};
=======
import { useGroupEvents } from "@/hooks/use-group-events";
import { useProxyEvents } from "@/hooks/use-proxy-events";
import { useVpnEvents } from "@/hooks/use-vpn-events";
import { translateBackendError } from "@/lib/backend-errors";
import { getBrowserDisplayName, getBrowserIcon } from "@/lib/browser-utils";
import { fireSprinkleConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import type {
  ArchiveScanResult,
  DetectedProfile,
  ImportProfileItem,
  ProfileImportBatchResult,
  ProfileImportProgress,
  ProfileImportReport,
  WayfernConfig,
} from "@/types";
import { RippleButton } from "./ui/ripple";

/**
 * What an import actually carried, and what it could not.
 *
 * The counts matter more than they look: an import that reports zero of
 * everything is the exact symptom of the bug where copied data landed where
 * the browser never reads it, and it used to be indistinguishable from success.
 */
function ImportReportSummary({ report }: { report: ProfileImportReport }) {
  const { t } = useTranslation();

  // Label-then-value rather than "{{count}} cookies": it keeps the row scannable
  // and sidesteps needing correct plural forms in ten languages.
  const carried = (
    [
      ["importProfile.reportCookies", report.cookies_migrated],
      ["importProfile.reportPasswords", report.passwords_migrated],
      ["importProfile.reportAutofill", report.payment_methods_migrated],
      ["importProfile.reportExtensions", report.extensions_migrated],
      ["importProfile.reportHistory", report.history_entries],
      ["importProfile.reportBookmarks", report.bookmarks],
      ["importProfile.reportLocalStorage", report.local_storage_origins],
    ] as const
  )
    .filter(([, count]) => count > 0)
    .map(([key, count]) => `${t(key)} ${count.toLocaleString()}`);

  const unrecoverable =
    report.cookies_unrecoverable +
    report.passwords_unrecoverable +
    report.payment_methods_unrecoverable;

  return (
    <div className="mt-0.5 space-y-0.5 pl-1 text-xs text-muted-foreground">
      <p>
        {carried.length > 0
          ? carried.join(" · ")
          : t("importProfile.reportNothingCarried")}
      </p>
      {unrecoverable > 0 && (
        <p>
          {t("importProfile.reportUnrecoverable", { count: unrecoverable })}
        </p>
      )}
      {report.warnings.map((code) => (
        <p key={code} className="text-warning-text">
          {t(`importProfile.warnings.${code}`)}
        </p>
      ))}
    </div>
  );
}

/**
 * Fold a retry's results back into the batch it came from.
 *
 * A retry only resubmits the items that failed, so the previous batch is still
 * authoritative for every other row. Replacing it wholesale would make the
 * successful imports disappear from the summary.
 */
function mergeImportResults(
  previous: ProfileImportBatchResult,
  retry: ProfileImportBatchResult,
): ProfileImportBatchResult {
  const byPath = new Map(retry.results.map((item) => [item.source_path, item]));
  const results = previous.results.map(
    (item) => byPath.get(item.source_path) ?? item,
  );
  const count = (status: string) =>
    results.filter((item) => item.status === status).length;
  return {
    imported_count: count("imported"),
    skipped_count: count("skipped"),
    failed_count: count("failed"),
    results,
  };
}
>>>>>>> v0.29.6

interface ImportProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
<<<<<<< HEAD
  subPage?: boolean;
}

export function ImportProfileDialog({
  isOpen,
  onClose,
  subPage,
}: ImportProfileDialogProps) {
  const { t } = useTranslation();
  const [detectedProfiles, setDetectedProfiles] = useState<DetectedProfile[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMode, setImportMode] = useState<"auto-detect" | "manual">(
    "auto-detect",
  );
  const [currentStep, setCurrentStep] = useState<"select" | "configure">(
    "select",
  );
  const [wayfernConfig, setWayfernConfig] = useState<WayfernConfig>({});
  const [selectedProxyId, setSelectedProxyId] = useState<string | undefined>();

  // Auto-detect state
  const [selectedDetectedProfile, setSelectedDetectedProfile] = useState<
    string | null
  >(null);
  const [autoDetectProfileName, setAutoDetectProfileName] = useState("");

  // Manual import state
  const [manualBrowserType, setManualBrowserType] = useState<string | null>(
    null,
  );
  const [manualProfilePath, setManualProfilePath] = useState("");
  const [manualProfileName, setManualProfileName] = useState("");

  const { supportedBrowsers, isLoading: isLoadingSupport } =
    useBrowserSupport();
  const { storedProxies } = useProxyEvents();

  // Only Chromium-family browsers can be imported as Wayfern profiles.
  const importableBrowsers = supportedBrowsers.filter(
    (browser) => getMappedBrowser(browser) === "wayfern",
  );

=======
  crossOsUnlocked?: boolean;
  subPage?: boolean;
}

type Step = "select" | "configure" | "importing";
type ImportMode = "auto-detect" | "manual";
type DuplicateStrategy = "rename" | "skip";

export function ImportProfileDialog({
  isOpen,
  onClose,
  crossOsUnlocked,
  subPage,
}: ImportProfileDialogProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>("select");
  const [importMode, setImportMode] = useState<ImportMode>("auto-detect");

  const [detectedProfiles, setDetectedProfiles] = useState<DetectedProfile[]>(
    [],
  );
  const [scannedProfiles, setScannedProfiles] = useState<DetectedProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [manualPath, setManualPath] = useState("");
  const [extractedDir, setExtractedDir] = useState<string | null>(null);

  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [profileNames, setProfileNames] = useState<Record<string, string>>({});

  const [selectedGroupId, setSelectedGroupId] = useState<string>("none");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [duplicateStrategy, setDuplicateStrategy] =
    useState<DuplicateStrategy>("rename");
  // "none" | "round-robin" | a stored proxy id
  const [proxyAssignment, setProxyAssignment] = useState<string>("none");
  // "none" | a VPN config id (applied to every imported profile)
  const [vpnAssignment, setVpnAssignment] = useState<string>("none");
  const [wayfernConfig, setWayfernConfig] = useState<WayfernConfig>({});
  // Fingerprint + advanced options collapse behind disclosures — the default
  // path is just names + proxy/VPN.
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<ProfileImportProgress | null>(null);
  const [result, setResult] = useState<ProfileImportBatchResult | null>(null);

  const { storedProxies } = useProxyEvents();
  const { groups } = useGroupEvents();
  const { vpnConfigs } = useVpnEvents();
  const reducedMotion = useReducedMotion();

  const activeProfiles =
    importMode === "auto-detect" ? detectedProfiles : scannedProfiles;
  const selectedProfiles = useMemo(
    () => activeProfiles.filter((p) => selectedPaths.has(p.path)),
    [activeProfiles, selectedPaths],
  );

  const registerProfileNames = useCallback((profiles: DetectedProfile[]) => {
    setProfileNames((prev) => {
      const next = { ...prev };
      for (const profile of profiles) {
        if (next[profile.path] === undefined) {
          next[profile.path] = profile.name;
        }
      }
      return next;
    });
  }, []);

>>>>>>> v0.29.6
  const loadDetectedProfiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const profiles = await invoke<DetectedProfile[]>(
        "detect_existing_profiles",
      );
      setDetectedProfiles(profiles);
<<<<<<< HEAD

      if (profiles.length === 0) {
        setImportMode("manual");
      } else {
        setSelectedDetectedProfile(profiles[0].path);

        const profile = profiles[0];
        const browserName = getBrowserDisplayName(profile.browser);
        const defaultName = `Imported ${browserName} Profile`;
        setAutoDetectProfileName(defaultName);
=======
      registerProfileNames(profiles);
      if (profiles.length === 0) {
        setImportMode("manual");
>>>>>>> v0.29.6
      }
    } catch (error) {
      console.error("Failed to detect existing profiles:", error);
      toast.error(t("importProfile.detectFailed"));
    } finally {
      setIsLoading(false);
    }
<<<<<<< HEAD
  }, [t]);

  const selectedProfile = detectedProfiles.find(
    (p) => p.path === selectedDetectedProfile,
=======
  }, [t, registerProfileNames]);

  const cleanupExtractedDir = useCallback(async (dir: string | null) => {
    if (!dir) return;
    try {
      await invoke("cleanup_profile_import_scratch", { extractedDir: dir });
    } catch (error) {
      console.error("Failed to clean up extracted archive:", error);
    }
  }, []);

  const applyScanResult = useCallback(
    (profiles: DetectedProfile[]) => {
      setScannedProfiles(profiles);
      registerProfileNames(profiles);
      setSelectedPaths(new Set(profiles.map((p) => p.path)));
      if (profiles.length === 0) {
        toast.info(t("importProfile.noProfilesInLocation"));
      }
    },
    [registerProfileNames, t],
  );

  const scanPath = useCallback(
    async (path: string) => {
      setIsScanning(true);
      try {
        if (path.toLowerCase().endsWith(".zip")) {
          await cleanupExtractedDir(extractedDir);
          setExtractedDir(null);
          const scan = await invoke<ArchiveScanResult>("scan_profile_archive", {
            archivePath: path,
          });
          setExtractedDir(scan.extracted_dir);
          applyScanResult(scan.profiles);
        } else {
          const profiles = await invoke<DetectedProfile[]>(
            "scan_folder_for_profiles",
            { folderPath: path },
          );
          applyScanResult(profiles);
        }
      } catch (error) {
        console.error("Failed to scan for profiles:", error);
        toast.error(translateBackendError(t, error));
      } finally {
        setIsScanning(false);
      }
    },
    [applyScanResult, cleanupExtractedDir, extractedDir, t],
>>>>>>> v0.29.6
  );

  const handleBrowseFolder = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
        title: t("importProfile.selectFolderTitle"),
      });
<<<<<<< HEAD

      if (selected && typeof selected === "string") {
        setManualProfilePath(selected);
=======
      if (selected && typeof selected === "string") {
        setManualPath(selected);
        await scanPath(selected);
>>>>>>> v0.29.6
      }
    } catch (error) {
      console.error("Failed to open folder dialog:", error);
      toast.error(t("importProfile.folderDialogFailed"));
    }
  };

<<<<<<< HEAD
  const handleImport = useCallback(async () => {
    let sourcePath: string;
    let browserType: string;
    let newProfileName: string;

    if (importMode === "auto-detect") {
      if (!selectedDetectedProfile || !autoDetectProfileName.trim()) {
        toast.error(t("importProfile.selectAndName"));
        return;
      }
      const profile = detectedProfiles.find(
        (p) => p.path === selectedDetectedProfile,
      );
      if (!profile) {
        toast.error(t("importProfile.profileNotFound"));
        return;
      }
      sourcePath = profile.path;
      browserType = profile.browser;
      newProfileName = autoDetectProfileName.trim();
    } else {
      if (
        !manualBrowserType ||
        !manualProfilePath.trim() ||
        !manualProfileName.trim()
      ) {
        toast.error(t("importProfile.fillFields"));
        return;
      }
      sourcePath = manualProfilePath.trim();
      browserType = manualBrowserType;
      newProfileName = manualProfileName.trim();
    }

    const mappedBrowser =
      importMode === "auto-detect" && selectedProfile
        ? getMappedBrowser(selectedProfile.mapped_browser)
        : getMappedBrowser(browserType);

    setIsImporting(true);
    try {
      await invoke("import_browser_profile", {
        sourcePath,
        browserType,
        newProfileName,
        proxyId: selectedProxyId ?? null,
        wayfernConfig: mappedBrowser === "wayfern" ? wayfernConfig : null,
      });

      toast.success(
        t("importProfile.importedSuccess", { name: newProfileName }),
      );
      onClose();
    } catch (error) {
      console.error("Failed to import profile:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (parseBackendError(error)) {
        // Structured backend error (e.g. CAMOUFOX_IMPORT_DEPRECATED) — localize.
        toast.error(translateBackendError(t, error));
      } else if (errorMessage.includes("No downloaded versions found")) {
        const browserDisplayName = getBrowserDisplayName(browserType);
        toast.error(
          t("importProfile.notInstalled", { browser: browserDisplayName }),
          {
            duration: 8000,
          },
        );
      } else {
        toast.error(t("importProfile.importFailed", { error: errorMessage }));
      }
    } finally {
      setIsImporting(false);
    }
  }, [
    importMode,
    selectedDetectedProfile,
    autoDetectProfileName,
    detectedProfiles,
    manualBrowserType,
    manualProfilePath,
    manualProfileName,
    selectedProxyId,
    wayfernConfig,
    onClose,
    selectedProfile,
    t,
  ]);

  const handleClose = () => {
    setCurrentStep("select");
    setWayfernConfig({});
    setSelectedProxyId(undefined);
    setSelectedDetectedProfile(null);
    setAutoDetectProfileName("");
    setManualBrowserType(null);
    setManualProfilePath("");
    setManualProfileName("");
    if (detectedProfiles.length > 0) {
      setImportMode("auto-detect");
    } else {
      setImportMode("manual");
    }
    onClose();
  };

  useEffect(() => {
    if (selectedDetectedProfile) {
      const profile = detectedProfiles.find(
        (p) => p.path === selectedDetectedProfile,
      );
      if (profile) {
        const browserName = getBrowserDisplayName(profile.browser);
        const defaultName = `Old ${browserName}`;
        setAutoDetectProfileName(defaultName);
      }
    }
  }, [selectedDetectedProfile, detectedProfiles]);

  const currentMappedBrowser = useMemo(() => {
    if (importMode === "auto-detect" && selectedProfile) {
      return getMappedBrowser(selectedProfile.mapped_browser);
    }
    if (importMode === "manual" && manualBrowserType) {
      return getMappedBrowser(manualBrowserType);
    }
    return null;
  }, [importMode, selectedProfile, manualBrowserType]);

  const canProceedToNext = useMemo(() => {
    if (importMode === "auto-detect") {
      return (
        !isLoading &&
        !!selectedDetectedProfile &&
        !!autoDetectProfileName.trim()
      );
    }
    return (
      !!manualBrowserType &&
      !!manualProfilePath.trim() &&
      !!manualProfileName.trim()
    );
  }, [
    importMode,
    isLoading,
    selectedDetectedProfile,
    autoDetectProfileName,
    manualBrowserType,
    manualProfilePath,
    manualProfileName,
  ]);
=======
  const handleBrowseArchive = async () => {
    try {
      const selected = await open({
        multiple: false,
        title: t("importProfile.selectArchiveTitle"),
        filters: [{ name: "ZIP", extensions: ["zip"] }],
      });
      if (selected && typeof selected === "string") {
        setManualPath(selected);
        await scanPath(selected);
      }
    } catch (error) {
      console.error("Failed to open archive dialog:", error);
      toast.error(t("importProfile.folderDialogFailed"));
    }
  };

  const togglePath = (path: string, checked: boolean) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(path);
      } else {
        next.delete(path);
      }
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelectedPaths(
      checked ? new Set(activeProfiles.map((p) => p.path)) : new Set(),
    );
  };

  const proxyIdForIndex = useCallback(
    (index: number): string | null => {
      if (proxyAssignment === "none") return null;
      if (proxyAssignment === "round-robin") {
        if (storedProxies.length === 0) return null;
        return storedProxies[index % storedProxies.length].id;
      }
      return proxyAssignment;
    },
    [proxyAssignment, storedProxies],
  );

  const handleCreateGroup = async () => {
    const name = newGroupName.trim();
    if (!name) return;
    try {
      const group = await invoke<{ id: string; name: string }>(
        "create_profile_group",
        { name },
      );
      setSelectedGroupId(group.id);
      setIsCreatingGroup(false);
      setNewGroupName("");
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error(translateBackendError(t, error));
    }
  };

  const handleImport = useCallback(
    async (allowRunning = false, retryPaths?: ReadonlySet<string>) => {
      if (selectedProfiles.length === 0) {
        toast.error(t("importProfile.selectAtLeastOne"));
        return;
      }
      if (
        selectedProfiles.some((p) => !(profileNames[p.path] ?? p.name).trim())
      ) {
        toast.error(t("importProfile.emptyNames"));
        return;
      }

      // Filter AFTER the map, so a retry keeps the proxy each profile was
      // originally assigned by the index-based round-robin.
      const items: ImportProfileItem[] = selectedProfiles
        .map((p, index) => ({
          source_path: p.path,
          browser_type: p.browser,
          new_profile_name: (profileNames[p.path] ?? p.name).trim(),
          proxy_id: proxyIdForIndex(index),
          vpn_id: vpnAssignment === "none" ? null : vpnAssignment,
          allow_running: allowRunning,
        }))
        .filter((item) => !retryPaths || retryPaths.has(item.source_path));

      if (items.length === 0) {
        return;
      }

      setCurrentStep("importing");
      setIsImporting(true);
      setProgress(null);
      // A retry covers only the failed subset, so the earlier results are still
      // the truth for everything else and must not be thrown away.
      const previous = retryPaths ? result : null;
      setResult(null);
      try {
        const batchResult = await invoke<ProfileImportBatchResult>(
          "import_browser_profiles",
          {
            items,
            groupId: selectedGroupId === "none" ? null : selectedGroupId,
            duplicateStrategy: duplicateStrategy,
            wayfernConfig,
          },
        );
        setResult(
          previous ? mergeImportResults(previous, batchResult) : batchResult,
        );
        toast.success(
          t("importProfile.resultsSummary", {
            imported: batchResult.imported_count,
            skipped: batchResult.skipped_count,
            failed: batchResult.failed_count,
          }),
        );
        if (batchResult.imported_count > 0 && !reducedMotion) {
          fireSprinkleConfetti();
        }
      } catch (error) {
        console.error("Failed to import profiles:", error);
        toast.error(translateBackendError(t, error));
        setCurrentStep("configure");
      } finally {
        setIsImporting(false);
      }
    },
    [
      selectedProfiles,
      profileNames,
      proxyIdForIndex,
      vpnAssignment,
      selectedGroupId,
      duplicateStrategy,
      wayfernConfig,
      reducedMotion,
      result,
      t,
    ],
  );

  // A source browser that is still running is the one failure the user can fix
  // without starting over, so offer the override right where it happened.
  const hasRunningBrowserFailure = useMemo(
    () =>
      (result?.results ?? []).some(
        (item) =>
          item.status === "failed" &&
          item.error?.includes("IMPORT_SOURCE_BROWSER_RUNNING"),
      ),
    [result],
  );

  const handleClose = () => {
    void cleanupExtractedDir(extractedDir);
    setCurrentStep("select");
    setImportMode(detectedProfiles.length > 0 ? "auto-detect" : "manual");
    setScannedProfiles([]);
    setManualPath("");
    setExtractedDir(null);
    setSelectedPaths(new Set());
    setProfileNames({});
    setSelectedGroupId("none");
    setIsCreatingGroup(false);
    setNewGroupName("");
    setDuplicateStrategy("rename");
    setProxyAssignment("none");
    setVpnAssignment("none");
    setWayfernConfig({});
    setShowFingerprint(false);
    setShowAdvanced(false);
    setProgress(null);
    setResult(null);
    onClose();
  };
>>>>>>> v0.29.6

  useEffect(() => {
    if (isOpen) {
      void loadDetectedProfiles();
    }
  }, [isOpen, loadDetectedProfiles]);

<<<<<<< HEAD
  return (
    <Dialog open={isOpen} onOpenChange={onClose} subPage={subPage}>
=======
  useEffect(() => {
    if (!isOpen) return;
    const unlistenPromise = listen<ProfileImportProgress>(
      "profile-import-progress",
      (event) => {
        setProgress(event.payload);
      },
    );
    return () => {
      void unlistenPromise.then((unlisten) => unlisten());
    };
  }, [isOpen]);

  const allSelected =
    activeProfiles.length > 0 && selectedPaths.size >= activeProfiles.length;

  const renderProfileList = (profiles: DetectedProfile[]) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="import-select-all"
          className="flex cursor-pointer items-center gap-2 text-sm"
        >
          <Checkbox
            id="import-select-all"
            checked={allSelected}
            onCheckedChange={(checked) => toggleAll(checked === true)}
          />
          {t("importProfile.selectAll")}
        </label>
        <span className="text-xs text-muted-foreground">
          {t("importProfile.selectedCount", { count: selectedPaths.size })}
        </span>
      </div>
      <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
        {profiles.map((profile) => {
          const IconComponent = getBrowserIcon(profile.browser);
          const checkboxId = `import-profile-${encodeURIComponent(profile.path)}`;
          return (
            <label
              key={profile.path}
              htmlFor={checkboxId}
              className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted"
            >
              <Checkbox
                id={checkboxId}
                checked={selectedPaths.has(profile.path)}
                onCheckedChange={(checked) =>
                  togglePath(profile.path, checked === true)
                }
              />
              {IconComponent && <IconComponent className="size-4 shrink-0" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{profile.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {profile.path}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );

  const progressPercent =
    progress && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} subPage={subPage}>
>>>>>>> v0.29.6
      <DialogContent className="flex max-h-[80vh] max-w-[min(48rem,calc(100%-4rem))] flex-col">
        {!subPage && (
          <DialogHeader className="shrink-0">
            <DialogTitle>{t("importProfile.title")}</DialogTitle>
          </DialogHeader>
        )}

<<<<<<< HEAD
        <div
          className={cn(
            "min-h-0 flex-1 space-y-6 overflow-y-auto",
            subPage && "mx-auto w-full max-w-2xl",
          )}
        >
          {currentStep === "select" && (
            <AnimatedTabs
              value={importMode}
              onValueChange={(v) =>
                setImportMode(v as "auto-detect" | "manual")
              }
              className="flex flex-col gap-6"
            >
              <AnimatedTabsList>
                <AnimatedTabsTrigger value="auto-detect" disabled={isLoading}>
                  {t("importProfile.autoDetect")}
                </AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="manual" disabled={isLoading}>
                  {t("importProfile.manualImport")}
                </AnimatedTabsTrigger>
              </AnimatedTabsList>

              <AnimatedTabsContent value="auto-detect">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("importProfile.detectedProfilesTitle")}
                  </h3>

                  {isLoading ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        {t("importProfile.scanning")}
                      </p>
                    </div>
                  ) : detectedProfiles.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        {t("importProfile.noneFound")}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t("importProfile.noneFoundHint")}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="detected-profile-select"
                          className="mb-2"
                        >
                          {t("importProfile.selectProfile")}
                        </Label>
                        <Select
                          value={selectedDetectedProfile ?? undefined}
                          onValueChange={(value) => {
                            setSelectedDetectedProfile(value);
                          }}
                        >
                          <SelectTrigger id="detected-profile-select">
                            <SelectValue
                              placeholder={t(
                                "importProfile.selectProfilePlaceholder",
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {detectedProfiles.map((profile) => {
                              const IconComponent = getBrowserIcon(
                                profile.browser,
                              );
                              return (
                                <SelectItem
                                  key={profile.path}
                                  value={profile.path}
                                >
                                  <div className="flex items-center gap-2">
                                    {IconComponent && (
                                      <IconComponent className="size-4" />
                                    )}
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {profile.name}
                                      </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      →{" "}
                                      {getBrowserDisplayName(
                                        profile.mapped_browser,
                                      )}
                                    </span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedProfile && (
                        <div className="rounded-lg bg-muted p-3">
                          <p className="text-sm break-all">
                            <span className="font-medium">
                              {t("importProfile.pathLabel")}
                            </span>{" "}
                            {selectedProfile.path}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">
                              {t("importProfile.browserLabel")}
                            </span>{" "}
                            {getBrowserDisplayName(selectedProfile.browser)}
                          </p>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="auto-profile-name" className="mb-2">
                          {t("importProfile.newProfileName")}
                        </Label>
                        <Input
                          id="auto-profile-name"
                          value={autoDetectProfileName}
                          onChange={(e) => {
                            setAutoDetectProfileName(e.target.value);
                          }}
                          placeholder={t(
                            "importProfile.newProfileNamePlaceholder",
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedTabsContent>

              <AnimatedTabsContent value="manual">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    {t("importProfile.manualTitle")}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="manual-browser-select" className="mb-2">
                        {t("importProfile.browserType")}
                      </Label>
                      <Select
                        value={manualBrowserType ?? undefined}
                        onValueChange={(value) => {
                          setManualBrowserType(value);
                        }}
                        disabled={isLoadingSupport}
                      >
                        <SelectTrigger id="manual-browser-select">
                          <SelectValue
                            placeholder={
                              isLoadingSupport
                                ? t("importProfile.loadingBrowsers")
                                : t("importProfile.selectBrowserType")
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {importableBrowsers.map((browser) => {
                            const IconComponent = getBrowserIcon(browser);
                            return (
                              <SelectItem key={browser} value={browser}>
                                <div className="flex items-center gap-2">
                                  {IconComponent && (
                                    <IconComponent className="size-4" />
                                  )}
                                  <span>{getBrowserDisplayName(browser)}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
=======
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div
            className={cn("space-y-6", subPage && "mx-auto w-full max-w-3xl")}
          >
            {currentStep === "select" && (
              <AnimatedTabs
                value={importMode}
                onValueChange={(v) => {
                  setImportMode(v as ImportMode);
                  setSelectedPaths(new Set());
                }}
                className="flex flex-col gap-6"
              >
                <AnimatedTabsList>
                  <AnimatedTabsTrigger value="auto-detect" disabled={isLoading}>
                    {t("importProfile.autoDetect")}
                  </AnimatedTabsTrigger>
                  <AnimatedTabsTrigger value="manual" disabled={isLoading}>
                    {t("importProfile.manualImport")}
                  </AnimatedTabsTrigger>
                </AnimatedTabsList>

                <AnimatedTabsContent value="auto-detect">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {t("importProfile.detectedProfilesTitle")}
                    </h3>

                    {isLoading ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">
                          {t("importProfile.scanning")}
                        </p>
                      </div>
                    ) : detectedProfiles.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">
                          {t("importProfile.noneFound")}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t("importProfile.noneFoundHint")}
                        </p>
                      </div>
                    ) : (
                      renderProfileList(detectedProfiles)
                    )}
                  </div>
                </AnimatedTabsContent>

                <AnimatedTabsContent value="manual">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      {t("importProfile.manualTitle")}
                    </h3>
>>>>>>> v0.29.6

                    <div>
                      <Label htmlFor="manual-profile-path" className="mb-2">
                        {t("importProfile.profileFolderPath")}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="manual-profile-path"
<<<<<<< HEAD
                          value={manualProfilePath}
                          onChange={(e) => {
                            setManualProfilePath(e.target.value);
=======
                          value={manualPath}
                          onChange={(e) => {
                            setManualPath(e.target.value);
>>>>>>> v0.29.6
                          }}
                          placeholder={t(
                            "importProfile.profileFolderPlaceholder",
                          )}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => void handleBrowseFolder()}
                          title={t("importProfile.browseFolderTitle")}
                        >
                          <FaFolder className="size-4" />
                        </Button>
<<<<<<< HEAD
                      </div>
=======
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => void handleBrowseArchive()}
                          title={t("importProfile.selectArchiveTitle")}
                        >
                          <FaFileArchive className="size-4" />
                        </Button>
                        <LoadingButton
                          variant="outline"
                          isLoading={isScanning}
                          disabled={!manualPath.trim()}
                          onClick={() => void scanPath(manualPath.trim())}
                        >
                          {t("importProfile.scanButton")}
                        </LoadingButton>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t("importProfile.manualHint")}
                      </p>
>>>>>>> v0.29.6
                      <p className="mt-2 text-xs break-all text-muted-foreground">
                        {t("importProfile.examplePaths")}
                        <br />
                        macOS: ~/Library/Application
                        Support/Google/Chrome/Default
                        <br />
                        Windows: %LOCALAPPDATA%\Google\Chrome\User Data\Default
                        <br />
                        Linux: ~/.config/google-chrome/Default
                      </p>
                    </div>

<<<<<<< HEAD
                    <div>
                      <Label htmlFor="manual-profile-name" className="mb-2">
                        {t("importProfile.newProfileName")}
                      </Label>
                      <Input
                        id="manual-profile-name"
                        value={manualProfileName}
                        onChange={(e) => {
                          setManualProfileName(e.target.value);
                        }}
                        placeholder={t(
                          "importProfile.newProfileNamePlaceholder",
                        )}
                      />
                    </div>
                  </div>
                </div>
              </AnimatedTabsContent>
            </AnimatedTabs>
          )}

          {currentStep === "configure" && currentMappedBrowser && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  {t("importProfile.importedAs", {
                    browser: getBrowserDisplayName(currentMappedBrowser),
                  })}
                </AlertDescription>
              </Alert>

              <div>
                <Label className="mb-2">
                  {t("importProfile.proxyOptional")}
                </Label>
                <Select
                  value={selectedProxyId ?? "none"}
                  onValueChange={(value) => {
                    setSelectedProxyId(value === "none" ? undefined : value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("importProfile.noProxy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      {t("importProfile.noProxy")}
                    </SelectItem>
                    {storedProxies.map((proxy) => (
                      <SelectItem key={proxy.id} value={proxy.id}>
                        {proxy.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <WayfernConfigForm
                config={wayfernConfig}
                onConfigChange={(key, value) => {
                  setWayfernConfig((prev) => ({ ...prev, [key]: value }));
                }}
                isCreating={true}
              />
            </div>
          )}
=======
                    {scannedProfiles.length > 0 &&
                      renderProfileList(scannedProfiles)}
                  </div>
                </AnimatedTabsContent>
              </AnimatedTabs>
            )}

            {currentStep === "configure" && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    {t("importProfile.importedAs", {
                      browser: getBrowserDisplayName("wayfern"),
                    })}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label className="mb-2">
                    {t("importProfile.profilesToImport")}
                  </Label>
                  <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-border p-2">
                    {selectedProfiles.map((profile) => (
                      <div
                        key={profile.path}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="min-w-0 flex-1 truncate text-xs text-muted-foreground"
                          title={profile.path}
                        >
                          {profile.name}
                        </span>
                        <Input
                          className="flex-1"
                          aria-label={t("importProfile.newProfileName")}
                          value={profileNames[profile.path] ?? profile.name}
                          onChange={(e) => {
                            setProfileNames((prev) => ({
                              ...prev,
                              [profile.path]: e.target.value,
                            }));
                          }}
                          placeholder={t(
                            "importProfile.newProfileNamePlaceholder",
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2">
                    {t("importProfile.proxyOptional")}
                  </Label>
                  <Select
                    value={proxyAssignment}
                    onValueChange={setProxyAssignment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("importProfile.noProxy")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        {t("importProfile.noProxy")}
                      </SelectItem>
                      {storedProxies.length > 0 && (
                        <SelectItem value="round-robin">
                          {t("importProfile.proxyRoundRobin")}
                        </SelectItem>
                      )}
                      {storedProxies.map((proxy) => (
                        <SelectItem key={proxy.id} value={proxy.id}>
                          {proxy.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {vpnConfigs.length > 0 && (
                  <div>
                    <Label className="mb-2">
                      {t("importProfile.vpnOptional")}
                    </Label>
                    <Select
                      value={vpnAssignment}
                      onValueChange={setVpnAssignment}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("importProfile.noVpn")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          {t("importProfile.noVpn")}
                        </SelectItem>
                        {vpnConfigs.map((vpn) => (
                          <SelectItem key={vpn.id} value={vpn.id}>
                            {vpn.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setShowAdvanced((v) => !v)}
                    aria-expanded={showAdvanced}
                  >
                    <AnimatedDisclosureChevron open={showAdvanced}>
                      <LuChevronRight className="size-3.5" />
                    </AnimatedDisclosureChevron>
                    {t("importProfile.advancedOptions")}
                  </button>
                  <AnimatedDisclosureContent
                    open={showAdvanced}
                    className="mt-3 space-y-4"
                  >
                    <div>
                      <Label className="mb-2">
                        {t("importProfile.groupOptional")}
                      </Label>
                      {isCreatingGroup ? (
                        <div className="flex gap-2">
                          <Input
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            placeholder={t(
                              "importProfile.newGroupNamePlaceholder",
                            )}
                          />
                          <Button
                            variant="outline"
                            disabled={!newGroupName.trim()}
                            onClick={() => void handleCreateGroup()}
                          >
                            {t("common.buttons.create")}
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsCreatingGroup(false);
                              setNewGroupName("");
                            }}
                          >
                            {t("common.buttons.cancel")}
                          </Button>
                        </div>
                      ) : (
                        <Select
                          value={selectedGroupId}
                          onValueChange={(value) => {
                            if (value === "create-new") {
                              setIsCreatingGroup(true);
                            } else {
                              setSelectedGroupId(value);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("importProfile.noGroup")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">
                              {t("importProfile.noGroup")}
                            </SelectItem>
                            {groups.map((group) => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="create-new">
                              {t("importProfile.createNewGroup")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    <div>
                      <Label className="mb-2">
                        {t("importProfile.duplicateStrategyLabel")}
                      </Label>
                      <Select
                        value={duplicateStrategy}
                        onValueChange={(value) => {
                          setDuplicateStrategy(value as DuplicateStrategy);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rename">
                            {t("importProfile.duplicateRename")}
                          </SelectItem>
                          <SelectItem value="skip">
                            {t("importProfile.duplicateSkip")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AnimatedDisclosureContent>
                </div>

                <div>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setShowFingerprint((v) => !v)}
                    aria-expanded={showFingerprint}
                  >
                    <AnimatedDisclosureChevron open={showFingerprint}>
                      <LuChevronRight className="size-3.5" />
                    </AnimatedDisclosureChevron>
                    {t("importProfile.configureFingerprint")}
                  </button>
                  <AnimatedDisclosureContent
                    open={showFingerprint}
                    className="mt-3"
                  >
                    <WayfernConfigForm
                      config={wayfernConfig}
                      onConfigChange={(key, value) => {
                        setWayfernConfig((prev) => ({ ...prev, [key]: value }));
                      }}
                      isCreating={true}
                      crossOsUnlocked={crossOsUnlocked}
                      limitedMode={!crossOsUnlocked}
                    />
                  </AnimatedDisclosureContent>
                </div>
              </div>
            )}

            {currentStep === "importing" && (
              <div className="space-y-4">
                {isImporting && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      {t("importProfile.importingTitle")}
                    </h3>
                    <Progress value={progressPercent} />
                    {progress && (
                      <p className="text-sm text-muted-foreground">
                        {t("importProfile.importProgress", {
                          completed: progress.completed,
                          total: progress.total,
                        })}
                        {progress.status === "importing" && (
                          <> — {progress.name}</>
                        )}
                      </p>
                    )}
                  </div>
                )}

                {result && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      {t("importProfile.resultsSummary", {
                        imported: result.imported_count,
                        skipped: result.skipped_count,
                        failed: result.failed_count,
                      })}
                    </h3>
                    <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
                      {result.results.map((item) => (
                        <div key={item.source_path} className="p-1 text-sm">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "shrink-0 text-xs font-medium",
                                item.status === "imported" &&
                                  "text-success-text",
                                item.status === "skipped" &&
                                  "text-muted-foreground",
                                item.status === "failed" &&
                                  "text-destructive-text",
                              )}
                            >
                              {item.status === "imported" &&
                                t("importProfile.statusImported")}
                              {item.status === "skipped" &&
                                t("importProfile.statusSkipped")}
                              {item.status === "failed" &&
                                t("importProfile.statusFailed")}
                            </span>
                            <span className="min-w-0 flex-1 truncate">
                              {item.name || item.source_path}
                            </span>
                            {item.error && (
                              <span className="min-w-0 flex-1 truncate text-xs text-destructive-text">
                                {translateBackendError(
                                  t,
                                  new Error(item.error),
                                )}
                              </span>
                            )}
                          </div>
                          {item.report && (
                            <ImportReportSummary report={item.report} />
                          )}
                        </div>
                      ))}
                    </div>

                    {hasRunningBrowserFailure && (
                      <Alert>
                        <AlertDescription className="space-y-2">
                          <p>{t("importProfile.closeSourceBrowserHint")}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              void handleImport(
                                true,
                                new Set(
                                  result.results
                                    .filter(
                                      (item) =>
                                        item.status === "failed" &&
                                        item.error?.includes(
                                          "IMPORT_SOURCE_BROWSER_RUNNING",
                                        ),
                                    )
                                    .map((item) => item.source_path),
                                ),
                              );
                            }}
                          >
                            {t("importProfile.importAnyway")}
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
>>>>>>> v0.29.6
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center justify-end gap-2",
            subPage
<<<<<<< HEAD
              ? "mx-auto w-full max-w-2xl border-t border-border pt-2"
              : undefined,
          )}
        >
          {currentStep === "select" ? (
=======
              ? "mx-auto w-full max-w-3xl border-t border-border pt-2"
              : undefined,
          )}
        >
          {currentStep === "select" && (
>>>>>>> v0.29.6
            <>
              {!subPage && (
                <RippleButton variant="outline" onClick={handleClose}>
                  {t("common.buttons.cancel")}
                </RippleButton>
              )}
              <RippleButton
<<<<<<< HEAD
                disabled={!canProceedToNext}
=======
                disabled={selectedPaths.size === 0}
>>>>>>> v0.29.6
                onClick={() => {
                  setCurrentStep("configure");
                }}
              >
                {t("importProfile.nextButton")}
              </RippleButton>
            </>
<<<<<<< HEAD
          ) : (
=======
          )}
          {currentStep === "configure" && (
>>>>>>> v0.29.6
            <>
              <RippleButton
                variant="outline"
                onClick={() => {
                  setCurrentStep("select");
                }}
              >
                {t("common.buttons.back")}
              </RippleButton>
              <LoadingButton
                isLoading={isImporting}
                onClick={() => {
                  void handleImport();
                }}
              >
<<<<<<< HEAD
                {t("importProfile.importButton")}
              </LoadingButton>
            </>
          )}
=======
                {t("importProfile.importButtonCount", {
                  count: selectedProfiles.length,
                })}
              </LoadingButton>
            </>
          )}
          {currentStep === "importing" && (
            <RippleButton disabled={isImporting} onClick={handleClose}>
              {t("common.buttons.close")}
            </RippleButton>
          )}
>>>>>>> v0.29.6
        </div>
      </DialogContent>
    </Dialog>
  );
}
