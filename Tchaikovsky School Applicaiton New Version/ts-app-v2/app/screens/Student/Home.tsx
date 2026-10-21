import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Star,
  TrendingUp,
  User,
} from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View className="px-6">
      {/* Dashboard Header */}
      <View className="mb-6">
        <Text className="text-3xl font-noto-bold text-[#09090B]">
          Dashboard
        </Text>
        <Text className="text-base text-[#71717A] font-noto mt-1">
          Overview of your musical journey.
        </Text>
      </View>

      {/* Stats Cards Row */}
      <View className="flex-row gap-3 mb-8">
        {/* Sessions Card - Dark/Gold */}
        <LinearGradient
          colors={["#292524", "#1C1917"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20, flex: 1, padding: 16, justifyContent: "space-between" }}
        >
          <View className="mb-3">
            <TrendingUp size={22} color="#D4AF37" />
          </View>
          <View>
            <View className="flex-row items-baseline mb-1">
              <Text className="text-2xl font-noto-bold text-white">8</Text>
              <Text className="text-sm text-[#D1D1E3] font-noto">/12</Text>
            </View>
            <Text className="text-[10px] text-[#A1A1AA] font-noto-bold tracking-widest uppercase">
              Sessions
            </Text>
            {/* Progress bar */}
            <View className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <View
                className="h-full bg-[#D4AF37] rounded-full"
                style={{ width: "67%" }}
              />
            </View>
          </View>
        </LinearGradient>

        {/* Attendance Card */}
        <View
          className="flex-1 p-4 rounded-[20px] bg-white border border-[#F4F4F5] justify-between"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <View className="mb-3">
            <User size={22} color="#9F9FA9" />
          </View>
          <View>
            <View className="flex-row items-baseline mb-1">
              <Text className="text-2xl font-noto-bold text-[#09090B]">92</Text>
              <Text className="text-sm text-[#A1A1AA] font-noto">%</Text>
            </View>
            <Text className="text-[9px] text-[#A1A1AA] font-noto-bold tracking-widest uppercase">
              Attendance
            </Text>
          </View>
        </View>

        {/* Files Card */}
        <View
          className="flex-1 p-4 rounded-[20px] bg-white border border-[#F4F4F5] justify-between"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 2,
            elevation: 1,
          }}
        >
          <View className="mb-3">
            <FileText size={22} color="#9F9FA9" />
          </View>
          <View>
            <Text className="text-2xl font-noto-bold text-[#09090B] mb-1">
              14
            </Text>
            <Text className="text-[10px] text-[#A1A1AA] font-noto-bold tracking-widest uppercase">
              Files
            </Text>
          </View>
        </View>
      </View>

      {/* Next Session Section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-l font-noto-bold text-[#09090B]">
          Next Session
        </Text>
        <Link href="/screens/Student/Schedule" asChild>
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
            <Text className="text-sm text-[#D4AF37] font-noto-bold">
              Full Schedule
            </Text>
            <Text className="text-sm text-[#D4AF37] font-noto ml-1">›</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Next Session Card */}
      <View
        className="rounded-[20px] bg-white border border-[#F4F4F5] overflow-hidden mb-8"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        {/* Yellow left accent */}
        <View className="flex-row">
          <View
            style={{
              width: 5,
              backgroundColor: "#D4AF37",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          />
          <View className="flex-1 p-5 ">
            {/* Top row: Tomorrow + Confirmed badge */}
            <View className="flex-row items-center  justify-between mb-3">
              <Text className="text-sm font-noto-bold text-[#D4AF37]">
                Tomorrow
              </Text>
              <View className="border border-[#D4AF37] bg-[#D4AF37]/5  rounded-[11px] px-3 py-1">
                <Text className="text-xs font-noto-bold text-[#D4AF37]">
                  Confirmed
                </Text>
              </View>
            </View>

            {/* Time */}
            <Text className="text-xl font-noto-bold text-[#09090B] mb-2">
              Tuesday, 9:00 AM
            </Text>

            {/* Duration and type */}
            <View className="flex-row items-center gap-2 mb-4">
              <Clock size={14} color="#71717A" />
              <Text className="text-sm text-[#71717A] font-noto">
                45 min • In-Person
              </Text>
            </View>

            {/* Divider */}
            <View className="h-[1px] bg-[#F4F4F5] mb-4" />

            {/* Instructor */}
            <View className="flex-row items-center gap-3 mt-3">
              <Image
                source={require("../../../assets/admin/Primitive.img.png")}
                style={{ width: 40, height: 40, borderRadius: 20 }}
                resizeMode="cover"
              />
              <View>
                <Text className="text-base font-noto-bold text-[#09090B]">
                  Sarah Johnson
                </Text>
                <Text className="text-xs text-[#71717A] font-noto">
                  Piano Instructor • Riyadh Park
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Latest Feedback Section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-noto-bold text-[#09090B]">
          Latest Feedback
        </Text>
        <Link href="/screens/Student/Feedback" asChild>
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center">
            <Text className="text-sm font-noto-bold text-[#A1A1AA] font-noto">View All</Text>
            <Text className="text-sm text-[#A1A1AA] font-noto ml-1">›</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Feedback Card */}
      <View
        className="rounded-[20px] bg-[#FAFAFA] border border-[#F4F4F5] p-5 mb-8"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.03,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        {/* Stars and Date */}
        <View className="flex-row items-center gap-1 mb-4">
          <Star size={16} color="#D4AF37" fill="#D4AF37" />
          <Star size={16} color="#D4AF37" fill="#D4AF37" />
          <Star size={16} color="#D4AF37" fill="#D4AF37" />
          <Star size={16} color="#D4AF37" fill="#D4AF37" />
          <Star size={16} color="#D4D4D8" />
          <Text className="text-xs text-[#A1A1AA] font-noto ml-2">
            Dec 7th
          </Text>
        </View>

        {/* Quote */}
        <Text className="text-[15px] text-[#3F3F46] font-noto leading-6 mb-4">
          &quot;Excellent control of dynamics in the second movement. Focus on
          keeping your wrists more relaxed during the arpeggios.&quot;
        </Text>

        {/* Tags */}
        <View className="flex-row gap-2">
          <View className="border border-[#E4E4E7] rounded-full px-3 py-1.5 bg-white">
            <Text className="text-xs text-[#52525B] font-noto">
              Scale Practice
            </Text>
          </View>
          <View className="border border-[#E4E4E7] rounded-full px-3 py-1.5 bg-white">
            <Text className="text-xs text-[#52525B] font-noto">
              Sight Reading
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Action Cards */}
      <View className="flex-row gap-3 mb-4">
        {/* Practice Material */}
        <Link href="/screens/Student/Material" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-1 p-5 rounded-[20px] bg-white border border-[#F4F4F5] items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <View className="mb-3 p-3 rounded-2xl bg-[#FAFAFA] border border-[#F4F4F5]">
              <FileText size={24} color="#9F9FA9" />
            </View>
            <Text className="text-sm font-noto-bold text-[#3F3F46]">
              Practice Material
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Full Schedule */}
        <Link href="/screens/Student/Schedule" asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-1 p-5 rounded-[20px] bg-white border border-[#F4F4F5] items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.03,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <View className="mb-3 p-3 rounded-2xl bg-[#FAFAFA] border border-[#F4F4F5]">
              <Calendar size={24} color="#9F9FA9" />
            </View>
            <Text className="text-sm font-noto-bold text-[#3F3F46]">
              Full Schedule
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
