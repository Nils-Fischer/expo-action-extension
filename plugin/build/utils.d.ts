import type { ExpoConfig } from "@expo/config-types";
import type { ActivationRule, ActionExtensionConfig } from "./types";
/**
 * Sanitizes a name for use in target/bundle identifiers.
 * Removes special chars, ensures valid identifier format.
 */
export declare function sanitizeName(name: string): string;
/**
 * Gets the target name for an extension.
 * Uses explicit targetName if provided, otherwise derives from name.
 * @example getTargetName({ name: "Share with Locatr" }) → "SharewithLocatrActionExtension"
 * @example getTargetName({ name: "Share with Locatr", targetName: "LocatrActionExtension" }) → "LocatrActionExtension"
 */
export declare function getTargetName(extension: ActionExtensionConfig): string;
/**
 * Gets the bundle identifier for an extension.
 * @example getBundleIdentifier(config, ext) → "com.example.app.LocatrActionExtension"
 */
export declare function getBundleIdentifier(config: ExpoConfig, extension: ActionExtensionConfig): string;
/**
 * Gets the app's bundle identifier.
 */
export declare function getAppBundleIdentifier(config: ExpoConfig): string;
/**
 * Gets the default app group for the app.
 */
export declare function getAppGroup(config: ExpoConfig): string;
/**
 * Gets the host app's URL scheme.
 */
export declare function getHostAppScheme(config: ExpoConfig): string;
/**
 * Gets the entitlements file name for an extension.
 * @example getEntitlementsFileName(ext) → "LocatrActionExtension.entitlements"
 */
export declare function getEntitlementsFileName(extension: ActionExtensionConfig): string;
/**
 * Gets the default module name for an extension.
 * Defaults to "actionExtension" unless overridden.
 */
export declare function getModuleName(extension: ActionExtensionConfig): string;
/**
 * Gets the entry file for an extension.
 * Defaults to "index.action.js" unless overridden.
 */
export declare function getEntryFile(extension: ActionExtensionConfig): string;
/**
 * Converts activation rules to NSExtensionActivationRule format.
 */
export declare function buildActivationRules(rules: ActivationRule[]): Record<string, number | boolean>;
/**
 * Gets the default activation rules if none are specified.
 */
export declare function getDefaultActivationRules(): ActivationRule[];
/**
 * Gets the default excluded packages for extension builds.
 * These packages either use APIs unavailable in app extensions
 * (like UIApplication.shared) or cause issues in extension context.
 */
export declare function getDefaultExcludedPackages(): string[];
//# sourceMappingURL=utils.d.ts.map