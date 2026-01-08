import type { ConfigPlugin } from "expo/config-plugins";
import type { ActionExtensionPluginProps } from "./types";
export * from "./types";
export * from "./utils";
/**
 * Main config plugin for expo-action-extension.
 * Supports single or multiple iOS Action Extensions.
 */
declare const withActionExtension: ConfigPlugin<ActionExtensionPluginProps>;
export default withActionExtension;
//# sourceMappingURL=index.d.ts.map