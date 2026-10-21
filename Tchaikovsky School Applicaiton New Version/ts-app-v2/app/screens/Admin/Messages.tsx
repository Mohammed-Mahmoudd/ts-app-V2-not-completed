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

export default function MessagesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isRefetching, setIsRefetching] = useState(false);

  const onRefresh = () => {
    setIsRefetching(true);
    setTimeout(() => setIsRefetching(false), 1000);
  };

  // MOCK DATA
  const conversations = [
    {
      _id: "1",
      lastMessage: { content: "See you tomorrow!" },
      lastMessageAt: new Date().toISOString(),
      unreadCount: 2,
      isSupportTicket: false,
      participants: [
        {
          _id: "p1",
          fullName: "John Doe",
          role: "student",
          branchLocation: "Cairo",
          lastSeenAt: new Date().toISOString(),
        },
      ],
    },
    {
      _id: "2",
      lastMessage: { content: "Can we reschedule my piano class?" },
      lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
      unreadCount: 0,
      isSupportTicket: false,
      participants: [
        {
          _id: "p2",
          fullName: "Sarah Smith",
          role: "instructor",
          branchLocation: "Alexandria",
          lastSeenAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
    },
  ];

  const latestAnnouncements = [
    {
      _id: "a1",
      audienceRole: "all",
      content: "School will be closed this Friday due to the holiday.",
      createdAt: new Date().toISOString(),
      isRead: false,
      scope: "all",
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
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOpenChat = (item: any) => {
    const other = item.participants[0];
    router.push({
      pathname: "/screens/Admin/ChatRoom",
      params: {
        participantName: other.fullName,
        participantRole: other.role,
      },
    });
  };

  return (
    <LinearGradient
      colors={["#FFF8F0", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.25]}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingTop: Math.max(insets.top, 20) }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <Text
              style={{
                fontFamily: "NotoSerif_700Bold",
                fontSize: 24,
                color: "#1A1A1A",
              }}
            >
              Messages
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/screens/Admin/ChatBrowsePeople")}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: "#1A1A1A",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={onRefresh}
              colors={["#1A1A1A"]}
            />
          }
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 40) }}
        >
          {/* Search Bar */}
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
              <Ionicons
                name="search"
                size={20}
                color="#ADAEBC"
                style={{ marginRight: 10 }}
              />
              <TextInput
                placeholder="Search chats, people, channels..."
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

          {/* Pinned Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 12,
              }}
            >
              <Ionicons name="pin" size={14} color="#9CA3AF" />
              <Text
                style={{
                  fontFamily: "NotoSerif_700Bold",
                  fontSize: 11,
                  color: "#9CA3AF",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Pinned
              </Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              <TouchableOpacity
                onPress={() => router.push("/screens/Admin/ChatManagement")}
                style={{
                  flex: 1,
                  minWidth: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#FCFBF9",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="business-outline" size={20} color="#1A1A1A" />
                </View>
                <Text
                  style={{
                    fontFamily: "NotoSerif_700Bold",
                    fontSize: 12,
                    color: "#1A1A1A",
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                >
                  Management
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/screens/Admin/ChatBrowsePeople")}
                style={{
                  flex: 1,
                  minWidth: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#FCFBF9",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="people-outline" size={20} color="#1A1A1A" />
                </View>
                <Text
                  style={{
                    fontFamily: "NotoSerif_700Bold",
                    fontSize: 12,
                    color: "#1A1A1A",
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                >
                  Browse People
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/screens/Admin/ChatAnnouncements")}
                style={{
                  flex: 1,
                  minWidth: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#FFF4DC",
                  padding: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#EFEFEF",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#FFF4DC",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="megaphone-outline" size={20} color="#DDB207" />
                </View>
                <Text
                  style={{
                    fontFamily: "NotoSerif_700Bold",
                    fontSize: 12,
                    color: "#1A1A1A",
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                >
                  Announcements
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/screens/Admin/ChatSupportInbox")}
                style={{
                  flex: 1,
                  minWidth: "45%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#FFFFFF",
                  padding: 10,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#EFEFEF",
                }}
              >
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#F0FDF4",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="headset-outline" size={20} color="#16A34A" />
                </View>
                <Text
                  style={{
                    fontFamily: "NotoSerif_700Bold",
                    fontSize: 12,
                    color: "#1A1A1A",
                    flexShrink: 1,
                  }}
                  numberOfLines={1}
                >
                  Support Inbox
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Announcement Channels */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                paddingHorizontal: 20,
                fontFamily: "NotoSerif_700Bold",
                fontSize: 14,
                color: "#A0A0A0",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Announcement Channels
            </Text>

            {latestAnnouncements.map((announcement) => (
              <TouchableOpacity
                key={announcement._id}
                onPress={() =>
                  router.push(`/screens/Admin/ChatAnnouncementDetail?id=${announcement._id}`)
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
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                    borderWidth: 1,
                    borderColor: "#F0F0F0",
                  }}
                >
                  <Ionicons name="megaphone" size={20} color="#1A1A1A" />
                </View>

                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSerif_700Bold",
                        fontSize: 16,
                        color: "#0F172A",
                      }}
                    >
                      {announcement.audienceRole === "all" ? "All" : "Students"}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "NotoSerif",
                        fontSize: 12,
                        color: !announcement.isRead ? "#DDB207" : "#9CA3AF",
                      }}
                    >
                      Today
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 11,
                      color: "#9CA3AF",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Announcement
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: "NotoSerif_600SemiBold",
                      fontSize: 14,
                      color: !announcement.isRead ? "#0F172A" : "#64748B",
                    }}
                  >
                    {announcement.content}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Conversations */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                paddingHorizontal: 20,
                fontFamily: "NotoSerif_700Bold",
                fontSize: 11,
                color: "#9CA3AF",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Recent Conversations
            </Text>

            {conversations.map((conv) => {
              const other = conv.participants[0];
              const badge = getRoleBadge(other.role);
              const hasUnread = conv.unreadCount > 0;

              return (
                <TouchableOpacity
                  key={conv._id}
                  activeOpacity={0.7}
                  onPress={() => handleOpenChat(conv)}
                  style={{
                    flexDirection: "row",
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: "NotoSerif_700Bold",
                          fontSize: 16,
                          color: "#0F172A",
                          flex: 1,
                          marginRight: 10,
                        }}
                      >
                        {other.fullName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "NotoSerif",
                          fontSize: 12,
                          color: "#9CA3AF",
                        }}
                      >
                        {formatTime(conv.lastMessageAt)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: "NotoSerif",
                          fontSize: 13,
                          color: "#64748B",
                        }}
                      >
                        {other.branchLocation} • Active now
                      </Text>
                      <View
                        style={{
                          backgroundColor: badge.bg,
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "NotoSerif_700Bold",
                            fontSize: 10,
                            color: badge.color,
                            letterSpacing: 0.5,
                          }}
                        >
                          {badge.label}
                        </Text>
                      </View>
                    </View>

                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: "NotoSerif_600SemiBold",
                        fontSize: 15,
                        color: hasUnread ? "#0F172A" : "#475569",
                      }}
                    >
                      {conv.lastMessage.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
