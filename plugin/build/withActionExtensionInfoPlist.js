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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withActionExtensionInfoPlist = void 0;
const plist_1 = __importDefault(require("@expo/plist"));
const config_plugins_1 = require("expo/config-plugins");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const utils_1 = require("./utils");
const processIcon_1 = require("./xcode/processIcon");
/**
 * Creates the Info.plist for the action extension target.
 * Configures activation rules, app group, and extension settings.
 */
const withActionExtensionInfoPlist = (config, { extension }) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        const targetName = (0, utils_1.getTargetName)(extension);
        const targetPath = path.join(config.modRequest.platformProjectRoot, targetName);
        const filePath = path.join(targetPath, "Info.plist");
        const appGroup = (0, utils_1.getAppGroup)(config);
        const bundleId = (0, utils_1.getAppBundleIdentifier)(config);
        const scheme = (0, utils_1.getHostAppScheme)(config);
        const moduleName = (0, utils_1.getModuleName)(extension);
        const entryFile = (0, utils_1.getEntryFile)(extension);
        const activationRules = extension.activationRules ?? (0, utils_1.getDefaultActivationRules)();
        const iconBaseName = (0, processIcon_1.getIconBaseName)(extension.name);
        const infoPlist = {
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
                    NSExtensionActivationRule: (0, utils_1.buildActivationRules)(activationRules),
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
        fs.writeFileSync(filePath, plist_1.default.build(infoPlist));
        return config;
    });
};
exports.withActionExtensionInfoPlist = withActionExtensionInfoPlist;
//# sourceMappingURL=withActionExtensionInfoPlist.js.map