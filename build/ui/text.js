import React from "react";
import { Text as RNText } from "react-native";
/**
 * Text component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
export function Text({ style, allowFontScaling = false, ...props }) {
    return React.createElement(RNText, { ...props, style: style, allowFontScaling: allowFontScaling });
}
export default Text;
//# sourceMappingURL=text.js.map