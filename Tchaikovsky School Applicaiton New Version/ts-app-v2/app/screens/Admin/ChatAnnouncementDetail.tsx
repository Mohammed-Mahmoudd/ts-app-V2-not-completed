import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatAnnouncementDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

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
            Announcement Detail
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: Math.max(insets.bottom, 40) }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: "#F0F0F0",
            }}
          >
            <Text
              style={{
                fontFamily: "NotoSerif_700Bold",
                fontSize: 18,
                color: "#1A1A1A",
                marginBottom: 12,
              }}
            >
              School will be closed this Friday due to the holiday.
            </Text>
            <Text
              style={{
                fontFamily: "NotoSerif",
                fontSize: 14,
                color: "#64748B",
                lineHeight: 22,
              }}
            >
              Please note that all scheduled classes for this Friday will be postponed. 
              Instructors will contact you to arrange makeup sessions next week. 
              Enjoy your holiday!
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: "NotoSerif",
                  fontSize: 12,
                  color: "#9CA3AF",
                }}
              >
                Today at 10:00 AM
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
