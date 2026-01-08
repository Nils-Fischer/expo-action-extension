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
    /** Unique name (used for target naming, e.g., "SavePlace" → "SavePlaceActionExtension") */
    name: string;
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
//# sourceMappingURL=types.d.ts.map