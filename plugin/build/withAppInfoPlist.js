"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppInfoPlist = void 0;
const config_plugins_1 = require("expo/config-plugins");
const utils_1 = require("./utils");
/**
 * Adds app group identifier to the main app's Info.plist.
 * This allows the app to know which app group to use for extension communication.
 */
const withAppInfoPlist = (config, _shared) => {
    return (0, config_plugins_1.withInfoPlist)(config, (config) => {
        const appGroup = (0, utils_1.getAppGroup)(config);
        // Add AppGroup key for easy access from JavaScript
        config.modResults.AppGroup = appGroup;
        return config;
    });
};
exports.withAppInfoPlist = withAppInfoPlist;
//# sourceMappingURL=withAppInfoPlist.js.map