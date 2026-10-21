import { useLocalSearchParams, useRouter } from "expo-router";
import {
  LucideArrowLeft,
  LucideCalendar,
  LucideMusic,
  LucideClipboardList,
  LucideEdit,
  LucideMoveUpRight,
  LucideFileText,
  LucideMedal,
  LucideMessageSquare,
  LucideCalendarDays,
  LucideStar,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function StudentFeedbackHistory() {
  const router = useRouter();
  const { name, instrument } = useLocalSearchParams();

  // Mock data based on user request
  const studentName = name || "Dana Rossel";
  const className = "Emma Thompson";
  const instrumentName = instrument || "Piano";

  const renderStars = (rating: number, color = "#000000", size = 16) => {
    return (
      <View className="flex-row gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <LucideStar
            key={s}
            size={size}
            color={s <= rating ? color : "#E4E4E7"}
            fill={s <= rating ? color : "transparent"}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      className="flex-1 p-6"
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-8 flex-row">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-4 p-2 -ml-2 self-start"
        >
          <LucideArrowLeft size={24} color="#18181B" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-noto-bold text-[#18181B]">
            {studentName.split(" ")[0]}’s Feedback
          </Text>
          <Text className="text-[#71717B] font-noto text-base mt-1">
            {className} . {instrumentName}
          </Text>
        </View>
      </View>

      {/* Summary Metrics */}
      <View className="flex-row justify-between gap-3 mb-8">
        {[
          {
            icon: LucideMedal,
            value: "5.0",
            label: "Avg Rating",
            color: "#000000",
          },
          {
            icon: LucideCalendarDays,
            value: "1",
            label: "Sessions",
            color: "#18181B",
          },
          {
            icon: LucideMoveUpRight,
            value: "67%",
            label: "Complete",
            color: "#000000ff",
          },
        ].map((stat, i) => (
          <View
            key={i}
            className="flex-1 bg-white border border-[#E6E6E6] rounded-2xl p-4 px-6 gap-4"
          >
            <stat.icon size={15} color={stat.color} className="mb-2" />
            <Text className="text-xl font-noto-bold text-[#4B5563]">
              {stat.value}
            </Text>
            <Text className="text-[10px] font-noto-bold text-[#4B5563] uppercase tracking-wider">
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress Overview Section */}
      <View className="bg-white  rounded-[32px] p-6 mb-10">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-2">
            <LucideMoveUpRight size={15} color="#18181B" />
            <Text className="text-md font-noto text-[#18181B]">
              Progress Overview
            </Text>
          </View>
          <Text className="text-xs font-noto text-[#000000]">
            8 of 12 sessions completed
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="flex-1 h-3 bg-[#E4E4E7] rounded-full overflow-hidden">
            <View className="h-full bg-[#18181B] w-[67%] rounded-full" />
          </View>
          {renderStars(5)}
        </View>
      </View>

      {/* Recent Feedback Section */}
      <View>
        <Text className="text-2xl font-noto-bold text-[#18181B] mb-6">
          Recent Feedback
        </Text>

        {/* Feedback Card */}
        <View className="bg-white border border-[#EFEFEF] rounded-[32px] p-6 shadow-sm">
          {/* Row 1: Session type and Date */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Text className="text-[#4B5563] font-noto-bold text-xs">
                Session Type
              </Text>
              <View className="bg-[#E5E7EB] flex-row px-3 py-1.5 rounded-full">
                <Text className="text-[#4B5563] font-noto-bold text-xs">
                  Online Practice
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1.5">
              <LucideCalendar size={14} color="#9F9FA9" />
              <Text className="text-xs font-noto-bold text-[#4B5563]">
                Oct 25, 2025
              </Text>
            </View>
          </View>

          {/* Row 2: Attendance Rate */}
          <View className="flex-row items-center mt-2 gap-2 mb-6">
            <Text className="text-sm font-noto-bold text-[#4B5563]">
              Attendance Rate
            </Text>
            <View className="bg-[#E5E7EB] px-3 py-1.5 rounded-full">
              <Text className="text-[#4B5563] font-noto-bold text-[10px]">
                Medium
              </Text>
            </View>
          </View>

          {/* Row 3: Session count */}
          <Text className="text-sm font-noto-bold text-[#4B5563] mb-6">
            Session 8 / 12
          </Text>

          {/* Row 4: Session Feedback */}
          <View className="flex-row items-center gap-4 mb-4">
            <View className="flex-row items-center gap-2">
              <LucideMusic size={16} color="#4B5563" />
              <Text className="text-sm font-noto-bold text-[#4B5563]">
                Session Feedback
              </Text>
            </View>
            {renderStars(5)}
          </View>

          {/* Row 5: Homework Performance */}
          <View className="flex-row items-center gap-4 mb-6">
            <View className="flex-row items-center gap-2">
              <LucideMusic size={16} color="#71717B" />
              <Text className="text-sm font-noto-bold text-[#18181B]">
                Homework Performance
              </Text>
            </View>
            {renderStars(5)}
          </View>

          {/* Feedback Text */}
          <View className="mb-6">
            <Text className="text-sm font-noto text-[#4B5563] leading-5">
              Excellent progress on scales. Keep practicing the arpeggios.
            </Text>
            <View className="h-[1px] bg-[#E4E4E7] my-3" />
            <Text className="text-sm font-noto text-[#4B5563] leading-5">
              Very focused during the session.
            </Text>
          </View>

          {/* Attachment Container */}
          <View className="bg-[#D9D9D9]/20 rounded-full p-4 flex-row items-center flex-wrap gap-3 mb-8">
            <View className="flex-row items-center gap-2.5 flex-1">
              <LucideFileText size={20} color="#71717B" />
              <Text className="text-sm font-noto-bold text-[#18181B]">
                Remember me
              </Text>
            </View>
            <TouchableOpacity className="bg-[#FFFFFF] border border-[#000000] px-5 py-2.5 rounded-full">
              <Text className="text-[#000000] font-noto-bold text-xs uppercase tracking-wider">
                Preview
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Button */}
          <TouchableOpacity className="w-full flex-row items-center justify-center bg-white border border-black py-4 rounded-full gap-2 shadow-sm">
            <LucideEdit size={18} color="#000000" />
            <Text className="text-black font-noto-bold text-sm">
              Edit Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
