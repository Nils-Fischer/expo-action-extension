"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppEntitlements = void 0;
const config_plugins_1 = require("expo/config-plugins");
const utils_1 = require("./utils");
/**
 * Adds app group entitlements to the main app target.
 * This ensures the main app can communicate with extensions via app groups.
 */
const withAppEntitlements = (config, shared) => {
    return (0, config_plugins_1.withEntitlementsPlist)(config, (config) => {
        const appGroup = (0, utils_1.getAppGroup)(config);
        // Ensure app groups array exists
        if (!config.modResults["com.apple.security.application-groups"]) {
            config.modResults["com.apple.security.application-groups"] = [];
        }
        const appGroups = config.modResults["com.apple.security.application-groups"];
        // Add default app group if not already present
        if (!appGroups.includes(appGroup)) {
            appGroups.push(appGroup);
        }
        // Add any custom app groups from entitlements
        if (shared.entitlements?.["com.apple.security.application-groups"]) {
            const customGroups = shared.entitlements["com.apple.security.application-groups"];
            for (const group of customGroups) {
                if (!appGroups.includes(group)) {
                    appGroups.push(group);
                }
            }
        }
        return config;
    });
};
exports.withAppEntitlements = withAppEntitlements;
//# sourceMappingURL=withAppEntitlements.js.map