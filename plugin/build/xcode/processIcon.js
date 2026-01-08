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
exports.getIconBaseName = getIconBaseName;
exports.getIconFileNames = getIconFileNames;
exports.processIcon = processIcon;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
/**
 * Gets the unique icon base name for an extension.
 * Uses the extension name to ensure uniqueness across multiple extensions.
 */
function getIconBaseName(extensionName) {
    return `${extensionName}Icon`;
}
/**
 * Gets the list of icon file names for an extension (used in build phases).
 */
function getIconFileNames(extensionName) {
    const baseName = getIconBaseName(extensionName);
    return [`${baseName}.png`, `${baseName}@2x.png`, `${baseName}@3x.png`];
}
/**
 * Processes and copies the extension icon to the target directory.
 * Creates an Assets.xcassets structure with the icon.
 */
function processIcon({ iconPath, targetPath, extensionName, projectRoot }) {
    const iconBaseName = getIconBaseName(extensionName);
    // Create Assets.xcassets in the extension
    const assetsPath = path.join(targetPath, "Assets.xcassets");
    const iconImagesetPath = path.join(assetsPath, `${iconBaseName}.imageset`);
    fs.mkdirSync(iconImagesetPath, { recursive: true });
    // Write Contents.json for the asset catalog
    fs.writeFileSync(path.join(assetsPath, "Contents.json"), JSON.stringify({ info: { author: "xcode", version: 1 } }, null, 2));
    // Resolve icon path
    const absoluteIconPath = path.resolve(projectRoot, iconPath);
    if (!fs.existsSync(absoluteIconPath)) {
        console.warn(`[expo-action-extension] Icon not found at ${iconPath} for extension "${extensionName}". Using placeholder.`);
        // Create placeholder icon (empty file for now - Xcode will use default)
        createPlaceholderIcon(iconImagesetPath);
        return;
    }
    // Copy icon as all 3 scales (iOS will scale appropriately)
    // Using single source for all - user should provide highest res (3x = 180x180)
    const iconFiles = ["icon.png", "icon@2x.png", "icon@3x.png"];
    for (const file of iconFiles) {
        fs.copyFileSync(absoluteIconPath, path.join(iconImagesetPath, file));
    }
    // Also copy with unique naming to target root for CFBundleIconFile
    const iconMapping = [
        { src: absoluteIconPath, dest: `${iconBaseName}.png` },
        { src: absoluteIconPath, dest: `${iconBaseName}@2x.png` },
        { src: absoluteIconPath, dest: `${iconBaseName}@3x.png` },
    ];
    for (const { src, dest } of iconMapping) {
        fs.copyFileSync(src, path.join(targetPath, dest));
    }
    // Write Contents.json for the imageset (original rendering to preserve icon colors)
    const imagesetContents = {
        images: [
            {
                filename: "icon.png",
                idiom: "universal",
                scale: "1x",
            },
            {
                filename: "icon@2x.png",
                idiom: "universal",
                scale: "2x",
            },
            {
                filename: "icon@3x.png",
                idiom: "universal",
                scale: "3x",
            },
        ],
        info: {
            author: "xcode",
            version: 1,
        },
        properties: {
            "template-rendering-intent": "original",
        },
    };
    fs.writeFileSync(path.join(iconImagesetPath, "Contents.json"), JSON.stringify(imagesetContents, null, 2));
}
/**
 * Creates a placeholder icon when no icon is provided.
 */
function createPlaceholderIcon(iconImagesetPath) {
    // Write minimal Contents.json without actual images
    const imagesetContents = {
        images: [
            { idiom: "universal", scale: "1x" },
            { idiom: "universal", scale: "2x" },
            { idiom: "universal", scale: "3x" },
        ],
        info: {
            author: "xcode",
            version: 1,
        },
        properties: {
            "template-rendering-intent": "original",
        },
    };
    fs.writeFileSync(path.join(iconImagesetPath, "Contents.json"), JSON.stringify(imagesetContents, null, 2));
}
//# sourceMappingURL=processIcon.js.map