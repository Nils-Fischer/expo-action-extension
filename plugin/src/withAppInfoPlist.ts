import type { ConfigPlugin } from "expo/config-plugins";
import { withInfoPlist } from "expo/config-plugins";
import type { SharedConfig } from "./types";
import { getAppGroup } from "./utils";

/**
 * Adds app group identifier to the main app's Info.plist.
 * This allows the app to know which app group to use for extension communication.
 */
export const withAppInfoPlist: ConfigPlugin<SharedConfig> = (config, _shared) => {
  return withInfoPlist(config, (config) => {
    const appGroup = getAppGroup(config);

    // Add AppGroup key for easy access from JavaScript
    config.modResults.AppGroup = appGroup;

    return config;
  });
};
