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
exports.withActionExtensionEntitlements = void 0;
const plist_1 = __importDefault(require("@expo/plist"));
const config_plugins_1 = require("expo/config-plugins");
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const utils_1 = require("./utils");
/**
 * Creates the entitlements file for the action extension target.
 * Configures app groups and keychain access for extension data sharing.
 */
const withActionExtensionEntitlements = (config, { extension, shared }) => {
    return (0, config_plugins_1.withEntitlementsPlist)(config, (config) => {
        const targetName = (0, utils_1.getTargetName)(extension);
        const targetPath = path.join(config.modRequest.platformProjectRoot, targetName);
        const filePath = path.join(targetPath, `${targetName}.entitlements`);
        // Build entitlements
        const appGroup = (0, utils_1.getAppGroup)(config);
        const extensionEntitlements = {
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
        fs.writeFileSync(filePath, plist_1.default.build(extensionEntitlements));
        return config;
    });
};
exports.withActionExtensionEntitlements = withActionExtensionEntitlements;
//# sourceMappingURL=withActionExtensionEntitlements.js.map