"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withExpoConfig = void 0;
const utils_1 = require("./utils");
/**
 * Adds the action extension to EAS Build configuration.
 * This ensures EAS builds can properly sign and bundle the extension.
 */
const withExpoConfig = (config, { extension, shared }) => {
    const targetName = (0, utils_1.getTargetName)(extension);
    const bundleIdentifier = (0, utils_1.getBundleIdentifier)(config, extension);
    const appGroup = (0, utils_1.getAppGroup)(config);
    // Build extension config for EAS
    const extensionConfig = {
        targetName,
        bundleIdentifier,
        entitlements: {
            "com.apple.security.application-groups": shared.entitlements?.["com.apple.security.application-groups"] ?? [
                appGroup,
            ],
        },
    };
    // Add keychain-access-groups if provided
    if (shared.entitlements?.["keychain-access-groups"]) {
        extensionConfig.entitlements["keychain-access-groups"] = shared.entitlements["keychain-access-groups"];
    }
    // Get existing app extensions or create empty array
    const existingExtensions = config.extra?.eas?.build?.experimental?.ios?.appExtensions ?? [];
    // Check if this extension is already configured
    const extensionExists = existingExtensions.some((ext) => ext.targetName === targetName);
    if (!extensionExists) {
        existingExtensions.push(extensionConfig);
    }
    // Update config
    return {
        ...config,
        extra: {
            ...config.extra,
            eas: {
                ...config.extra?.eas,
                build: {
                    ...config.extra?.eas?.build,
                    experimental: {
                        ...config.extra?.eas?.build?.experimental,
                        ios: {
                            ...config.extra?.eas?.build?.experimental?.ios,
                            appExtensions: existingExtensions,
                        },
                    },
                },
            },
        },
    };
};
exports.withExpoConfig = withExpoConfig;
//# sourceMappingURL=withExpoConfig.js.map