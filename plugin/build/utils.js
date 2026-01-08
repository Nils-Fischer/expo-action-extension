"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeName = sanitizeName;
exports.getTargetName = getTargetName;
exports.getBundleIdentifier = getBundleIdentifier;
exports.getAppBundleIdentifier = getAppBundleIdentifier;
exports.getAppGroup = getAppGroup;
exports.getHostAppScheme = getHostAppScheme;
exports.getEntitlementsFileName = getEntitlementsFileName;
exports.getModuleName = getModuleName;
exports.getEntryFile = getEntryFile;
exports.buildActivationRules = buildActivationRules;
exports.getDefaultActivationRules = getDefaultActivationRules;
exports.getDefaultExcludedPackages = getDefaultExcludedPackages;
const config_plugins_1 = require("expo/config-plugins");
/**
 * Sanitizes a name for use in target/bundle identifiers.
 * Removes special chars, ensures valid identifier format.
 */
function sanitizeName(name) {
    // Use Expo's built-in sanitizer
    return config_plugins_1.IOSConfig.XcodeUtils.sanitizedName(name);
}
/**
 * Gets the target name for an extension.
 * @example getTargetName("SavePlace") → "SavePlaceActionExtension"
 */
function getTargetName(extensionName) {
    return `${sanitizeName(extensionName)}ActionExtension`;
}
/**
 * Gets the bundle identifier for an extension.
 * @example getBundleIdentifier(config, "SavePlace") → "com.example.app.SavePlaceActionExtension"
 */
function getBundleIdentifier(config, extensionName) {
    const appBundleId = config.ios?.bundleIdentifier ?? "";
    return `${appBundleId}.${getTargetName(extensionName)}`;
}
/**
 * Gets the app's bundle identifier.
 */
function getAppBundleIdentifier(config) {
    return config.ios?.bundleIdentifier ?? "";
}
/**
 * Gets the default app group for the app.
 */
function getAppGroup(config) {
    return `group.${getAppBundleIdentifier(config)}`;
}
/**
 * Gets the host app's URL scheme.
 */
function getHostAppScheme(config) {
    return config.scheme ?? "";
}
/**
 * Gets the entitlements file name for an extension.
 * @example getEntitlementsFileName("SavePlace") → "SavePlaceActionExtension.entitlements"
 */
function getEntitlementsFileName(extensionName) {
    return `${getTargetName(extensionName)}.entitlements`;
}
/**
 * Gets the default module name for an extension.
 * Defaults to "actionExtension" unless overridden.
 */
function getModuleName(extension) {
    return extension.moduleName ?? "actionExtension";
}
/**
 * Gets the entry file for an extension.
 * Defaults to "index.action.js" unless overridden.
 */
function getEntryFile(extension) {
    return extension.entryFile ?? "index.action.js";
}
/**
 * Converts activation rules to NSExtensionActivationRule format.
 */
function buildActivationRules(rules) {
    const result = {};
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
function getDefaultActivationRules() {
    return [{ type: "url" }, { type: "text" }];
}
/**
 * Gets the default excluded packages for extension builds.
 * These packages either use APIs unavailable in app extensions
 * (like UIApplication.shared) or cause issues in extension context.
 */
function getDefaultExcludedPackages() {
    return [
        "expo-dev-client",
        "expo-splash-screen",
        "expo-updates",
        "expo-font",
        "react-native-keyboard-controller", // Uses UIApplication.shared
        "react-native-screens", // Uses UIApplication.sharedApplication
    ];
}
//# sourceMappingURL=utils.js.map