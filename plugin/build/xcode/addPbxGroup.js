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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPbxGroup = addPbxGroup;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const processIcon_1 = require("./processIcon");
function addPbxGroup(xcodeProject, { targetName, platformProjectRoot, projectRoot, extension, }) {
    const targetPath = path.join(platformProjectRoot, targetName);
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
    // Use unique swift filename per extension to avoid Xcode file reference collisions
    const swiftFileName = `${targetName}ViewController.swift`;
    // Copy the ActionExtensionViewController.swift file with unique name
    // __dirname in build is plugin/build/xcode, so we go up to plugin root, then to swift
    const swiftSourcePath = path.join(__dirname, "../../swift/ActionExtensionViewController.swift");
    const swiftDestPath = path.join(targetPath, swiftFileName);
    if (fs.existsSync(swiftSourcePath)) {
        fs.copyFileSync(swiftSourcePath, swiftDestPath);
    }
    else {
        console.warn(`[expo-action-extension] Swift template not found at ${swiftSourcePath}`);
    }
    // Process icon
    (0, processIcon_1.processIcon)({
        iconPath: extension.icon,
        targetPath,
        extensionName: extension.name,
        projectRoot,
    });
    const iconFiles = (0, processIcon_1.getIconFileNames)(extension.name);
    const files = [swiftFileName, "Info.plist", `${targetName}.entitlements`, "Assets.xcassets", ...iconFiles];
    // Add PBX group
    const { uuid: pbxGroupUuid } = xcodeProject.addPbxGroup(files, targetName, targetName);
    // Add PBXGroup to top level group
    const groups = xcodeProject.hash.project.objects["PBXGroup"];
    if (pbxGroupUuid) {
        Object.keys(groups).forEach(function (key) {
            if (groups[key].name === undefined && groups[key].path === undefined) {
                xcodeProject.addToPbxGroup(pbxGroupUuid, key);
            }
        });
    }
}
//# sourceMappingURL=addPbxGroup.js.map