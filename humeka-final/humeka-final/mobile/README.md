# Expo App - Getting Started

This guide provides instructions on how to run the Expo app on a physical device using Expo Go and on an Android emulator using Android Studio.

## Prerequisites
- [Node.js](https://nodejs.org/) installed (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally:
  ```sh
  npm install -g expo-cli
  ```
- [Android Studio](https://developer.android.com/studio) installed (for emulator usage)
- An Android or iOS device with [Expo Go](https://expo.dev/client) installed (for physical device testing)

## Add environment variables
   ```sh
   EXPO_PUBLIC_BASE_URL=http://your-ip-address:3000/api
   ```

## Running the App

### 1. Running on a Physical Device (Expo Go)
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the Expo development server:
   ```sh
   npm start
   ```
3. Scan the QR code displayed in the terminal or Expo Developer Tools using the Expo Go app on your device.
4. The app should open on your physical device.

### 2. Running on an Android Emulator
#### Step 1: Set Up an Android Emulator in Android Studio
1. Open Android Studio and go to **Tools > Device Manager**.
2. Click on **Create Device**.
3. Choose a **Pixel** device (or any other preferred device).
4. Select a system image (API Level 30 or higher recommended) and download it if necessary.
5. Click **Next** and then **Finish**.
6. In the **Device Manager**, click the **Play** button to start the emulator.

#### Step 2: Run the Expo App in the Emulator
1. Open a terminal and navigate to the project folder.
2. Start the Expo development server:
   ```sh
   npm start
   ```
3. In the Expo CLI terminal, press **'a'** to open the app inside the running emulator.

The app should now launch inside the emulator.

## Troubleshooting
- If the emulator does not appear, ensure that Android Studio is running and that you have started an emulator.
- If you encounter issues with Expo Go on a physical device, try restarting the Expo server and your device.
- Ensure that your device and development machine are connected to the same network for QR code scanning.

## Additional Resources
- [Expo Documentation](https://docs.expo.dev/)
- [Android Emulator Setup](https://developer.android.com/studio/run/emulator)

Enjoy developing with Expo! 🚀

