import { 
  Bell, 
  ChevronRight, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Mail, 
  Shield, 
  User 
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-[26px] font-noto-bold text-[#09090B]">
            Settings
          </Text>
          <Text className="text-[13px] text-[#71717A] font-noto mt-1">
            Manage your account preferences and app settings.
          </Text>
        </View>

        {/* Profile Card */}
        <View
          className="bg-white rounded-[24px] p-5 flex-row items-center mb-8 border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
          }}
        >
          {/* Avatar with gold gradient border */}
          <View className="w-[56px] h-[56px] rounded-full mr-4">
            <LinearGradient
              colors={["#D4AF37", "#F3E5AB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 28, padding: 2, flex: 1 }}
            >
              <View className="w-full h-full bg-white rounded-full items-center justify-center">
                <Text className="text-[20px] font-noto-bold text-[#D4AF37]">
                  J
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View className="flex-1">
            <Text className="text-[15px] font-noto-bold text-[#09090B] mb-0.5">
              Julia Barcha
            </Text>
            <Text className="text-[12px] font-noto text-[#71717A] mb-0.5">
              Student • Piano
            </Text>
            <Text className="text-[11px] font-noto text-[#A1A1AA]">
              julia.barcha@example.com
            </Text>
          </View>
        </View>

        {/* Account Section */}
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-3 ml-2">
          ACCOUNT
        </Text>
        <View
          className="bg-white rounded-[24px] mb-8 overflow-hidden border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 1,
          }}
        >
          {/* Personal Info */}
          <TouchableOpacity className="flex-row items-center px-5 py-4 bg-white" activeOpacity={0.7}>
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <User size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Personal Information
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                Name, date of birth, contact info
              </Text>
            </View>
            <ChevronRight size={16} color="#D4D4D8" />
          </TouchableOpacity>
          <View className="h-[1px] bg-[#F4F4F5] ml-[72px]" />

          {/* Security */}
          <TouchableOpacity className="flex-row items-center px-5 py-4 bg-white" activeOpacity={0.7}>
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Shield size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Security
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                Password, 2FA
              </Text>
            </View>
            <ChevronRight size={16} color="#D4D4D8" />
          </TouchableOpacity>
          <View className="h-[1px] bg-[#F4F4F5] ml-[72px]" />

          {/* Language */}
          <TouchableOpacity className="flex-row items-center px-5 py-4 bg-white" activeOpacity={0.7}>
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Globe size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Language
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                English (US)
              </Text>
            </View>
            <ChevronRight size={16} color="#D4D4D8" />
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-3 ml-2">
          NOTIFICATIONS
        </Text>
        <View
          className="bg-white rounded-[24px] mb-8 overflow-hidden border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 1,
          }}
        >
          {/* Push Notifications */}
          <View className="flex-row items-center px-5 py-4 bg-white">
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Bell size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Push Notifications
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                Session reminders, updates
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: "#E4E4E7", true: "#D4AF37" }}
              thumbColor={"#FFFFFF"}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
          <View className="h-[1px] bg-[#F4F4F5] ml-[72px]" />

          {/* Email Notifications */}
          <View className="flex-row items-center px-5 py-4 bg-white">
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Mail size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Email Notifications
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                Session summaries, receipts
              </Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: "#E4E4E7", true: "#D4AF37" }}
              thumbColor={"#FFFFFF"}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Support Section */}
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-3 ml-2">
          SUPPORT
        </Text>
        <View
          className="bg-white rounded-[24px] mb-8 overflow-hidden border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 1,
          }}
        >
          <TouchableOpacity className="flex-row items-center px-5 py-4 bg-white" activeOpacity={0.7}>
            <View className="w-9 h-9 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <HelpCircle size={16} color="#52525B" />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                Help Center
              </Text>
              <Text className="text-[11px] font-noto text-[#A1A1AA]">
                FAQs, Contact Support
              </Text>
            </View>
            <ChevronRight size={16} color="#D4D4D8" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-[20px] py-4 border border-[#F4F4F5] mb-8"
          activeOpacity={0.7}
        >
          <LogOut size={16} color="#52525B" />
          <Text className="text-[14px] font-noto-bold text-[#52525B] ml-2">
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* Footer Version */}
        <View className="items-center pb-6">
          <Text className="text-[10px] font-noto text-[#D4D4D8]">
            Version 2.4.0 • Build 2024.05.15
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
