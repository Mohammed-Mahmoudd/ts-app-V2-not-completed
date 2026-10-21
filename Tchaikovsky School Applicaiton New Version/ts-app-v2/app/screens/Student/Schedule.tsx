import {
  AlertCircle,
  ChevronDown,
  Clock,
  MapPin,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

type ViewMode = "Day" | "Week" | "Month";

type Session = {
  id: number;
  month: string;
  day: number;
  title: string;
  type: "PRACTICE" | "THEORY";
  startTime: string;
  endTime: string;
  instructor: string;
  location: string;
  hasConflict?: boolean;
};

const sessions: Session[] = [
  {
    id: 1,
    month: "JAN",
    day: 9,
    title: "Piano Session",
    type: "PRACTICE",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    instructor: "Sarah J.",
    location: "Riyadh Branch",
  },
  {
    id: 2,
    month: "JAN",
    day: 10,
    title: "Guitar Session",
    type: "PRACTICE",
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    instructor: "David L.",
    location: "Online",
  },
  {
    id: 3,
    month: "JAN",
    day: 13,
    title: "Violin Session",
    type: "PRACTICE",
    startTime: "01:00 PM",
    endTime: "02:00 PM",
    instructor: "Hussien M.",
    location: "Jeddah Branch",
  },
  {
    id: 4,
    month: "JAN",
    day: 14,
    title: "Theory - Group A",
    type: "THEORY",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    instructor: "Hussien M.",
    location: "Riyadh Branch",
  },
  {
    id: 5,
    month: "JAN",
    day: 14,
    title: "Piano Session",
    type: "PRACTICE",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    instructor: "Hussien M.",
    location: "Riyadh Branch",
    hasConflict: true,
  },
];

export default function Schedule() {
  const [activeView, setActiveView] = useState<ViewMode>("Week");
  const [activeDay, setActiveDay] = useState(3); // TH index

  return (
    <View className="px-6">
      {/* Header */}
      <View className="mb-5">
        <Text className="text-2xl font-noto-bold text-[#09090B]">
          Schedule & Availability
        </Text>
        <Text className="text-sm text-[#71717A] font-noto mt-1">
          Manage your sessions, slots, and requests.
        </Text>
      </View>

      {/* Branch Filter */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="self-start flex-row items-center gap-1.5 border border-[#E4E4E7] rounded-full px-4 py-2 mb-5 bg-white"
      >
        <Text className="text-sm font-noto-bold text-[#09090B]">
          All Branches
        </Text>
        <ChevronDown size={14} color="#71717A" />
      </TouchableOpacity>

      {/* Filter Card */}
      <View
        className="bg-[#FCF8F2] rounded-[36px] p-6 mb-8 mt-2"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.02,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1
        }}
      >
        {/* View Toggle: Day | Week | Month */}
        <View
          className="flex-row bg-[#FAFAFA] border border-[#F4F4F5] rounded-[15px] p-1.5 mb-8"
          style={{
            alignSelf: "stretch",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          {(["Day", "Week", "Month"] as ViewMode[]).map((mode) => (
            <TouchableOpacity
              key={mode}
              activeOpacity={0.8}
              onPress={() => setActiveView(mode)}
              className={`flex-1 items-center justify-center py-3.5 rounded-[18px] ${activeView === mode ? "bg-white" : "bg-transparent"
                }`}
              style={
                activeView === mode
                  ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }
                  : {}
              }
            >
              <Text
                className={`text-[11px] font-noto-bold ${activeView === mode ? "text-[#09090B]" : "text-[#A1A1AA]"
                  }`}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Day Selector Row */}
        <View className="flex-row justify-between px-1">
          {DAYS.map((day, index) => {
            const isActive = index === activeDay;
            return (
              <TouchableOpacity
                key={day}
                activeOpacity={0.7}
                onPress={() => setActiveDay(index)}
                className="items-center gap-3"
              >
                <Text
                  className={`text-xs font-noto-bold tracking-wide ${isActive ? "text-[#D4AF37]" : "text-[#A1A1AA]"
                    }`}
                >
                  {day}
                </Text>

                {isActive ? (
                  <View
                    className="w-10 h-10 rounded-full bg-white items-center justify-center"
                    style={{
                      shadowColor: "#D4AF37",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                  >
                    <View className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  </View>
                ) : (
                  <View
                    className="w-10 h-10 rounded-full bg-white items-center justify-center border border-[#F4F4F5]"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.02,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text className="text-[#D4D4D8] text-sm font-noto-bold">✕</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-noto-bold text-[#09090B]">
          This Week
        </Text>
        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase">
          {sessions.length} Sessions
        </Text>
      </View>

      {/* Session Cards */}
      <View className="gap-3">
        {sessions.map((session) => (
          <View
            key={session.id}
            className="flex-row p-5 rounded-[24px] bg-white border border-[#F4F4F5]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.02,
              shadowRadius: 10,
              elevation: 1,
            }}
          >
            {/* Left Column: Date Block */}
            <View className="mr-5">
              <View className="w-[60px] h-[72px] items-center justify-center rounded-[20px] bg-[#FAFAFA] border border-[#F4F4F5]">
                <Text className="text-[8px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase mb-1">
                  {session.month}
                </Text>
                <Text className="text-[20px] font-noto-bold text-[#09090B] leading-none">
                  {session.day}
                </Text>
              </View>
            </View>

            {/* Right Column: Content */}
            <View className="flex-1">
              {/* Title & Badge */}
              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-[15px] font-noto-bold text-[#18181B] flex-1">
                    {session.title}
                  </Text>
                  <TouchableOpacity activeOpacity={0.5} className="px-1 -mt-2">
                    <Text className="text-[#A1A1AA] text-lg tracking-widest leading-none">
                      ...
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Badge Row */}
                <View className="flex-row items-center gap-2">
                  <View className="bg-[#F4F4F5] rounded-full px-3 py-1">
                    <Text className="text-[8px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                      {session.type}
                    </Text>
                  </View>
                  {session.hasConflict && (
                    <View className="flex-row items-center gap-1 bg-red-50 border border-red-200 rounded-full px-2.5 py-1">
                      <AlertCircle size={10} color="#EF4444" />
                      <Text className="text-[10px] font-noto-bold text-[#EF4444] tracking-wider uppercase">
                        Conflict
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Horizontal Divider */}
              <View className="h-[1px] bg-[#F4F4F5] mb-5" />

              {/* Details */}
              <View className="gap-3.5">
                {/* Time */}
                <View className="flex-row items-center gap-3.5">
                  <View className="w-[26px] h-[26px] rounded-full items-center justify-center">
                    <Clock size={17} color="#D4AF37" />
                  </View>
                  <Text className="text-[13px] text-[#52525B] font-noto">
                    {session.startTime} - {session.endTime}
                  </Text>
                </View>

                {/* Instructor */}
                <View className="flex-row items-center gap-3.5">
                  <View className="w-[26px] h-[26px] rounded-full items-center justify-center">
                    <User size={17} color="#A1A1AA" />
                  </View>
                  <Text className="text-[13px] text-[#52525B] font-noto">
                    {session.instructor}
                  </Text>
                </View>

                {/* Location */}
                <View className="flex-row items-center gap-3.5">
                  <View className="w-[26px] h-[26px] rounded-full items-center justify-center">
                    <MapPin size={17} color="#A1A1AA" />
                  </View>
                  <Text className="text-[13px] text-[#52525B] font-noto">
                    {session.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
