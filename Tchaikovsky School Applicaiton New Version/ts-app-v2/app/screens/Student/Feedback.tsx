import { BookOpen, ChevronDown, Lock, Star } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Feedback() {
  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-noto-bold text-[#09090B]">
            Session Feedback
          </Text>
          <Text className="text-sm text-[#71717A] font-noto mt-1">
            Instructor notes and performance ratings.
          </Text>
        </View>

        {/* Filters */}
        <View className="flex-row items-center gap-3 mb-6">
          <TouchableOpacity className="flex-row items-center bg-white border border-[#F4F4F5] rounded-[16px] px-4 py-2.5">
            <Text className="text-[12px] font-noto-bold text-[#3F3F46] mr-2">
              Last 8 Sessions
            </Text>
            <ChevronDown size={14} color="#A1A1AA" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white border border-[#F4F4F5] rounded-[16px] px-4 py-2.5">
            <Text className="text-[12px] font-noto-bold text-[#3F3F46] mr-2">
              All Types
            </Text>
            <ChevronDown size={14} color="#A1A1AA" />
          </TouchableOpacity>
        </View>

        {/* Feedback Cards */}
        <View className="gap-5">
          {/* Card 1 */}
          <View
            className="bg-white border border-[#F4F4F5] rounded-[24px] p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.02,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1,
            }}
          >
            {/* Top Row: Rating, Date, Stars */}
            <View className="flex-row mb-5">
              <View className="w-[45px] h-[45px] bg-[#FCF8F2] rounded-[14px] items-center justify-center mr-4">
                <Text className="text-[15px] font-noto-bold text-[#D4AF37]">
                  5.0
                </Text>
              </View>
              <View className="flex-1 justify-center pt-0.5">
                <Text className="text-[16px] font-noto-bold text-[#09090B] mb-1">
                  Dec 12, 2024
                </Text>
                <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                  SARAH JOHNSON • IN-PERSON
                </Text>
              </View>
              <View className="flex-row items-center gap-0.5 pt-1">
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
              </View>
            </View>

            {/* Blockquote */}
            <View className="border-l-2 border-[#EAD292] pl-4 py-1.5 mb-6 ml-1">
              <Text className="text-[14px] text-[#3F3F46] font-noto leading-relaxed">
                "Excellent focus today. The dynamics in the second movement were
                much improved. Keep working on the tempo stability."
              </Text>
            </View>

            {/* Assigned Homework */}
            <View className="bg-[#FAFAFA] rounded-[16px] p-4 flex-row items-start gap-3">
              <View className="mt-0.5">
                <BookOpen size={16} color="#A1A1AA" />
              </View>
              <View className="flex-1 pt-0.5">
                <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-1.5">
                  ASSIGNED HOMEWORK
                </Text>
                <Text className="text-[13px] text-[#09090B] font-noto leading-[18px]">
                  Practice scales G major & E minor, 3 octaves.
                </Text>
              </View>
            </View>
          </View>

          {/* Card 2 */}
          <View
            className="bg-white border border-[#F4F4F5] rounded-[24px] p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.02,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1,
            }}
          >
            {/* Top Row: Rating, Date, Stars */}
            <View className="flex-row mb-5">
              <View className="w-[45px] h-[45px] bg-[#FCF8F2] rounded-[14px] items-center justify-center mr-4">
                <Text className="text-[15px] font-noto-bold text-[#D4AF37]">
                  4.0
                </Text>
              </View>
              <View className="flex-1 justify-center pt-0.5">
                <Text className="text-[16px] font-noto-bold text-[#09090B] mb-1">
                  Dec 05, 2024
                </Text>
                <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                  SARAH JOHNSON • ONLINE PRACTICE
                </Text>
              </View>
              <View className="flex-row items-center gap-0.5 pt-1">
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#D4AF37" fill="#D4AF37" />
                <Star size={14} color="#E4E4E7" fill="transparent" />
              </View>
            </View>

            {/* Blockquote */}
            <View className="border-l-2 border-[#EAD292] pl-4 py-1.5 mb-6 ml-1">
              <Text className="text-[14px] text-[#3F3F46] font-noto leading-relaxed">
                "Good progress on the piece. Watch your fingering in measure 12-16."
              </Text>
            </View>

            {/* Assigned Homework */}
            <View className="bg-[#FAFAFA] rounded-[16px] p-4 flex-row items-start gap-3">
              <View className="mt-0.5">
                <BookOpen size={16} color="#A1A1AA" />
              </View>
              <View className="flex-1 pt-0.5">
                <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-1.5">
                  ASSIGNED HOMEWORK
                </Text>
                <Text className="text-[13px] text-[#09090B] font-noto leading-[18px]">
                  Memorize the first page.
                </Text>
              </View>
            </View>
          </View>

          {/* Card 3 (Locked) */}
          <View
            className="bg-[#FAFAFA] border border-[#F4F4F5] rounded-[24px] p-8 items-center mt-2"
          >
            <View className="w-12 h-12 bg-[#F4F4F5] rounded-full items-center justify-center mb-4">
              <Lock size={18} color="#A1A1AA" />
            </View>
            <Text className="text-[15px] font-noto-bold text-[#3F3F46] mb-1.5">
              Feedback Locked
            </Text>
            <Text className="text-[12px] text-[#A1A1AA] font-noto mb-5">
              Nov 28, 2024 • Online Theory
            </Text>
            <View className="bg-white border border-[#E4E4E7] rounded-full px-4 py-2">
              <Text className="text-[11px] font-noto-bold text-[#D4D4D8]">
                Outside 48h Window
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
