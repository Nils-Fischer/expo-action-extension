import type { ConfigPlugin } from "expo/config-plugins";
import { withXcodeProject } from "expo/config-plugins";
import type { ExtensionContext } from "./types";
import { getTargetName, getBundleIdentifier } from "./utils";
import { addBuildPhases } from "./xcode/addBuildPhases";
import { addPbxGroup } from "./xcode/addPbxGroup";
import { addProductFile } from "./xcode/addProductFile";
import { addTargetDependency } from "./xcode/addTargetDependency";
import { addToPbxNativeTargetSection } from "./xcode/addToPbxNativeTargetSection";
import { addToPbxProjectSection } from "./xcode/addToPbxProjectSection";
import { addXCConfigurationList } from "./xcode/addXCConfigurationList";

/**
 * Adds the action extension target to the Xcode project.
 * Configures build phases, groups, and dependencies.
 */
export const withActionExtensionTarget: ConfigPlugin<ExtensionContext> = (config, { extension }) => {
  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;

    const targetName = getTargetName(extension);
    const bundleIdentifier = getBundleIdentifier(config, extension);
    const marketingVersion = config.version;

    const targetUuid = xcodeProject.generateUuid();
    const groupName = "Embed Action Extensions";
    const { platformProjectRoot, projectRoot } = config.modRequest;

    const xCConfigurationList = addXCConfigurationList(xcodeProject, {
      targetName,
      currentProjectVersion: config.ios?.buildNumber || "1",
      bundleIdentifier,
      marketingVersion,
    });

    const productFile = addProductFile(xcodeProject, {
      targetName,
      groupName,
    });

    const target = addToPbxNativeTargetSection(xcodeProject, {
      targetName,
      targetUuid,
      productFile,
      xCConfigurationList,
    });

    addToPbxProjectSection(xcodeProject, target);

    addTargetDependency(xcodeProject, target);

    addPbxGroup(xcodeProject, {
      targetName,
      platformProjectRoot,
      projectRoot,
      extension,
    });

    addBuildPhases(xcodeProject, {
      targetUuid,
      groupName,
      productFile,
      extension,
    });

    return config;
  });
};
