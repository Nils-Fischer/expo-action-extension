"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = View;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * View component for action extensions.
 * Standard View component, exported for consistency with other UI components.
 */
function View({ children, ...props }) {
    return react_1.default.createElement(react_native_1.View, { ...props }, children);
}
exports.default = View;
//# sourceMappingURL=view.js.map