import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatManagementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#FFF8F0", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.25]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingTop: Math.max(insets.top, 20) }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#F0F0F0",
              marginRight: 14,
            }}
          >
            <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "NotoSerif_700Bold",
              fontSize: 24,
              color: "#1A1A1A",
            }}
          >
            Management
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 40) }}>
          <View style={{ padding: 20, alignItems: "center" }}>
            <Ionicons name="business-outline" size={48} color="#D1D5DB" />
            <Text style={{ fontFamily: "NotoSerif", color: "#9CA3AF", marginTop: 16 }}>
              No management conversations found.
            </Text>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
