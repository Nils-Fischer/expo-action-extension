import type { ExpoConfig } from "@expo/config-types";
import { IOSConfig } from "expo/config-plugins";
import type { ActivationRule, ActionExtensionConfig } from "./types";

/**
 * Sanitizes a name for use in target/bundle identifiers.
 * Removes special chars, ensures valid identifier format.
 */
export function sanitizeName(name: string): string {
  // Use Expo's built-in sanitizer
  return IOSConfig.XcodeUtils.sanitizedName(name);
}

/**
 * Gets the target name for an extension.
 * Uses explicit targetName if provided, otherwise derives from name.
 * @example getTargetName({ name: "Share with Locatr" }) → "SharewithLocatrActionExtension"
 * @example getTargetName({ name: "Share with Locatr", targetName: "LocatrActionExtension" }) → "LocatrActionExtension"
 */
export function getTargetName(extension: ActionExtensionConfig): string {
  if (extension.targetName) {
    return extension.targetName;
  }
  return `${sanitizeName(extension.name)}ActionExtension`;
}

/**
 * Gets the bundle identifier for an extension.
 * @example getBundleIdentifier(config, ext) → "com.example.app.LocatrActionExtension"
 */
export function getBundleIdentifier(config: ExpoConfig, extension: ActionExtensionConfig): string {
  const appBundleId = config.ios?.bundleIdentifier ?? "";
  return `${appBundleId}.${getTargetName(extension)}`;
}

/**
 * Gets the app's bundle identifier.
 */
export function getAppBundleIdentifier(config: ExpoConfig): string {
  return config.ios?.bundleIdentifier ?? "";
}

/**
 * Gets the default app group for the app.
 */
export function getAppGroup(config: ExpoConfig): string {
  return `group.${getAppBundleIdentifier(config)}`;
}

/**
 * Gets the host app's URL scheme.
 */
export function getHostAppScheme(config: ExpoConfig): string {
  return (config.scheme as string) ?? "";
}

/**
 * Gets the entitlements file name for an extension.
 * @example getEntitlementsFileName(ext) → "LocatrActionExtension.entitlements"
 */
export function getEntitlementsFileName(extension: ActionExtensionConfig): string {
  return `${getTargetName(extension)}.entitlements`;
}

/**
 * Gets the default module name for an extension.
 * Defaults to "actionExtension" unless overridden.
 */
export function getModuleName(extension: ActionExtensionConfig): string {
  return extension.moduleName ?? "actionExtension";
}

/**
 * Gets the entry file for an extension.
 * Defaults to "index.action.js" unless overridden.
 */
export function getEntryFile(extension: ActionExtensionConfig): string {
  return extension.entryFile ?? "index.action.js";
}

/**
 * Converts activation rules to NSExtensionActivationRule format.
 */
export function buildActivationRules(rules: ActivationRule[]): Record<string, number | boolean> {
  const result: Record<string, number | boolean> = {};

  for (const rule of rules) {
    switch (rule.type) {
      case "url":
        result.NSExtensionActivationSupportsWebURLWithMaxCount = rule.max ?? 1;
        break;
      case "text":
        result.NSExtensionActivationSupportsText = true;
        break;
      case "image":
        result.NSExtensionActivationSupportsImageWithMaxCount = rule.max ?? 1;
        break;
      case "video":
        result.NSExtensionActivationSupportsMovieWithMaxCount = rule.max ?? 1;
        break;
      case "file":
        result.NSExtensionActivationSupportsFileWithMaxCount = rule.max ?? 1;
        break;
    }
  }

  return result;
}

/**
 * Gets the default activation rules if none are specified.
 */
export function getDefaultActivationRules(): ActivationRule[] {
  return [{ type: "url" }, { type: "text" }];
}

/**
 * Gets the default excluded packages for extension builds.
 * These packages either use APIs unavailable in app extensions
 * (like UIApplication.shared) or cause issues in extension context.
 */
export function getDefaultExcludedPackages(): string[] {
  return [
    "expo-dev-client",
    "expo-splash-screen",
    "expo-updates",
    "expo-font",
    "react-native-keyboard-controller", // Uses UIApplication.shared
    "react-native-screens", // Uses UIApplication.sharedApplication
  ];
}
