import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function ChatRoomScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    participantName: string;
    participantRole: string;
  }>();

  const [messageText, setMessageText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const onHide = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);
  
  // Mock Messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello, I have a question about my schedule.",
      isMine: false,
      time: "10:00 AM",
    },
    {
      id: "2",
      text: "Sure, how can I help you?",
      isMine: true,
      time: "10:02 AM",
    },
  ]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: messageText,
        isMine: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageText("");
  };

  const getRoleLabel = (role: string) => {
    if (role === "instructor") return "Instructor";
    if (role === "student") return "Student";
    return "Admin";
  };

  const renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        alignItems: item.isMine ? "flex-end" : "flex-start",
        paddingHorizontal: 20,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          maxWidth: "78%",
          backgroundColor: item.isMine ? "#F6D75A" : "#FFFFFF",
          borderRadius: 18,
          borderBottomRightRadius: item.isMine ? 4 : 18,
          borderBottomLeftRadius: item.isMine ? 18 : 4,
          paddingHorizontal: 16,
          paddingVertical: 12,
          ...(!item.isMine
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }
            : {}),
        }}
      >
        <Text
          style={{
            fontFamily: "NotoSerif",
            fontSize: 15,
            color: "#1A1A1A",
            lineHeight: 22,
          }}
        >
          {item.text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginTop: 4,
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{ fontFamily: "NotoSerif", fontSize: 11, color: "#ABABAB" }}
        >
          {item.time}
        </Text>
        {item.isMine && (
          <Ionicons name="checkmark-done" size={14} color="#DDB207" />
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#FFF7E6", "#FFFFFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 0.15]}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom:
            keyboardHeight > 0
              ? keyboardHeight - (Platform.OS === "ios" ? insets.bottom : 0)
              : 0,
        }}
      >
        <View style={{ flex: 1, paddingBottom: 0 }}>
          {/* Header */}
          <View
            style={{
              paddingTop: Math.max(insets.top, 20),
              paddingBottom: 12,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#F0F0F0",
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
            </TouchableOpacity>

            <View style={{ marginRight: 12 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#F3F4F6",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person" size={20} color="#9CA3AF" />
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "NotoSerif_700Bold",
                  fontSize: 16,
                  color: "#0F172A",
                  marginBottom: 2,
                }}
              >
                {params.participantName || "User"}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "NotoSerif",
                  fontSize: 12,
                  color: "#64748B",
                  marginBottom: 2,
                }}
              >
                {getRoleLabel(params.participantRole || "")}
              </Text>
            </View>
          </View>

          {/* Messages */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Input Bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 10,
              paddingBottom: Math.max(insets.bottom, 20),
              borderTopWidth: 1,
              borderTopColor: "#F0F0F0",
              backgroundColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "#E5E7EB",
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 10,
              }}
            >
              <TextInput
                placeholder="Type a message..."
                placeholderTextColor="#9CA3AF"
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={2000}
                style={{
                  flex: 1,
                  fontFamily: "NotoSerif",
                  fontSize: 15,
                  color: "#1A1A1A",
                  maxHeight: 120,
                  paddingVertical: 8,
                  textAlignVertical: "center",
                }}
              />
            </View>

            <TouchableOpacity
              onPress={handleSend}
              disabled={!messageText.trim()}
              activeOpacity={0.8}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: messageText.trim() ? "#DDB207" : "#E5E7EB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="send"
                size={20}
                color={messageText.trim() ? "#FFFFFF" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
