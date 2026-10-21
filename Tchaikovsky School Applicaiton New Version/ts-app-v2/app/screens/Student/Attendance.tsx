import { Check, X } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const sessions = [
  { id: 1, date: "Dec 12, 2024", type: "In-Person", status: "Present" },
  { id: 2, date: "Dec 05, 2024", type: "Online Practice", status: "Present" },
  { id: 3, date: "Nov 28, 2024", type: "In-Person", status: "Absent" },
  { id: 4, date: "Nov 21, 2024", type: "In-Person", status: "Present" },
  { id: 5, date: "Nov 14, 2024", type: "Online Theory", status: "Present" },
];

export default function Attendance() {
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
            Attendance
          </Text>
          <Text className="text-[13px] text-[#71717A] font-noto mt-1">
            Overview of your session presence.
          </Text>
        </View>

        {/* Summary Card */}
        <View
          className="bg-[#1C1C1E] rounded-[28px] px-6 pt-8 pb-7 mb-8 items-center"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          {/* Rate */}
          <Text className="text-[52px] font-noto-bold text-white leading-none mb-1.5">
            92%
          </Text>
          <Text className="text-[10px] font-noto-bold text-[#71717A] tracking-widest uppercase mb-7">
            ATTENDANCE RATE
          </Text>

          {/* Stats Row with vertical divider */}
          <View className="flex-row items-center justify-center w-full">
            <View className="flex-1 items-center">
              <Text className="text-[28px] font-noto-bold text-[#22C55E] leading-none mb-1">
                12
              </Text>
              <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                PRESENT
              </Text>
            </View>

            {/* Vertical Divider */}
            <View className="w-[1px] h-10 bg-[#3F3F46]" />

            <View className="flex-1 items-center">
              <Text className="text-[28px] font-noto-bold text-[#EF4444] leading-none mb-1">
                1
              </Text>
              <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                ABSENT
              </Text>
            </View>
          </View>
        </View>

        {/* Session History */}
        <Text className="text-[16px] font-noto-bold text-[#09090B] mb-4">
          Session History
        </Text>

        {/* Individual Cards */}
        <View className="gap-4">
          {sessions.map((session) => {
            const isPresent = session.status === "Present";
            return (
              <View
                key={session.id}
                className="bg-white border border-[#F4F4F5] rounded-[20px] px-5 py-4 flex-row items-center"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.02,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 3 },
                  elevation: 1,
                }}
              >
                {/* Icon */}
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center mr-4 ${
                    isPresent ? "bg-[#F0FDF4]" : "bg-[#FEF2F2]"
                  }`}
                >
                  {isPresent ? (
                    <Check size={16} color="#22C55E" strokeWidth={2.5} />
                  ) : (
                    <X size={16} color="#EF4444" strokeWidth={2.5} />
                  )}
                </View>

                {/* Date & Type */}
                <View className="flex-1">
                  <Text className="text-[14px] font-noto-bold text-[#09090B] mb-0.5">
                    {session.date}
                  </Text>
                  <Text className="text-[12px] font-noto text-[#71717A]">
                    {session.type}
                  </Text>
                </View>

                {/* Status Badge */}
                <View
                  className={`px-4 py-1.5 rounded-full border ${
                    isPresent
                      ? "border-[#86EFAC]"
                      : "border-[#FCA5A5]"
                  }`}
                >
                  <Text
                    className={`text-[12px] font-noto-bold ${
                      isPresent ? "text-[#22C55E]" : "text-[#EF4444]"
                    }`}
                  >
                    {session.status}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
