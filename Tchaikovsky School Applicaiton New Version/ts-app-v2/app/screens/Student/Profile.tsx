import { Box, CreditCard, Mail, MapPin, Phone, Shield } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
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
            My Profile
          </Text>
          <Text className="text-[13px] text-[#71717A] font-noto mt-1">
            Personal details and subscription info.
          </Text>
        </View>

        {/* Profile Card */}
        <View
          className="bg-white rounded-[28px] p-8 items-center mb-8 border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
          }}
        >
          {/* Avatar */}
          <View
            className="w-[96px] h-[96px] rounded-full mb-5 bg-white items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 4,
            }}
          >
            <Image
              source={require("../../../assets/admin/Primitive.img.png")}
              style={{ width: "90%", height: "90%", borderRadius: 100 }}
              resizeMode="cover"
            />
          </View>

          <Text className="text-[22px] font-noto-bold text-[#09090B] mb-1">
            Julia Barcha
          </Text>
          <Text className="text-[14px] font-noto text-[#71717A] mb-4">
            Piano Student
          </Text>
          <View className="bg-[#FCF8F2] px-4 py-1.5 rounded-full">
            <Text className="text-[11px] font-noto-bold text-[#D4AF37]">
              Intermediate Level 4
            </Text>
          </View>
        </View>

        {/* Personal Information Section */}
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-3 ml-2">
          PERSONAL INFORMATION
        </Text>
        <View
          className="bg-white rounded-[28px] mb-8 py-2 overflow-hidden border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 1,
          }}
        >
          {/* Email */}
          <View className="flex-row items-center px-6 py-4 bg-white">
            <View className="w-10 h-10 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Mail size={18} color="#A1A1AA" />
            </View>
            <View className="flex-1">
              <Text className="text-[9px] font-noto-bold text-[#A1A1AA] uppercase tracking-widest mb-0.5">
                EMAIL
              </Text>
              <Text className="text-[14px] font-noto-bold text-[#09090B]">
                julia.b@example.com
              </Text>
            </View>
          </View>

          {/* Phone */}
          <View className="flex-row items-center px-6 py-4 bg-white">
            <View className="w-10 h-10 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <Phone size={18} color="#A1A1AA" />
            </View>
            <View className="flex-1">
              <Text className="text-[9px] font-noto-bold text-[#A1A1AA] uppercase tracking-widest mb-0.5">
                PHONE
              </Text>
              <Text className="text-[14px] font-noto-bold text-[#09090B]">
                +966 50 123 4567
              </Text>
            </View>
          </View>

          {/* Home Branch */}
          <View className="flex-row items-center px-6 py-4 bg-white">
            <View className="w-10 h-10 rounded-full bg-[#FAFAFA] items-center justify-center mr-4">
              <MapPin size={18} color="#A1A1AA" />
            </View>
            <View className="flex-1">
              <Text className="text-[9px] font-noto-bold text-[#A1A1AA] uppercase tracking-widest mb-0.5">
                HOME BRANCH
              </Text>
              <Text className="text-[14px] font-noto-bold text-[#09090B]">
                Riyadh Park Mall
              </Text>
            </View>
          </View>
        </View>

        {/* Subscription Section */}
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-3 ml-2">
          SUBSCRIPTION
        </Text>
        <View
          className="bg-[#1C1C1E] rounded-[28px] mb-8 p-6 pt-7"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          {/* Header row */}
          <View className="flex-row items-center mb-6">
            <View className="w-[46px] h-[46px] rounded-full bg-[#27272A] items-center justify-center mr-4">
              <Box size={22} color="#D4AF37" />
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-noto-bold text-white mb-0.5">
                Premium - 12 Sessions
              </Text>
              <Text className="text-[12px] font-noto text-[#A1A1AA]">
                Active since Sep 2023
              </Text>
            </View>
          </View>

          {/* Balance Sub-card */}
          <View className="bg-[#27272A] rounded-[20px] px-5 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <CreditCard size={18} color="#A1A1AA" />
              <Text className="text-[14px] font-noto-bold text-white ml-3">
                Balance
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-[18px] font-noto-bold text-[#D4AF37] mr-1.5">
                4
              </Text>
              <Text className="text-[13px] font-noto text-[#A1A1AA]">
                Sessions Left
              </Text>
            </View>
          </View>
        </View>

        {/* Support Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-[20px] py-4 border border-[#FECACA] mb-4"
          activeOpacity={0.7}
        >
          <Shield size={18} color="#EF4444" />
          <Text className="text-[14px] font-noto-bold text-[#EF4444] ml-2.5">
            Request Data / Support
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
