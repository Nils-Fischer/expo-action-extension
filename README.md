# expo-action-extension

iOS Action Extension support for Expo apps. Allows your app to appear in the iOS share sheet as an action extension (via `com.apple.ui-services`).

## Features

- Multiple action extensions per app
- Custom icons per extension
- React Native UI in extensions
- App group data sharing between main app and extensions
- Configurable activation rules (URL, text, images, etc.)

## Installation

```bash
npx expo install expo-action-extension
```

## Configuration

Add the plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-action-extension",
        {
          "extensions": [
            {
              "name": "MyAction",
              "icon": "./assets/action-icon.png",
              "activationRules": [
                { "type": "url" },
                { "type": "text" }
              ]
            }
          ]
        }
      ]
    ]
  }
}
```

### Multiple Extensions

You can configure multiple action extensions:

```json
{
  "plugins": [
    [
      "expo-action-extension",
      {
        "extensions": [
          {
            "name": "SaveLink",
            "icon": "./assets/save-icon.png",
            "activationRules": [{ "type": "url" }]
          },
          {
            "name": "ShareText",
            "icon": "./assets/share-icon.png",
            "entryFile": "index.share.js",
            "activationRules": [{ "type": "text" }]
          }
        ]
      }
    ]
  ]
}
```

### Extension Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `name` | string | Yes | Display name for the extension |
| `icon` | string | Yes | Path to the extension icon (60x60 recommended) |
| `activationRules` | array | No | When the extension appears in share sheet |
| `entryFile` | string | No | Custom entry file (default: `index.action.js`) |
| `moduleName` | string | No | Custom module name (default: `actionExtension`) |
| `backgroundColor` | string | No | Background color for the extension UI |
| `height` | number | No | Height of the extension view |
| `excludedPackages` | array | No | Additional packages to exclude from the extension |
| `googleServicesFile` | string | No | Path to GoogleService-Info.plist |

### Activation Rules

| Type | Description |
|------|-------------|
| `url` | Activates for shared URLs |
| `text` | Activates for shared text |
| `image` | Activates for shared images |
| `video` | Activates for shared videos |
| `file` | Activates for shared files |

## Usage

### Entry File

Create an entry file for your extension (e.g., `index.action.js`):

```javascript
import { AppRegistry } from "react-native";
import ActionExtension from "./ActionExtension";

AppRegistry.registerComponent("actionExtension", () => ActionExtension);
```

### Extension Component

```javascript
import React from "react";
import { View, Text, Button } from "react-native";
import { close, openHostApp } from "expo-action-extension";

export default function ActionExtension() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Action Extension</Text>
      <Button title="Open App" onPress={() => openHostApp()} />
      <Button title="Close" onPress={() => close()} />
    </View>
  );
}
```

### Metro Configuration

Update your `metro.config.js`:

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withActionExtension } = require("expo-action-extension/metro");

const config = getDefaultConfig(__dirname);

module.exports = withActionExtension(config);
```

## API

### `close()`

Closes the action extension.

### `openHostApp(path?: string)`

Opens the host app, optionally navigating to a specific path.

### `clearAppGroupContainer()`

Clears the app group container shared storage.

## Building

After configuration, run:

```bash
npx expo prebuild --platform ios --clean
npx expo run:ios
```

## License

MIT
