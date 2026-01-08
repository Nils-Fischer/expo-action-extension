import { requireNativeModule } from "expo-modules-core";

interface ExpoActionExtensionModuleType {
  close(): void;
  openHostApp(path: string | null): void;
  clearAppGroupContainer(): Promise<void>;
}

export default requireNativeModule<ExpoActionExtensionModuleType>("ExpoActionExtension");
