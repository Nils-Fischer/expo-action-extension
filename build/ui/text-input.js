import React from "react";
import { TextInput as RNTextInput } from "react-native";
/**
 * TextInput component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
export function TextInput({ allowFontScaling = false, ...props }) {
    return React.createElement(RNTextInput, { ...props, allowFontScaling: allowFontScaling });
}
export default TextInput;
//# sourceMappingURL=text-input.js.map