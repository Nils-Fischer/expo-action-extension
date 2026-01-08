import type { ConfigPlugin } from "expo/config-plugins";
import type { ExtensionContext } from "./types";
/**
 * Modifies the Podfile to add a CocoaPods target for the action extension.
 * Each extension gets its own target with proper dependencies.
 */
export declare const withPodfile: ConfigPlugin<ExtensionContext>;
//# sourceMappingURL=withPodfile.d.ts.map