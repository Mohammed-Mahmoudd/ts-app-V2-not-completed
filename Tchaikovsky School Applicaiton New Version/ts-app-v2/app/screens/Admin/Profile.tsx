import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Edit, LogOut, Mail, MapPin, Phone } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-noto-bold text-[#18181B] mb-2">
          My Profile
        </Text>
        <Text className="text-base font-noto text-[#71717A]">
          Manage your account settings and personal information.
        </Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-[#18181B] rounded-[32px] p-5 px-8 flex-row items-center justify-center mb-6 self-start"
      >
        <Edit size={20} color="#FFFFFF" />
        <Text className="ml-3 text-base font-noto-bold text-white">
          Edit Profile
        </Text>
      </TouchableOpacity>

      {/* Profile Image */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full ">
          <Image
            source={require("../../../assets/admin/adhamProfile.png")}
            style={{ width: "100%", height: "100%", borderRadius: 100 }}
            resizeMode="cover"
          />
        </View>
        <Text className="text-2xl font-noto-bold text-[#18181B] mt-4">
          Adham
        </Text>
        <Text className="text-base font-noto text-[#71717A] mt-1">
          Administrator
        </Text>
      </View>

      {/* Role and Status */}
      <View className="flex-row justify-center gap-3 mb-6">
        <View className="flex-1 items-center bg-[#FAFAFA] border border-[#F4F4F5] rounded-2xl p-4">
          <Text className="text-lg font-noto text-[#71717A] mb-1">ROLE</Text>
          <Text className="text-base font-noto-bold text-[#18181B]">Admin</Text>
        </View>
        <View className="flex-1 items-center bg-[#FAFAFA] border border-[#F4F4F5] rounded-2xl p-4">
          <Text className="text-lg font-noto text-[#71717A] mb-1">STATUS</Text>
          <Text className="text-base font-noto-bold text-green-600">
            Active
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View className="bg-white border border-[#F4F4F5] rounded-[32px] p-9 shadow-sm mb-6">
        <Text className="text-xl font-noto-bold text-[#18181B] mb-6">
          Contact Information
        </Text>

        <View className="gap-7">
          <View className="flex-row items-center gap-6">
            <Mail size={18} color="#71717A" />
            <Text className="text-md font-noto text-[#18181B]">
              adham@melody.com
            </Text>
          </View>

          <View className="flex-row items-center gap-6">
            <Phone size={18} color="#71717A" />
            <Text className="text-md font-noto text-[#18181B]">
              +966 50 123 4567
            </Text>
          </View>

          <View className="flex-row items-center gap-6">
            <MapPin size={18} color="#71717A" />
            <Text className="text-md font-noto text-[#18181B]">
              Riyadh, Saudi Arabia
            </Text>
          </View>
        </View>
      </View>

      {/* Personal Details */}
      <View className="bg-white border border-[#F4F4F5] rounded-[32px] p-9 shadow-sm mb-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-noto-bold text-[#18181B]">
            Personal Details
          </Text>
          <Text className="text-sm font-noto text-[#9F9FA9]">View Only</Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-md font-noto text-[#71717A] mb-1">
              First Name
            </Text>
            <Text className="text-base font-noto text-[#18181B]">Adham</Text>
          </View>

          <View>
            <Text className="text-md font-noto text-[#71717A] mb-1">
              Last Name
            </Text>
            <Text className="text-base font-noto text-[#18181B]">Smith</Text>
          </View>

          <View>
            <Text className="text-md font-noto text-[#71717A] mb-1">
              Email Address
            </Text>
            <Text className="text-base font-noto text-[#18181B]">
              adham@melody.com
            </Text>
          </View>

          <View>
            <Text className="text-md font-noto text-[#71717A] mb-1">
              Phone Number
            </Text>
            <Text className="text-base font-noto text-[#18181B]">
              +966 50 123 4567
            </Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => console.log("Logout pressed")}
      >
        <LinearGradient
          colors={["#fb2c361A", "#E7000B1A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="rounded-[32px] p-5 flex-row items-center justify-center"
        >
          <LogOut size={20} color="#FF6467" />
          <Text className="ml-3 text-base font-noto-bold text-[#FF6467]">
            Logout
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}
