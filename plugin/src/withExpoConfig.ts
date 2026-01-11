import type { ConfigPlugin } from "expo/config-plugins";
import type { ExtensionContext, EasAppExtension } from "./types";
import { getBundleIdentifier, getTargetName, getAppGroup } from "./utils";

/**
 * Adds the action extension to EAS Build configuration.
 * This ensures EAS builds can properly sign and bundle the extension.
 */
export const withExpoConfig: ConfigPlugin<ExtensionContext> = (config, { extension, shared }) => {
  const targetName = getTargetName(extension);
  const bundleIdentifier = getBundleIdentifier(config, extension);
  const appGroup = getAppGroup(config);

  // Build extension config for EAS
  const extensionConfig: EasAppExtension = {
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
    extensionConfig.entitlements!["keychain-access-groups"] = shared.entitlements["keychain-access-groups"];
  }

  // Get existing app extensions or create empty array
  const existingExtensions: EasAppExtension[] =
    (config.extra?.eas?.build?.experimental?.ios?.appExtensions as EasAppExtension[]) ?? [];

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
