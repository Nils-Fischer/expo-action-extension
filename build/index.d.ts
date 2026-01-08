/**
 * Close the action extension.
 * This dismisses the extension UI and returns to the host app.
 */
export declare function close(): void;
/**
 * Open the host app with an optional deep link path.
 * This closes the extension and opens the main app.
 *
 * @param path - Optional path to navigate to in the host app (e.g., "/content/123")
 *
 * @example
 * // Open host app to home
 * openHostApp();
 *
 * @example
 * // Open host app to specific screen
 * openHostApp("/settings");
 *
 * @example
 * // Open with query params
 * openHostApp("/content?id=123&action=view");
 */
export declare function openHostApp(path?: string): void;
/**
 * Clear the shared app group container.
 * Removes all files from the sharedData directory used for extension data sharing.
 *
 * @returns Promise that resolves when the container is cleared
 */
export declare function clearAppGroupContainer(): Promise<void>;
export type { ActivationRule, BackgroundColor, ActionExtensionConfig } from "./types";
//# sourceMappingURL=index.d.ts.map