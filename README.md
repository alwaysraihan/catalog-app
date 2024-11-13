# Getting Started
[![Job Task Demo App (Food Mama)](https://i.ytimg.com/vi/Z2iqGUhWmf8/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB1gGAAuADigIMCAAQARhiIGIoYjAP&rs=AOn4CLD9i_2yZxqLDsHLqfnOu1zBzj13hg)](https://www.youtube.com/watch?v=wyxI688puN8V41ry)
> **Note**: Ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) for both Android and iOS.

This guide will walk you through setting up and running this application on both Android and iOS.

## Prerequisites

- **Node.js** (latest version recommended)
- **npm** or **Yarn** (for package management)
- **Android Studio** with a configured Android emulator
- **Xcode** with an iOS simulator (macOS only)
- [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Installation

### Step 1: Install Dependencies

In the project root directory, install the necessary dependencies.

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

### Step 2: Set Up Google Maps API Key

> **Note**: A Google Maps API Key is required to enable map functionality within the app. Follow these instructions to add your key:

1. **Obtain an API Key**:

   - [Generate an API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key) through the Google Cloud Console. Make sure you enable the necessary Google Maps APIs.

2. **Add API Key to the Project**:

   - **For iOS**:
     - Open `ios/AppDelegate.mm` and replace the placeholder `_YOUR_API_KEY_` on line 10 with your actual API Key.
     ```swift
     // line 10
     [GMSServices provideAPIKey:@"_YOUR_API_KEY_"];
     ```
   - **For Android**:

     - Open your `android/app/src/main/AndroidManifest.xml` replace the placeholder `Your Google maps API Key Here` on line 19 with your actual API Key.
       ```xml
       // line 19
       <meta-data
          android:name="com.google.android.geo.API_KEY"
          android:value="Your Google maps API Key Here"/>
       ```
 - **For Home Screen Area Name**:
     - Open `src\application\@global\constants` and replace the placeholder `GOOGLE_MAPS_API_KEY` on line 2 with your actual API Key.
     ```ts
     // line 2
    export const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';
     ```
## Running the App

### Step 3: Run the App on Your Emulator or Device

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# install CocoaPods dependencies
cd ios && pod install && cd ..

# using npm
npm run ios

# OR using Yarn
yarn ios
```

### Troubleshooting

- **Android**: Make sure the emulator is running or that a device is connected via USB and has debugging enabled.
- **iOS**: Xcode should be configured correctly, and an iOS simulator or device should be connected. For additional issues, try running the app directly from Xcode to see detailed build logs.

If everything is set up correctly, you should see the app running on your Android emulator or iOS simulator.

> **Tip**: You can also run the app directly through Android Studio or Xcode for more granular control over the emulator and simulator environments.
