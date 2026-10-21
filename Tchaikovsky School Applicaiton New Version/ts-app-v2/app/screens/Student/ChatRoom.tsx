import { ArrowLeft, Briefcase, CheckCheck, Send, ShieldCheck } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCK_MESSAGES = [
  { id: 1, type: "date", date: "TODAY" },
  { id: 2, type: "message", text: "Hello! How can I help you today?", time: "10:00 AM", isMine: false, isRead: false },
  { id: 3, type: "message", text: "I have a question about my upcoming class schedule.", time: "10:02 AM", isMine: true, isRead: true },
];

export default function ChatRoom() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const name = (params.name as string) || "Alexander Petrov";
  const role = (params.role as string) || "Instructor";
  const isSupport = params.isSupport === "true";
  const isFinance = role === "Finance";

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

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

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        type: "message",
        text: messageText.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        isMine: true,
        isRead: false,
      }
    ]);
    setMessageText("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <View 
        className="flex-1 bg-white"
        style={{ paddingBottom: keyboardHeight > 0 ? (keyboardHeight - (Platform.OS === 'ios' ? insets.bottom : 0)) : 0 }}
      >
        {/* Header */}
        <View className="pt-12 pb-3 px-4 flex-row items-center border-b border-[#F0F0F0] bg-white">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full bg-white items-center justify-center mr-3 border border-[#E5E7EB]"
          >
            <ArrowLeft size={20} color="#1A1A1A" />
          </TouchableOpacity>

          {isSupport ? (
            <>
              <View className={`w-11 h-11 rounded-full items-center justify-center mr-3 ${isFinance ? 'bg-[#ECFDF5]' : 'bg-[#F3F4F6]'}`}>
                {isFinance ? <Briefcase size={22} color="#10B981" /> : <ShieldCheck size={22} color="#1A1A1A" />}
              </View>
              <View className="flex-1 justify-center">
                <Text className="font-noto-bold text-[18px] text-[#0F172A] mb-0.5" numberOfLines={1}>
                  {name}
                </Text>
                <Text className="font-noto text-[13px] text-[#64748B]" numberOfLines={1}>
                  {isFinance ? 'Finance & Payments' : 'Support Team'}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View className="mr-3">
                <Image
                  source={require("../../../assets/admin/Primitive.img.png")}
                  className="w-11 h-11 rounded-full bg-[#F3F4F6]"
                />
              </View>
              <View className="flex-1 justify-center">
                <Text className="font-noto-bold text-[16px] text-[#0F172A] mb-0.5" numberOfLines={1}>
                  {name}
                </Text>
                <Text className="font-noto text-[12px] text-[#64748B] mb-0.5" numberOfLines={1}>
                  {role}
                </Text>
                <Text className="font-noto text-[11px] text-[#22C55E]" numberOfLines={1}>
                  Active now
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Messages List */}
        <ScrollView 
          className="flex-1 px-5" 
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((item) => {
            if (item.type === "date") {
              return (
                <View key={item.id} className="items-center py-4">
                  <View className="bg-[#F3F4F6] px-3.5 py-1.5 rounded-[12px]">
                    <Text className="font-noto-bold text-[11px] text-[#6B7280] tracking-wider">
                      {item.date}
                    </Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={item.id} className={`mb-1 ${item.isMine ? 'items-end' : 'items-start'}`}>
                <View 
                  className={`max-w-[78%] px-4 py-3 ${item.isMine ? 'bg-[#F6D75A] rounded-[18px] rounded-br-[4px]' : 'bg-white rounded-[18px] rounded-bl-[4px] border border-[#F4F4F5]'}`}
                  style={!item.isMine ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 } : {}}
                >
                  <Text className="font-noto text-[15px] text-[#1A1A1A] leading-[22px]">
                    {item.text}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1 mt-1 px-1 mb-3">
                  <Text className="font-noto text-[11px] text-[#ABABAB]">
                    {item.time}
                  </Text>
                  {item.isMine && (
                    <CheckCheck size={14} color={item.isRead ? "#DDB207" : "#ABABAB"} />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View 
          className="flex-row items-center px-4 py-2.5 bg-white border-t border-[#F0F0F0]"
          style={{ paddingBottom: Math.max(insets.bottom, 10) }}
        >
          <View className="flex-1 flex-row items-center bg-[#F9FAFB] rounded-[24px] border border-[#E5E7EB] px-4 mr-2.5">
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={2000}
              className="flex-1 font-noto text-[15px] text-[#1A1A1A] max-h-[120px] py-2.5"
            />
          </View>

          <TouchableOpacity
            onPress={handleSend}
            disabled={!messageText.trim()}
            activeOpacity={0.8}
            className={`w-11 h-11 rounded-full items-center justify-center ${messageText.trim() ? 'bg-[#DDB207]' : 'bg-[#E5E7EB]'}`}
            style={messageText.trim() ? { shadowColor: '#DDB207', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 } : {}}
          >
            <Send size={18} color={messageText.trim() ? '#FFFFFF' : '#9CA3AF'} className="ml-0.5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
