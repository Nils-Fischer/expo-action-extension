import type { ConfigPlugin } from "expo/config-plugins";
import plist from "@expo/plist";
import { withInfoPlist } from "expo/config-plugins";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionContext } from "./types";
import {
  getTargetName,
  getBundleIdentifier,
  getAppBundleIdentifier,
  getAppGroup,
  getHostAppScheme,
  getModuleName,
  getEntryFile,
  buildActivationRules,
  getDefaultActivationRules,
} from "./utils";
import { getIconBaseName } from "./xcode/processIcon";

interface InfoPlist {
  [key: string]: unknown;
}

/**
 * Creates the Info.plist for the action extension target.
 * Configures activation rules, app group, and extension settings.
 */
export const withActionExtensionInfoPlist: ConfigPlugin<ExtensionContext> = (config, { extension }) => {
  return withInfoPlist(config, (config) => {
    const targetName = getTargetName(extension.name);
    const targetPath = path.join(config.modRequest.platformProjectRoot, targetName);
    const filePath = path.join(targetPath, "Info.plist");

    const appGroup = getAppGroup(config);
    const bundleId = getAppBundleIdentifier(config);
    const scheme = getHostAppScheme(config);
    const moduleName = getModuleName(extension);
    const entryFile = getEntryFile(extension);
    const activationRules = extension.activationRules ?? getDefaultActivationRules();
    const iconBaseName = getIconBaseName(extension.name);

    const infoPlist: InfoPlist = {
      // Standard bundle keys
      CFBundleDevelopmentRegion: "$(DEVELOPMENT_LANGUAGE)",
      CFBundleDisplayName: extension.name,
      CFBundleExecutable: "$(EXECUTABLE_NAME)",
      CFBundleIdentifier: "$(PRODUCT_BUNDLE_IDENTIFIER)",
      CFBundleInfoDictionaryVersion: "6.0",
      CFBundleName: "$(PRODUCT_NAME)",
      CFBundlePackageType: "$(PRODUCT_BUNDLE_PACKAGE_TYPE)",
      CFBundleShortVersionString: "$(MARKETING_VERSION)",
      CFBundleVersion: "$(CURRENT_PROJECT_VERSION)",

      // App group configuration
      AppGroup: appGroup,
      AppGroupIdentifier: bundleId,
      HostAppScheme: scheme,

      // Action extension specific keys
      ActionExtensionModuleName: moduleName,
      ActionExtensionEntryFile: entryFile,

      // iOS requirements
      LSRequiresIPhoneOS: true,

      // App Transport Security (for debug)
      NSAppTransportSecurity: {
        NSExceptionDomains: {
          localhost: {
            NSExceptionAllowsInsecureHTTPLoads: true,
          },
        },
      },

      // React Native New Architecture
      RCTNewArchEnabled: true,

      // UI Configuration
      UIAppFonts: [],
      UIApplicationSceneManifest: {
        UIApplicationSupportsMultipleScenes: true,
        UISceneConfigurations: {},
      },
      UIRequiredDeviceCapabilities: ["armv7"],
      UIStatusBarStyle: "UIStatusBarStyleDefault",
      UISupportedInterfaceOrientations: ["UIInterfaceOrientationPortrait", "UIInterfaceOrientationPortraitUpsideDown"],
      UIUserInterfaceStyle: "Automatic",
      UIViewControllerBasedStatusBarAppearance: false,

      // Firebase (disabled by default)
      WithFirebase: !!extension.googleServicesFile,

      // Extension configuration - Action extension uses com.apple.ui-services
      NSExtension: {
        NSExtensionAttributes: {
          NSExtensionActivationRule: buildActivationRules(activationRules),
        },
        NSExtensionPointIdentifier: "com.apple.ui-services",
        NSExtensionPrincipalClass: "$(PRODUCT_MODULE_NAME).ActionExtensionViewController",
      },

      // Action extension icon - use CFBundleIcons with unique icon name per extension
      CFBundleIcons: {
        CFBundlePrimaryIcon: {
          CFBundleIconFiles: [iconBaseName],
          UIPrerenderedIcon: true,
        },
      },
    };

    // Add background color if specified
    if (extension.backgroundColor) {
      infoPlist.ActionExtensionBackgroundColor = extension.backgroundColor;
    }

    // Add height if specified
    if (extension.height) {
      infoPlist.ActionExtensionHeight = extension.height;
    }

    // Create directory if needed
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write Info.plist
    fs.writeFileSync(filePath, plist.build(infoPlist));

    return config;
  });
};
