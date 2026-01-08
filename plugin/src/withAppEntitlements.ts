import type { ConfigPlugin } from "expo/config-plugins";
import { withEntitlementsPlist } from "expo/config-plugins";
import type { SharedConfig } from "./types";
import { getAppGroup } from "./utils";

/**
 * Adds app group entitlements to the main app target.
 * This ensures the main app can communicate with extensions via app groups.
 */
export const withAppEntitlements: ConfigPlugin<SharedConfig> = (config, shared) => {
  return withEntitlementsPlist(config, (config) => {
    const appGroup = getAppGroup(config);

    // Ensure app groups array exists
    if (!config.modResults["com.apple.security.application-groups"]) {
      config.modResults["com.apple.security.application-groups"] = [];
    }

    const appGroups = config.modResults["com.apple.security.application-groups"] as string[];

    // Add default app group if not already present
    if (!appGroups.includes(appGroup)) {
      appGroups.push(appGroup);
    }

    // Add any custom app groups from entitlements
    if (shared.entitlements?.["com.apple.security.application-groups"]) {
      const customGroups = shared.entitlements["com.apple.security.application-groups"] as string[];
      for (const group of customGroups) {
        if (!appGroups.includes(group)) {
          appGroups.push(group);
        }
      }
    }

    return config;
  });
};
