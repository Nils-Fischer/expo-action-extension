"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = close;
exports.openHostApp = openHostApp;
exports.clearAppGroupContainer = clearAppGroupContainer;
const ExpoActionExtensionModule_1 = __importDefault(require("./ExpoActionExtensionModule"));
/**
 * Close the action extension.
 * This dismisses the extension UI and returns to the host app.
 */
function close() {
    ExpoActionExtensionModule_1.default.close();
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
function openHostApp(path) {
    ExpoActionExtensionModule_1.default.openHostApp(path ?? null);
}
/**
 * Clear the shared app group container.
 * Removes all files from the sharedData directory used for extension data sharing.
 *
 * @returns Promise that resolves when the container is cleared
 */
async function clearAppGroupContainer() {
    return ExpoActionExtensionModule_1.default.clearAppGroupContainer();
}
//# sourceMappingURL=index.js.map