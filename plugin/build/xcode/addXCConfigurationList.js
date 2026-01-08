"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addXCConfigurationList = addXCConfigurationList;
function addXCConfigurationList(xcodeProject, { targetName, currentProjectVersion, bundleIdentifier, marketingVersion, }) {
    const commonBuildSettings = {
        CLANG_ENABLE_MODULES: "YES",
        CURRENT_PROJECT_VERSION: `"${currentProjectVersion}"`,
        INFOPLIST_FILE: `${targetName}/Info.plist`,
        IPHONEOS_DEPLOYMENT_TARGET: `"15.1"`,
        LD_RUNPATH_SEARCH_PATHS: `"$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks"`,
        PRODUCT_BUNDLE_IDENTIFIER: `"${bundleIdentifier}"`,
        PRODUCT_NAME: `"${targetName}"`,
        SWIFT_VERSION: "5.0",
        VERSIONING_SYSTEM: `"apple-generic"`,
        CODE_SIGN_ENTITLEMENTS: `${targetName}/${targetName}.entitlements`,
        GENERATE_INFOPLIST_FILE: "YES",
        MARKETING_VERSION: `"${marketingVersion ?? 1}"`,
        ENABLE_ON_DEMAND_RESOURCES: "NO",
    };
    const buildConfigurationsList = [
        {
            name: "Debug",
            isa: "XCBuildConfiguration",
            buildSettings: {
                ...commonBuildSettings,
                SWIFT_ACTIVE_COMPILATION_CONDITIONS: "DEBUG",
            },
        },
        {
            name: "Release",
            isa: "XCBuildConfiguration",
            buildSettings: {
                ...commonBuildSettings,
            },
        },
    ];
    const xCConfigurationList = xcodeProject.addXCConfigurationList(buildConfigurationsList, "Release", `Build configuration list for PBXNativeTarget "${targetName}"`);
    return xCConfigurationList;
}
//# sourceMappingURL=addXCConfigurationList.js.map