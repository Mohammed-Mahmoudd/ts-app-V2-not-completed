import { PortalProvider } from "@gorhom/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";

import "./global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSerif: require("../assets/fonts/NotoSerif_400Regular.ttf"),
    "NotoSerif-Bold": require("../assets/fonts/NotoSerif_700Bold.ttf"),
  });

  useEffect(() => {
    if (error) console.error("Font loading error:", error);
    if (loaded) console.log("Fonts loaded successfully from local assets");
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 font-noto">
      <AuthProvider>
        <PortalProvider>
          <StatusBar hidden />
          <Stack screenOptions={{ headerShown: false }} />
        </PortalProvider>
      </AuthProvider>
    </View>
  );
}
