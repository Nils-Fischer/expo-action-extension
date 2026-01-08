"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const withAppEntitlements_1 = require("./withAppEntitlements");
const withAppInfoPlist_1 = require("./withAppInfoPlist");
const withExpoConfig_1 = require("./withExpoConfig");
const withPodfile_1 = require("./withPodfile");
const withActionExtensionInfoPlist_1 = require("./withActionExtensionInfoPlist");
const withActionExtensionEntitlements_1 = require("./withActionExtensionEntitlements");
const withActionExtensionTarget_1 = require("./withActionExtensionTarget");
const utils_1 = require("./utils");
// Re-export types for consumers
__exportStar(require("./types"), exports);
__exportStar(require("./utils"), exports);
/**
 * Normalizes plugin props into a consistent format.
 * Handles both single extension and multiple extensions configurations.
 */
function normalizeConfig(props) {
    if ("extensions" in props) {
        // Multiple extensions
        const { extensions, excludedPackages, entitlements } = props;
        return {
            extensions,
            shared: { excludedPackages, entitlements },
        };
    }
    // Single extension - extract shared config
    const { excludedPackages, entitlements, ...extensionConfig } = props;
    return {
        extensions: [extensionConfig],
        shared: { excludedPackages, entitlements },
    };
}
/**
 * Validates extension configurations.
 * Throws if required fields are missing.
 */
function validateExtensions(extensions) {
    for (const ext of extensions) {
        if (!ext.name) {
            throw new Error("[expo-action-extension] Each action extension requires a 'name' property");
        }
        if (!ext.icon) {
            console.warn(`[expo-action-extension] Extension "${ext.name}" missing 'icon'. Will use placeholder.`);
        }
    }
}
/**
 * Main config plugin for expo-action-extension.
 * Supports single or multiple iOS Action Extensions.
 */
const withActionExtension = (config, props) => {
    const { extensions, shared } = normalizeConfig(props);
    // Validate all extensions
    validateExtensions(extensions);
    // Apply default excluded packages if not specified
    const normalizedShared = {
        ...shared,
        excludedPackages: shared.excludedPackages ?? (0, utils_1.getDefaultExcludedPackages)(),
    };
    // Apply shared plugins once (app-level modifications)
    config = (0, withAppEntitlements_1.withAppEntitlements)(config, normalizedShared);
    config = (0, withAppInfoPlist_1.withAppInfoPlist)(config, normalizedShared);
    // Apply per-extension plugins
    for (const extension of extensions) {
        config = (0, withExpoConfig_1.withExpoConfig)(config, { extension, shared: normalizedShared });
        config = (0, withPodfile_1.withPodfile)(config, { extension, shared: normalizedShared });
        config = (0, withActionExtensionInfoPlist_1.withActionExtensionInfoPlist)(config, {
            extension,
            shared: normalizedShared,
        });
        config = (0, withActionExtensionEntitlements_1.withActionExtensionEntitlements)(config, {
            extension,
            shared: normalizedShared,
        });
        config = (0, withActionExtensionTarget_1.withActionExtensionTarget)(config, {
            extension,
            shared: normalizedShared,
        });
    }
    return config;
};
exports.default = withActionExtension;
//# sourceMappingURL=index.js.map