import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InstructorMessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isRefetching, setIsRefetching] = useState(false);

  const onRefresh = () => {
    setIsRefetching(true);
    setTimeout(() => setIsRefetching(false), 1000);
  };

  // MOCK DATA
  const studentsList = [
    { _id: "s1", fullName: "Youssef Ahmed", role: "student" },
    { _id: "s2", fullName: "Omar Tarek", role: "student" },
    { _id: "s3", fullName: "Salma Hassan", role: "student" },
    { _id: "s4", fullName: "Laila Magdy", role: "student" },
  ];

  const recentConversations = [
    {
      _id: "c1",
      lastMessage: { content: "Can we review the sheet music today?" },
      lastMessageAt: new Date().toISOString(),
      unreadCount: 1,
      user: {
        _id: "u1",
        fullName: "Youssef Ahmed",
        role: "student",
      },
    },
    {
      _id: "c2",
      lastMessage: { content: "Thank you for the session!" },
      lastMessageAt: new Date(Date.now() - 86400000).toISOString(),
      unreadCount: 0,
      user: {
        _id: "u2",
        fullName: "Omar Tarek",
        role: "student",
      },
    },
  ];

  const getRoleBadge = (role: string) => {
    if (role === "student")
      return { label: "STUDENT", color: "#16A34A", bg: "#F0FDF4" };
    if (role === "instructor")
      return { label: "INSTRUCTOR", color: "#DDB207", bg: "#FFF4DC" };
    return { label: "ADMIN", color: "#475569", bg: "#F1F5F9" };
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return "Yesterday";
  };

  const handleOpenChat = (participant: any) => {
    router.push({
      pathname: "/screens/Instructor/ChatRoom",
      params: {
        participantName: participant.fullName,
        participantRole: participant.role,
      },
    });
  };

  const handleOpenSupport = (type: string) => {
    const name = type === "finance" ? "Finance Team" : "Admin Support";
    const role = type === "finance" ? "Finance" : "Admin";
    router.push({
      pathname: "/screens/Instructor/ChatRoom",
      params: {
        participantName: name,
        participantRole: role,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            colors={["#1A1A1A"]}
          />
        }
      >
        <View style={{ paddingTop: Math.max(insets.top, 20), paddingHorizontal: 20 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                router.back();
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#E5E7EB",
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
              Chat
            </Text>
          </View>

          {/* Search Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginBottom: 24,
            }}
          >
            <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search chats"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                fontFamily: "NotoSerif",
                fontSize: 15,
                color: "#1A1A1A",
                padding: 0,
              }}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Online Students Strip */}
          {!searchQuery && (
            <View style={{ marginBottom: 24 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                {studentsList.map((inst: any) => {
                  return (
                    <TouchableOpacity
                      key={inst._id}
                      activeOpacity={0.7}
                      onPress={() => handleOpenChat(inst)}
                      style={{ alignItems: "center", width: 64 }}
                    >
                      <View style={{ position: "relative", marginBottom: 8 }}>
                        <View
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            backgroundColor: "#F3F4F6",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Ionicons name="person" size={24} color="#9CA3AF" />
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: "#22C55E",
                            borderWidth: 2,
                            borderColor: "#FAFAFA",
                          }}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: "NotoSerif_600SemiBold",
                          fontSize: 11,
                          color: "#1A1A1A",
                          textAlign: "center",
                        }}
                      >
                        {inst.fullName.split(" ")[0]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* RECENT Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "NotoSerif_700Bold",
                fontSize: 12,
                color: "#9CA3AF",
                letterSpacing: 1,
                marginBottom: 12,
              }}
            >
              RECENT
            </Text>

            {recentConversations.map((item: any) => {
              const other = item.user;
              const badge = getRoleBadge(other.role);
              const hasUnread = item.unreadCount > 0;

              return (
                <TouchableOpacity
                  key={item._id}
                  activeOpacity={0.7}
                  onPress={() => handleOpenChat(other)}
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
                  }}
                >
                  <View style={{ position: "relative", marginRight: 14 }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#F3F4F6",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="person" size={24} color="#9CA3AF" />
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        backgroundColor: "#22C55E",
                        borderWidth: 2,
                        borderColor: "#FFFFFF",
                      }}
                    />
                  </View>

                  <View style={{ flex: 1, marginRight: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, flexWrap: "wrap", marginRight: 8 }}>
                        <Text
                          style={{
                            fontFamily: "NotoSerif_700Bold",
                            fontSize: 15,
                            color: "#0F172A",
                            flexShrink: 1,
                            marginRight: 6,
                          }}
                        >
                          {other.fullName}
                        </Text>
                        <View
                          style={{
                            backgroundColor: badge.bg,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 8,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "NotoSerif_700Bold",
                              fontSize: 9,
                              color: badge.color,
                            }}
                          >
                            {badge.label}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ fontFamily: "NotoSerif", fontSize: 11, color: "#94A3B8" }}>
                        {formatTime(item.lastMessageAt)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          fontFamily: hasUnread ? "NotoSerif_700Bold" : "NotoSerif",
                          fontSize: 13,
                          color: hasUnread ? "#0F172A" : "#64748B",
                          marginRight: 8,
                        }}
                      >
                        {item.lastMessage.content}
                      </Text>
                      {hasUnread && (
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#EF4444" }} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* COLLEAGUES Section */}
          {!searchQuery && (
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontFamily: "NotoSerif_700Bold",
                  fontSize: 12,
                  color: "#9CA3AF",
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                COLLEAGUES
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/screens/Instructor/OtherInstructors")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#FFF4DC",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name="people-outline" size={20} color="#DDB207" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "NotoSerif_700Bold", fontSize: 15, color: "#1A1A1A", marginBottom: 2 }}>
                    Other Instructors
                  </Text>
                  <Text style={{ fontFamily: "NotoSerif", fontSize: 12, color: "#6B7280" }}>
                    See all instructors and shared students
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}

          {/* HELP & SERVICES Section */}
          {!searchQuery && (
            <View>
              <Text
                style={{
                  fontFamily: "NotoSerif_700Bold",
                  fontSize: 12,
                  color: "#9CA3AF",
                  letterSpacing: 1,
                  marginBottom: 12,
                }}
              >
                HELP & SERVICES
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleOpenSupport("support")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#F3F4F6",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name="shield-checkmark-outline" size={20} color="#4B5563" />
                </View>
                <Text style={{ flex: 1, fontFamily: "NotoSerif_700Bold", fontSize: 15, color: "#1A1A1A" }}>
                  Admin Support
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleOpenSupport("finance")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#ECFDF5",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                  }}
                >
                  <Ionicons name="business-outline" size={20} color="#10B981" />
                </View>
                <Text style={{ flex: 1, fontFamily: "NotoSerif_700Bold", fontSize: 15, color: "#1A1A1A" }}>
                  Finance Team
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
