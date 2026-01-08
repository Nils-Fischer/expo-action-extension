import { XcodeProject } from "expo/config-plugins";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ActionExtensionConfig } from "../types";
import { processIcon, getIconFileNames } from "./processIcon";

export function addPbxGroup(
  xcodeProject: XcodeProject,
  {
    targetName,
    platformProjectRoot,
    projectRoot,
    extension,
  }: {
    targetName: string;
    platformProjectRoot: string;
    projectRoot: string;
    extension: ActionExtensionConfig;
  }
) {
  const targetPath = path.join(platformProjectRoot, targetName);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Use unique swift filename per extension to avoid Xcode file reference collisions
  const swiftFileName = `${targetName}ViewController.swift`;

  // Copy the ActionExtensionViewController.swift file with unique name
  // __dirname in build is plugin/build/xcode, so we go up to plugin root, then to swift
  const swiftSourcePath = path.join(__dirname, "../../swift/ActionExtensionViewController.swift");
  const swiftDestPath = path.join(targetPath, swiftFileName);

  if (fs.existsSync(swiftSourcePath)) {
    fs.copyFileSync(swiftSourcePath, swiftDestPath);
  } else {
    console.warn(`[expo-action-extension] Swift template not found at ${swiftSourcePath}`);
  }

  // Process icon
  processIcon({
    iconPath: extension.icon,
    targetPath,
    extensionName: extension.name,
    projectRoot,
  });

  const iconFiles = getIconFileNames(extension.name);
  const files = [swiftFileName, "Info.plist", `${targetName}.entitlements`, "Assets.xcassets", ...iconFiles];

  // Add PBX group
  const { uuid: pbxGroupUuid } = xcodeProject.addPbxGroup(files, targetName, targetName);

  // Add PBXGroup to top level group
  const groups = xcodeProject.hash.project.objects["PBXGroup"];
  if (pbxGroupUuid) {
    Object.keys(groups).forEach(function (key) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        xcodeProject.addToPbxGroup(pbxGroupUuid, key);
      }
    });
  }
}
