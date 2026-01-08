import React from "react";
import { TextInputProps as RNTextInputProps } from "react-native";
export interface TextInputProps extends RNTextInputProps {
}
/**
 * TextInput component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
export declare function TextInput({ allowFontScaling, ...props }: TextInputProps): React.JSX.Element;
export default TextInput;
//# sourceMappingURL=text-input.d.ts.map