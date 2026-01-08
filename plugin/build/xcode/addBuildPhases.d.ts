import { XcodeProject } from "expo/config-plugins";
import type { ActionExtensionConfig } from "../types";
export declare function addBuildPhases(xcodeProject: XcodeProject, { targetUuid, groupName, productFile, extension, }: {
    targetUuid: string;
    groupName: string;
    productFile: {
        uuid: string;
        target: string;
        basename: string;
        group: string;
    };
    extension: ActionExtensionConfig;
}): void;
//# sourceMappingURL=addBuildPhases.d.ts.map