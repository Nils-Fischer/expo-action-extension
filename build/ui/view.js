import React from "react";
import { View as RNView } from "react-native";
/**
 * View component for action extensions.
 * Standard View component, exported for consistency with other UI components.
 */
export function View({ children, ...props }) {
    return React.createElement(RNView, { ...props }, children);
}
export default View;
//# sourceMappingURL=view.js.map