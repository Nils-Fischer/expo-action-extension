import React from "react";
import { View as RNView, ViewProps as RNViewProps } from "react-native";

export interface ViewProps extends RNViewProps {
  children?: React.ReactNode;
}

/**
 * View component for action extensions.
 * Standard View component, exported for consistency with other UI components.
 */
export function View({ children, ...props }: ViewProps) {
  return <RNView {...props}>{children}</RNView>;
}

export default View;
