import React from "react";
import { TextProps as RNTextProps } from "react-native";
export interface TextProps extends RNTextProps {
    children?: React.ReactNode;
}
/**
 * Text component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
export declare function Text({ style, allowFontScaling, ...props }: TextProps): React.JSX.Element;
export default Text;
//# sourceMappingURL=text.d.ts.map