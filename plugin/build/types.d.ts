/** Activation rule for content types that trigger the extension */
export interface ActivationRule {
    type: "url" | "text" | "image" | "video" | "file";
    max?: number;
}
/** Background color configuration */
export interface BackgroundColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}
/** Single action extension configuration */
export interface ActionExtensionConfig {
    /** Display name shown in share sheet (e.g., "Share with Locatr") */
    name: string;
    /** Xcode target name override (defaults to sanitizedName + "ActionExtension") */
    targetName?: string;
    /** Path to icon PNG (60x60 @1x recommended). REQUIRED. */
    icon: string;
    /** Activation rules (defaults to [{ type: "url" }, { type: "text" }]) */
    activationRules?: ActivationRule[];
    /** Custom entry file (defaults to "index.action.js") */
    entryFile?: string;
    /** Custom RN module name (defaults to "actionExtension") */
    moduleName?: string;
    /** Background color for the extension view */
    backgroundColor?: BackgroundColor;
    /** Modal height in points (full screen if not specified) */
    height?: number;
    /** JS preprocessing file for web content */
    preprocessingFile?: string;
    /** Firebase GoogleService-Info.plist for this extension */
    googleServicesFile?: string;
}
/** Shared configuration for all extensions */
export interface SharedConfig {
    /** Packages to exclude from extension bundle */
    excludedPackages?: string[];
    /** Entitlements (app groups, keychain, etc) - applied to all extensions */
    entitlements?: Record<string, string | string[]>;
}
/** Plugin props - either single extension or array */
export type ActionExtensionPluginProps = (ActionExtensionConfig & SharedConfig) | ({
    extensions: ActionExtensionConfig[];
} & SharedConfig);
/** Normalized config after processing plugin props */
export interface NormalizedConfig {
    extensions: ActionExtensionConfig[];
    shared: SharedConfig;
}
/** Context passed to per-extension plugins */
export interface ExtensionContext {
    extension: ActionExtensionConfig;
    shared: SharedConfig;
}
/** EAS app extension config structure */
export interface EasAppExtension {
    targetName: string;
    bundleIdentifier: string;
    entitlements?: Record<string, unknown>;
}
//# sourceMappingURL=types.d.ts.map