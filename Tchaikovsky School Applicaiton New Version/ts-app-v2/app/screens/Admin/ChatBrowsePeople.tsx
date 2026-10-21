import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatBrowsePeopleScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const mockUsers = [
    { id: "1", name: "Alice Johnson", role: "instructor", branch: "Cairo" },
    { id: "2", name: "Bob Smith", role: "student", branch: "Alexandria" },
  ];

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
            Browse People
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#F0F0F0",
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <Ionicons name="search" size={20} color="#ADAEBC" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search by name, role, branch..."
              placeholderTextColor="#ADAEBC"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontFamily: "NotoSerif",
                fontSize: 14,
                color: "#1A1A1A",
                padding: 0,
              }}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 40) }}>
          {mockUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              onPress={() =>
                router.push({
                  pathname: "/screens/Admin/ChatRoom",
                  params: { participantName: user.name, participantRole: user.role },
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 14,
                paddingHorizontal: 16,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#F0F0F0",
                marginBottom: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  marginRight: 14,
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "#F3F4F6",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person" size={20} color="#9CA3AF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "NotoSerif_700Bold",
                    fontSize: 16,
                    color: "#0F172A",
                  }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "NotoSerif",
                    fontSize: 13,
                    color: "#64748B",
                  }}
                >
                  {user.role} • {user.branch}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
