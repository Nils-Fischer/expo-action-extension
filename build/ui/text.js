"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = Text;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Text component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
function Text({ style, allowFontScaling = false, ...props }) {
    return react_1.default.createElement(react_native_1.Text, { ...props, style: style, allowFontScaling: allowFontScaling });
}
exports.default = Text;
//# sourceMappingURL=text.js.map