import ExpoModulesCore

public class ExpoActionExtensionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoActionExtension")

    // Close the action extension
    Function("close") {
      NotificationCenter.default.post(name: NSNotification.Name("close"), object: nil)
    }

    // Open the host app with an optional path
    Function("openHostApp") { (path: String?) in
      NotificationCenter.default.post(
        name: NSNotification.Name("openHostApp"),
        object: nil,
        userInfo: path != nil ? ["path": path!] : nil
      )
    }

    // Clear the app group shared data container
    AsyncFunction("clearAppGroupContainer") { (promise: Promise) in
      guard let appGroup = Bundle.main.object(forInfoDictionaryKey: "AppGroup") as? String else {
        promise.reject("ERR_NO_APP_GROUP", "AppGroup not found in Info.plist")
        return
      }

      guard let containerUrl = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroup) else {
        promise.reject("ERR_NO_CONTAINER", "Could not get container URL for app group")
        return
      }

      let sharedDataUrl = containerUrl.appendingPathComponent("sharedData")

      do {
        if FileManager.default.fileExists(atPath: sharedDataUrl.path) {
          try FileManager.default.removeItem(at: sharedDataUrl)
        }
        promise.resolve(nil)
      } catch {
        promise.reject("ERR_CLEAR_FAILED", "Failed to clear app group container: \(error.localizedDescription)")
      }
    }
  }
}
