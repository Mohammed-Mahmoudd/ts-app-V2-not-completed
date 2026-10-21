import { ArrowLeft, Briefcase, ChevronRight, Search, ShieldCheck } from "lucide-react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const INSTRUCTORS = [
  { id: 1, name: "Alexander P.", online: true, image: require("../../../assets/admin/Primitive.img.png") },
  { id: 2, name: "Maria S.", online: true, image: require("../../../assets/admin/Primitive.img.png") },
  { id: 3, name: "James L.", online: false, image: require("../../../assets/admin/Primitive.img.png") },
];

const RECENT_CHATS = [
  {
    id: 1,
    name: "Alexander Petrov",
    role: "INSTRUCTOR",
    roleBg: "#FFF4DC",
    roleColor: "#DDB207",
    lastMessage: "Great job on the Sonata today! Keep practicing the C major section.",
    time: "10:30 AM",
    online: true,
    unread: true,
    image: require("../../../assets/admin/Primitive.img.png"),
  },
  {
    id: 2,
    name: "Maria Stravinsky",
    role: "INSTRUCTOR",
    roleBg: "#FFF4DC",
    roleColor: "#DDB207",
    lastMessage: "Can we reschedule our next class?",
    time: "Yesterday",
    online: false,
    unread: false,
    image: require("../../../assets/admin/Primitive.img.png"),
  },
];

export default function Messages() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-12">
          {/* Header */}
          <View className="flex-row items-center gap-4 mb-6">
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                router.back();
              }}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-[#E5E7EB]"
            >
              <ArrowLeft size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <Text className="text-[24px] font-noto-bold text-[#1A1A1A]">
              Chat
            </Text>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-[20px] border border-[#E5E7EB] px-4 py-3 mb-6">
            <Search size={20} color="#9CA3AF" className="mr-2" />
            <TextInput
              placeholder="Search chats"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 font-noto text-[15px] text-[#1A1A1A] p-0"
            />
          </View>

          {/* Online Instructors */}
          {!searchQuery && (
            <View className="mb-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>
                {INSTRUCTORS.map((inst) => (
                  <TouchableOpacity
                    key={inst.id}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: "/screens/Student/ChatRoom", params: { name: inst.name, role: "Instructor" } })}
                    className="items-center w-16"
                  >
                    <View className="relative mb-2">
                      <Image
                        source={inst.image}
                        className="w-14 h-14 rounded-full bg-[#F3F4F6]"
                      />
                      {inst.online && (
                        <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#FAFAFA]" />
                      )}
                    </View>
                    <Text className="font-noto-semibold text-[11px] text-[#1A1A1A] text-center" numberOfLines={1}>
                      {inst.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* RECENT Section */}
          <View className="mb-6">
            <Text className="font-noto-bold text-[12px] text-[#9CA3AF] tracking-widest mb-3">
              RECENT
            </Text>

            {RECENT_CHATS.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase())).map((chat) => (
              <TouchableOpacity
                key={chat.id}
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: "/screens/Student/ChatRoom", params: { name: chat.name, role: "Instructor" } })}
                className="flex-row items-center py-3.5 px-4 bg-white rounded-[16px] border border-[#F0F0F0] mb-2.5"
              >
                {/* Avatar */}
                <View className="relative mr-3.5">
                  <Image
                    source={chat.image}
                    className="w-[50px] h-[50px] rounded-full bg-[#F3F4F6]"
                  />
                  {chat.online && (
                    <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white" />
                  )}
                </View>

                {/* Content */}
                <View className="flex-1 mr-2">
                  <View className="flex-row items-start justify-between mb-1">
                    <View className="flex-row items-center flex-1 mr-2">
                      <Text className="font-noto-bold text-[15px] text-[#0F172A] mr-1.5" numberOfLines={1}>
                        {chat.name}
                      </Text>
                      <View className="px-1.5 py-0.5 rounded-[8px]" style={{ backgroundColor: chat.roleBg }}>
                        <Text className="font-noto-bold text-[9px]" style={{ color: chat.roleColor }}>
                          {chat.role}
                        </Text>
                      </View>
                    </View>
                    <Text className="font-noto text-[11px] text-[#94A3B8] mt-0.5">
                      {chat.time}
                    </Text>
                  </View>
                  
                  <View className="flex-row items-center justify-between">
                    <Text
                      numberOfLines={1}
                      className={`flex-1 mr-2 text-[13px] ${chat.unread ? 'font-noto-bold text-[#0F172A]' : 'font-noto text-[#64748B]'}`}
                    >
                      {chat.lastMessage}
                    </Text>
                    {chat.unread && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* HELP & SERVICES */}
          {!searchQuery && (
            <View>
              <Text className="font-noto-bold text-[12px] text-[#9CA3AF] tracking-widest mb-3">
                HELP & SERVICES
              </Text>

              {/* Admin Support */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: "/screens/Student/ChatRoom", params: { name: "Admin Support", role: "Admin", isSupport: "true" } })}
                className="flex-row items-center py-4 px-4 bg-white rounded-[16px] border border-[#F0F0F0] mb-2.5"
              >
                <View className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center mr-4">
                  <ShieldCheck size={20} color="#4B5563" />
                </View>
                <Text className="flex-1 font-noto-bold text-[15px] text-[#1A1A1A]">
                  Admin Support
                </Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Finance Team */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push({ pathname: "/screens/Student/ChatRoom", params: { name: "Finance Team", role: "Finance", isSupport: "true" } })}
                className="flex-row items-center py-4 px-4 bg-white rounded-[16px] border border-[#F0F0F0]"
              >
                <View className="w-10 h-10 rounded-full bg-[#ECFDF5] items-center justify-center mr-4">
                  <Briefcase size={20} color="#10B981" />
                </View>
                <Text className="flex-1 font-noto-bold text-[15px] text-[#1A1A1A]">
                  Finance Team
                </Text>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          )}

        </View>
      </ScrollView>
    </View>
  );
}
