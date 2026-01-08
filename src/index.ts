import ExpoActionExtensionModule from "./ExpoActionExtensionModule";

/**
 * Close the action extension.
 * This dismisses the extension UI and returns to the host app.
 */
export function close(): void {
  ExpoActionExtensionModule.close();
}

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
export function openHostApp(path?: string): void {
  ExpoActionExtensionModule.openHostApp(path ?? null);
}

/**
 * Clear the shared app group container.
 * Removes all files from the sharedData directory used for extension data sharing.
 *
 * @returns Promise that resolves when the container is cleared
 */
export async function clearAppGroupContainer(): Promise<void> {
  return ExpoActionExtensionModule.clearAppGroupContainer();
}

// Re-export types
export type { ActivationRule, BackgroundColor, ActionExtensionConfig } from "./types";
