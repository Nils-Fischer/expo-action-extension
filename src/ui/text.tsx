import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
}

/**
 * Text component with allowFontScaling disabled by default.
 * This prevents text scaling issues in action extensions where
 * font scale may not be properly inherited from the host app.
 */
export function Text({ style, allowFontScaling = false, ...props }: TextProps) {
  return <RNText {...props} style={style} allowFontScaling={allowFontScaling} />;
}

export default Text;
