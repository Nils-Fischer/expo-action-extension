import type { ConfigPlugin } from "expo/config-plugins";
import plist from "@expo/plist";
import { withEntitlementsPlist } from "expo/config-plugins";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionContext } from "./types";
import { getTargetName, getAppGroup } from "./utils";

/**
 * Creates the entitlements file for the action extension target.
 * Configures app groups and keychain access for extension data sharing.
 */
export const withActionExtensionEntitlements: ConfigPlugin<ExtensionContext> = (config, { extension, shared }) => {
  return withEntitlementsPlist(config, (config) => {
    const targetName = getTargetName(extension.name);
    const targetPath = path.join(config.modRequest.platformProjectRoot, targetName);
    const filePath = path.join(targetPath, `${targetName}.entitlements`);

    // Build entitlements
    const appGroup = getAppGroup(config);

    const extensionEntitlements: Record<string, unknown> = {
      "com.apple.security.application-groups": shared.entitlements?.["com.apple.security.application-groups"] ?? [
        appGroup,
      ],
    };

    // Add keychain-access-groups if provided
    if (shared.entitlements?.["keychain-access-groups"]) {
      extensionEntitlements["keychain-access-groups"] = shared.entitlements["keychain-access-groups"];
    }

    // Create directory if needed
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write entitlements file
    fs.writeFileSync(filePath, plist.build(extensionEntitlements));

    return config;
  });
};
