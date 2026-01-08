interface ProcessIconOptions {
    iconPath: string;
    targetPath: string;
    extensionName: string;
    projectRoot: string;
}
/**
 * Gets the unique icon base name for an extension.
 * Uses the extension name to ensure uniqueness across multiple extensions.
 */
export declare function getIconBaseName(extensionName: string): string;
/**
 * Gets the list of icon file names for an extension (used in build phases).
 */
export declare function getIconFileNames(extensionName: string): string[];
/**
 * Processes and copies the extension icon to the target directory.
 * Creates an Assets.xcassets structure with the icon.
 */
export declare function processIcon({ iconPath, targetPath, extensionName, projectRoot }: ProcessIconOptions): void;
export {};
//# sourceMappingURL=processIcon.d.ts.map