import type { ConfigPlugin } from "expo/config-plugins";
import { withDangerousMod } from "expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionContext } from "./types";
import { getTargetName, getDefaultExcludedPackages } from "./utils";

/**
 * Modifies the Podfile to add a CocoaPods target for the action extension.
 * Each extension gets its own target with proper dependencies.
 */
export const withPodfile: ConfigPlugin<ExtensionContext> = (config, { extension, shared }) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, "Podfile");

      if (!fs.existsSync(podfilePath)) {
        return config;
      }

      let podfileContent = fs.readFileSync(podfilePath, "utf-8");
      const targetName = getTargetName(extension.name);

      // Check if target already exists
      if (podfileContent.includes(`target '${targetName}'`)) {
        return config;
      }

      // Build the exclude array string
      const excludedPackages = shared.excludedPackages ?? getDefaultExcludedPackages();
      const excludeArray = excludedPackages.map((pkg) => `"${pkg}"`).join(", ");

      // Add post_install hook to set APPLICATION_EXTENSION_API_ONLY = 'No'
      // This allows pods to use APIs that aren't available in app extensions
      // We inject this into the existing post_install block
      const postInstallBuildSettings = `    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['APPLICATION_EXTENSION_API_ONLY'] = 'No'
      end
    end`;

      podfileContent = mergeContents({
        tag: "expo-action-extension-build-settings",
        src: podfileContent,
        newSrc: postInstallBuildSettings,
        anchor: "react_native_post_install",
        offset: 6,
        comment: "#",
      }).contents;

      // Create the new target block
      // Note: We call list_native_modules! and link_native_modules! separately
      // so we can filter out incompatible packages before linking
      const actionExtensionTarget = `
target '${targetName}' do     
  exclude = [${excludeArray}]
  use_expo_modules!(exclude: exclude)
  
  if ENV['EXPO_USE_COMMUNITY_AUTOLINKING'] == '1'
    config_command = ['node', '-e', "process.argv=['', '', 'config'];require('@react-native-community/cli').run()"];
  else
    config_command = [
      'npx',
      'expo-modules-autolinking',
      'react-native-config',
      '--json',
      '--platform',
      'ios'
    ]
  end

  # Get native modules config, filter out excluded packages, then link
  native_config = list_native_modules!(config_command)
  native_config[:ios_packages] = native_config[:ios_packages].reject { |pkg| exclude.include?(pkg[:name]) }
  config = link_native_modules!(native_config)
          
  use_frameworks! :linkage => podfile_properties['ios.useFrameworks'].to_sym if podfile_properties['ios.useFrameworks']
  use_frameworks! :linkage => ENV['USE_FRAMEWORKS'].to_sym if ENV['USE_FRAMEWORKS']
          
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => podfile_properties['expo.jsEngine'] == nil || podfile_properties['expo.jsEngine'] == 'hermes',
    :app_path => "#{Pod::Config.instance.installation_root}/..",
    :privacy_file_aggregation_enabled => podfile_properties['apple.privacyManifestAggregationEnabled'] != 'false',
  )
end
`;

      // Append to the end of the Podfile
      podfileContent = podfileContent.trimEnd() + "\n" + actionExtensionTarget;

      fs.writeFileSync(podfilePath, podfileContent);

      return config;
    },
  ]);
};
