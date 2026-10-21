import { Check, MapPin, User, Video, X } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type FilterMode = "ALL" | "IN-PERSON" | "ONLINE" | "PIANO";

export default function SessionHistory() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>("ALL");

  const sessions = [
    {
      id: 1,
      month: "DEC",
      day: "12,",
      time: "09:00 AM",
      instructor: "Sarah Johnson",
      type: "IN-PERSON",
      location: "Riyadh Park Mall",
      status: "absent",
    },
    {
      id: 2,
      month: "DEC",
      day: "05,",
      time: "02:00 PM",
      instructor: "Online Instructor",
      type: "ONLINE PRACTICE",
      location: "Zoom Meeting",
      status: "Attended",
    },
    {
      id: 3,
      month: "NOV",
      day: "28,",
      time: "09:00 AM",
      instructor: "Sarah Johnson",
      type: "IN-PERSON",
      location: "Riyadh Park Mall",
      status: "Attended",
    },
    {
      id: 4,
      month: "NOV",
      day: "21,",
      time: "10:30 AM",
      instructor: "Guest Instructor",
      type: "ONLINE THEORY",
      location: "Zoom Meeting",
      status: "absent",
    },
  ];

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-noto-bold text-[#09090B]">
            Session History
          </Text>
          <Text className="text-sm text-[#71717A] font-noto mt-1">
            Archive of all your completed sessions.
          </Text>
        </View>

        {/* Filters (Horizontal Scroll) */}
        <View className="-mx-5 mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
          >
            {(["ALL", "IN-PERSON", "ONLINE", "PIANO"] as FilterMode[]).map(
              (mode) => (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.8}
                  onPress={() => setActiveFilter(mode)}
                  className={`px-6 py-2.5 rounded-[16px] border ${activeFilter === mode
                    ? "bg-[#18181B] border-[#18181B]"
                    : "bg-white border-[#F4F4F5]"
                    }`}
                >
                  <Text
                    className={`text-[11px] font-noto-bold ${activeFilter === mode ? "text-white" : "text-[#71717A]"
                      }`}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* History Cards */}
        <View className="gap-5">
          {sessions.map((session) => (
            <View
              key={session.id}
              className="bg-white border border-[#F4F4F5] rounded-[24px] p-6"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.02,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 1,
              }}
            >
              {/* Top Section */}
              <View className="flex-row items-start mb-6">
                {/* Date Circle */}
                <View className="w-[52px] h-[52px] rounded-[15px] border border-[#F4F4F5] items-center justify-center mr-4 bg-white">
                  <Text className="text-[9px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-0.5">
                    {session.month}
                  </Text>
                  <Text className="text-[16px] font-noto-bold text-[#09090B] leading-none">
                    {session.day}
                  </Text>
                </View>

                {/* Time & Instructor */}
                <View className="flex-1 justify-center pt-1">
                  <Text className="text-[15px] font-noto-bold text-[#09090B] mb-1">
                    {session.time}
                  </Text>
                  <View className="flex-row items-center gap-1.5">
                    <User size={12} color="#A1A1AA" />
                    <Text className="text-[11px] font-noto text-[#71717A]">
                      {session.instructor}
                    </Text>
                  </View>
                </View>

                {/* Type Pill */}
                <View
                  className={`px-2 py-1.5 rounded-[8px] border ${session.type.includes("ONLINE")
                    ? "bg-[#EFF6FF] border-[#DBEAFE]"
                    : "bg-[#FAFAFA] border-[#F4F4F5]"
                    }`}
                >
                  <Text
                    className={`text-[8px] font-noto-bold tracking-widest uppercase ${session.type.includes("ONLINE")
                      ? "text-[#1447E6]"
                      : "text-[#52525B]"
                      }`}
                  >
                    {session.type}
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-[#FAFAFA] mb-5" />

              {/* Bottom Section */}
              <View className="flex-row items-center justify-between">
                {/* Location */}
                <View className="flex-row items-center gap-2">
                  {session.location.includes("Zoom") ? (
                    <Video size={14} color="#A1A1AA" />
                  ) : (
                    <MapPin size={14} color="#A1A1AA" />
                  )}
                  <Text className="text-[11px] font-noto-bold text-[#A1A1AA]">
                    {session.location}
                  </Text>
                </View>

                {/* Status */}
                <View className="flex-row items-center gap-1.5">
                  {session.status === "absent" ? (
                    <>
                      <X size={12} color="#E05C42" strokeWidth={3} />
                      <Text className="text-[11px] font-noto-bold text-[#E05C42]">
                        {session.status}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Check size={12} color="#22C55E" strokeWidth={3} />
                      <Text className="text-[11px] font-noto-bold text-[#22C55E]">
                        {session.status}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
