import type { ConfigPlugin } from "expo/config-plugins";
import type { ActionExtensionConfig, ActionExtensionPluginProps, NormalizedConfig, SharedConfig } from "./types";
import { withAppEntitlements } from "./withAppEntitlements";
import { withAppInfoPlist } from "./withAppInfoPlist";
import { withExpoConfig } from "./withExpoConfig";
import { withPodfile } from "./withPodfile";
import { withActionExtensionInfoPlist } from "./withActionExtensionInfoPlist";
import { withActionExtensionEntitlements } from "./withActionExtensionEntitlements";
import { withActionExtensionTarget } from "./withActionExtensionTarget";
import { getDefaultExcludedPackages } from "./utils";

// Re-export types for consumers
export * from "./types";
export * from "./utils";

/**
 * Normalizes plugin props into a consistent format.
 * Handles both single extension and multiple extensions configurations.
 */
function normalizeConfig(props: ActionExtensionPluginProps): NormalizedConfig {
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
    extensions: [extensionConfig as ActionExtensionConfig],
    shared: { excludedPackages, entitlements },
  };
}

/**
 * Validates extension configurations.
 * Throws if required fields are missing.
 */
function validateExtensions(extensions: ActionExtensionConfig[]): void {
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
const withActionExtension: ConfigPlugin<ActionExtensionPluginProps> = (config, props) => {
  const { extensions, shared } = normalizeConfig(props);

  // Validate all extensions
  validateExtensions(extensions);

  // Apply default excluded packages if not specified
  const normalizedShared: SharedConfig = {
    ...shared,
    excludedPackages: shared.excludedPackages ?? getDefaultExcludedPackages(),
  };

  // Apply shared plugins once (app-level modifications)
  config = withAppEntitlements(config, normalizedShared);
  config = withAppInfoPlist(config, normalizedShared);

  // Apply per-extension plugins
  for (const extension of extensions) {
    config = withExpoConfig(config, { extension, shared: normalizedShared });
    config = withPodfile(config, { extension, shared: normalizedShared });
    config = withActionExtensionInfoPlist(config, {
      extension,
      shared: normalizedShared,
    });
    config = withActionExtensionEntitlements(config, {
      extension,
      shared: normalizedShared,
    });
    config = withActionExtensionTarget(config, {
      extension,
      shared: normalizedShared,
    });
  }

  return config;
};

export default withActionExtension;
