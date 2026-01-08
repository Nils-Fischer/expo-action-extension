"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withActionExtensionTarget = void 0;
const config_plugins_1 = require("expo/config-plugins");
const utils_1 = require("./utils");
const addBuildPhases_1 = require("./xcode/addBuildPhases");
const addPbxGroup_1 = require("./xcode/addPbxGroup");
const addProductFile_1 = require("./xcode/addProductFile");
const addTargetDependency_1 = require("./xcode/addTargetDependency");
const addToPbxNativeTargetSection_1 = require("./xcode/addToPbxNativeTargetSection");
const addToPbxProjectSection_1 = require("./xcode/addToPbxProjectSection");
const addXCConfigurationList_1 = require("./xcode/addXCConfigurationList");
/**
 * Adds the action extension target to the Xcode project.
 * Configures build phases, groups, and dependencies.
 */
const withActionExtensionTarget = (config, { extension }) => {
    return (0, config_plugins_1.withXcodeProject)(config, async (config) => {
        const xcodeProject = config.modResults;
        const targetName = (0, utils_1.getTargetName)(extension.name);
        const bundleIdentifier = (0, utils_1.getBundleIdentifier)(config, extension.name);
        const marketingVersion = config.version;
        const targetUuid = xcodeProject.generateUuid();
        const groupName = "Embed Action Extensions";
        const { platformProjectRoot, projectRoot } = config.modRequest;
        const xCConfigurationList = (0, addXCConfigurationList_1.addXCConfigurationList)(xcodeProject, {
            targetName,
            currentProjectVersion: config.ios?.buildNumber || "1",
            bundleIdentifier,
            marketingVersion,
        });
        const productFile = (0, addProductFile_1.addProductFile)(xcodeProject, {
            targetName,
            groupName,
        });
        const target = (0, addToPbxNativeTargetSection_1.addToPbxNativeTargetSection)(xcodeProject, {
            targetName,
            targetUuid,
            productFile,
            xCConfigurationList,
        });
        (0, addToPbxProjectSection_1.addToPbxProjectSection)(xcodeProject, target);
        (0, addTargetDependency_1.addTargetDependency)(xcodeProject, target);
        (0, addPbxGroup_1.addPbxGroup)(xcodeProject, {
            targetName,
            platformProjectRoot,
            projectRoot,
            extension,
        });
        (0, addBuildPhases_1.addBuildPhases)(xcodeProject, {
            targetUuid,
            groupName,
            productFile,
            extension,
        });
        return config;
    });
};
exports.withActionExtensionTarget = withActionExtensionTarget;
//# sourceMappingURL=withActionExtensionTarget.js.map