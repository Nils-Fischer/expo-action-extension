"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductFile = addProductFile;
function addProductFile(xcodeProject, { targetName }) {
    const productFile = xcodeProject.addProductFile(targetName, {
        group: "Copy Files",
        explicitFileType: "wrapper.app-extension",
    });
    xcodeProject.addToPbxBuildFileSection(productFile);
    return productFile;
}
//# sourceMappingURL=addProductFile.js.map