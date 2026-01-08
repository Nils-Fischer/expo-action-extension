import React from "react";
import { ViewProps as RNViewProps } from "react-native";
export interface ViewProps extends RNViewProps {
    children?: React.ReactNode;
}
/**
 * View component for action extensions.
 * Standard View component, exported for consistency with other UI components.
 */
export declare function View({ children, ...props }: ViewProps): React.JSX.Element;
export default View;
//# sourceMappingURL=view.d.ts.map