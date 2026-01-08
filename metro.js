/**
 * Metro configuration helper for expo-action-extension.
 * Rewrites bundle requests from action extensions to use the correct entry file.
 */

/**
 * @typedef {Object} MetroConfig
 * @property {Object} resolver - Metro resolver configuration
 * @property {string[]} resolver.sourceExts - Source file extensions
 * @property {Object} server - Metro server configuration
 * @property {function} [server.rewriteRequestUrl] - URL rewriter function
 */

/**
 * @typedef {Object} ActionExtensionMetroOptions
 * @property {string} [entryFile] - Custom entry file name (without .js extension)
 */

/**
 * Wraps a Metro config to support action extension bundle requests.
 * Detects requests with ?actionExtension=true and rewrites them to use
 * the action extension entry file instead of the main app entry.
 *
 * @param {MetroConfig} config - The Metro configuration to wrap
 * @param {ActionExtensionMetroOptions} [options] - Optional configuration
 * @returns {MetroConfig} Modified Metro configuration
 *
 * @example
 * // metro.config.js
 * const { getDefaultConfig } = require("expo/metro-config");
 * const { withActionExtension } = require("expo-action-extension/metro");
 *
 * const config = getDefaultConfig(__dirname);
 * module.exports = withActionExtension(config);
 *
 * @example
 * // With custom entry file
 * module.exports = withActionExtension(config, { entryFile: "index.myaction" });
 */
function withActionExtension(config, options = {}) {
  if (!config.resolver) {
    throw new Error(
      "[expo-action-extension] config.resolver is not defined. Make sure you're passing a valid Metro config."
    );
  }

  // Add .action.js source extension for action extension entry files
  config.resolver.sourceExts = [...(config.resolver?.sourceExts ?? []), "action.js"];

  if (!config.server) {
    throw new Error(
      "[expo-action-extension] config.server is not defined. Make sure you're passing a valid Metro config."
    );
  }

  // Preserve existing rewriteRequestUrl if present
  const originalRewriteRequestUrl = config.server?.rewriteRequestUrl || ((url) => url);

  config.server.rewriteRequestUrl = (url) => {
    // Check for actionExtension=true query param (set by Swift controller)
    const isActionExtension = url.includes("actionExtension=true");
    const rewrittenUrl = originalRewriteRequestUrl(url);

    if (isActionExtension) {
      // Default to index.action.bundle, or custom if specified
      const entryFile = options.entryFile || "index.action";
      return rewrittenUrl.replace("index.bundle", `${entryFile}.bundle`);
    }

    return rewrittenUrl;
  };

  return config;
}

module.exports = { withActionExtension };
