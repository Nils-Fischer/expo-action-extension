"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = TextInput;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * TextInput component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
function TextInput({ allowFontScaling = false, ...props }) {
    return react_1.default.createElement(react_native_1.TextInput, { ...props, allowFontScaling: allowFontScaling });
}
exports.default = TextInput;
//# sourceMappingURL=text-input.js.map