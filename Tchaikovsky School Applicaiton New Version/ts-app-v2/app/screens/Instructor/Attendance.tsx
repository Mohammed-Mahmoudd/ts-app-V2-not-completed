import {
  LucideAlertCircle,
  LucideCalendar,
  LucideCheckCircle,
  LucideClock,
  LucideFileText,
  LucideFilter,
  LucideMoreHorizontal,
  LucideRotateCcw,
  LucideSearch,
  LucideXCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Attendance() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<{
    [key: number]: "PRESENT" | "LATE" | "ABSENT" | null;
  }>({});

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const setStatus = (
    id: number,
    status: "PRESENT" | "LATE" | "ABSENT" | null,
  ) => {
    setAttendanceStatus((prev) => ({ ...prev, [id]: status }));
  };
  const stats = [
    { label: "Present", value: "12", color: "#18181B", isBold: true },
    { label: "Absent", value: "2", color: "#9F9FA9", isBold: false },
    { label: "Late", value: "1", color: "#D4AF37", isBold: false },
    {
      label: "Pending",
      value: "3",
      color: "#71717B",
      isBold: false,
      hasStatusCircle: true,
    },
  ];

  return (
    <ScrollView
      className="flex-1 p-6 "
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-noto-bold text-[#18181B]">
          Attendance
        </Text>
        <Text className="text-[#71717B] font-noto text-base mt-1">
          Track student attendance for today&apos;s sessions.
        </Text>
      </View>

      {/* Date Container */}
      <View className="bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm mb-6">
        <View className="flex-row items-center gap-3 ps-3">
          <LucideCalendar size={20} color="#18181B" />
          <Text className="text-lg font-noto-bold text-[#18181B]">
            Tue, Oct 24
          </Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="flex-row flex-wrap gap-4">
        {stats.map((stat, index) => (
          <View
            key={index}
            className="w-[47.5%] items-center bg-white border border-[#F4F4F5] rounded-[32px] p-6 shadow-sm"
          >
            <View className="flex-row items-center gap-2 mb-2">
              <Text
                className="text-3xl font-noto-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              {stat.hasStatusCircle && (
                <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
              )}
              <Text
                className="text-sm font-noto-bold"
                style={{ color: stat.color }}
              >
                {stat.label}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* Session Lists Section */}
      <View className="mt-8 mx-1 bg-white border border-[#F4F4F5] rounded-[32px] p-6 shadow-sm">
        {/* Section Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-xl font-noto-bold text-[#18181B]">
            Session lists
          </Text>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="flex-row items-center gap-1">
              <LucideFilter size={18} color="#9F9FA9" />
              <Text className="text-sm font-noto-bold text-[#9F9FA9]">
                Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-1">
              <LucideSearch size={18} color="#9F9FA9" />
              <Text className="text-sm font-noto-bold text-[#9F9FA9]">
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Attendance Cards */}
        <View className="gap-6">
          {/* Card 1 */}
          <View className="mb-10">
            <View className="flex-row items-center mb-6">
              {/* Profile Initial */}
              <View className="w-16 h-16 rounded-full bg-[#FEF3C6] items-center justify-center">
                <Text className="text-[#92400E] font-noto-bold text-xl">J</Text>
              </View>
              {/* Details */}
              <View className="ml-4">
                <Text className="text-xl font-noto-bold text-[#18181B] mb-1">
                  Julia Barcha
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center bg-[#F4F4F5] rounded-full px-3 py-1">
                    <LucideClock size={12} color="#9F9FA9" />
                    <Text className="text-xs font-noto-bold text-[#9F9FA9] ml-1.5">
                      09:00 AM
                    </Text>
                  </View>
                  <Text className="text-[10px] font-noto-bold text-[#9F9FA9] uppercase tracking-wider">
                    PIANO ADVANCED
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row items-center gap-4 z-10">
              {attendanceStatus[1] ? (
                <View
                  key={`status-pill-1-${attendanceStatus[1]}`}
                  className="flex-1 border py-4 items-center justify-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 100,
                    borderColor:
                      attendanceStatus[1] === "PRESENT"
                        ? "#10B981"
                        : attendanceStatus[1] === "LATE"
                          ? "#D4AF37"
                          : "#C10007",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 2,
                    overflow: "visible",
                  }}
                >
                  <Text
                    className="font-noto-bold tracking-[2px] text-base"
                    style={{
                      color:
                        attendanceStatus[1] === "PRESENT"
                          ? "#10B981"
                          : attendanceStatus[1] === "LATE"
                            ? "#D4AF37"
                            : "#C10007",
                    }}
                  >
                    {attendanceStatus[1]}
                  </Text>
                </View>
              ) : (
                <View
                  key="picker-1"
                  className="flex-row items-center justify-center gap-10 py-5 px-12 flex-1"
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: 100,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 2,
                    overflow: "visible",
                  }}
                >
                  <TouchableOpacity onPress={() => setStatus(1, "PRESENT")}>
                    <LucideCheckCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStatus(1, "LATE")}>
                    <LucideAlertCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStatus(1, "ABSENT")}>
                    <LucideXCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                </View>
              )}
              <View className="relative">
                <TouchableOpacity
                  className="p-3 bg-[#F4F4F5] rounded-full items-center justify-center w-12 h-12"
                  onPress={() => toggleDropdown(1)}
                >
                  <LucideMoreHorizontal size={20} color="#18181B" />
                </TouchableOpacity>

                {openDropdownId === 1 && (
                  <View
                    className="absolute right-0 top-14 border border-[#F4F4F5] p-3 shadow-xl w-48"
                    style={{
                      zIndex: 100,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 24,
                      overflow: "visible",
                    }}
                  >
                    <TouchableOpacity
                      className="flex-row items-center gap-3 p-3 rounded-2xl active:bg-[#F4F4F5]"
                      onPress={() => setOpenDropdownId(null)}
                    >
                      <LucideFileText size={20} color="#18181B" />
                      <Text className="text-[#18181B] font-noto-bold text-sm">
                        Add Note
                      </Text>
                    </TouchableOpacity>

                    <View className="h-[1px] bg-[#F4F4F5] my-1 mx-2" />

                    <TouchableOpacity
                      className="flex-row items-center gap-3 p-3 rounded-2xl active:bg-[#F4F4F5]"
                      onPress={() => {
                        setStatus(1, null);
                        setOpenDropdownId(null);
                      }}
                    >
                      <LucideRotateCcw size={20} color="#EF4444" />
                      <Text className="text-[#EF4444] font-noto-bold text-sm">
                        Reset Status
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Card 2 */}
          <View className="mb-10">
            <View className="flex-row items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-[#E0F2FE] items-center justify-center">
                <Text className="text-[#0369A1] font-noto-bold text-xl">A</Text>
              </View>
              <View className="ml-4">
                <Text className="text-xl font-noto-bold text-[#18181B] mb-1">
                  Adham M.
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center bg-[#F4F4F5] rounded-full px-3 py-1">
                    <LucideClock size={12} color="#9F9FA9" />
                    <Text className="text-xs font-noto-bold text-[#9F9FA9] ml-1.5">
                      10:30 AM
                    </Text>
                  </View>
                  <Text className="text-[10px] font-noto-bold text-[#9F9FA9] uppercase tracking-wider">
                    VIOLIN BEGINNER
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row items-center gap-4 z-10">
              {attendanceStatus[2] ? (
                <View
                  key={`status-pill-2-${attendanceStatus[2]}`}
                  className="flex-1 border py-4 items-center justify-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 100,
                    borderColor:
                      attendanceStatus[2] === "PRESENT"
                        ? "#10B981"
                        : attendanceStatus[2] === "LATE"
                          ? "#D4AF37"
                          : "#C10007",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 2,
                    overflow: "visible",
                  }}
                >
                  <Text
                    className="font-noto-bold tracking-[2px] text-base"
                    style={{
                      color:
                        attendanceStatus[2] === "PRESENT"
                          ? "#10B981"
                          : attendanceStatus[2] === "LATE"
                            ? "#D4AF37"
                            : "#C10007",
                    }}
                  >
                    {attendanceStatus[2]}
                  </Text>
                </View>
              ) : (
                <View
                  key="picker-2"
                  className="flex-row items-center justify-center gap-10 py-5 px-12 flex-1"
                  style={{
                    backgroundColor: "#F9F9F9",
                    borderRadius: 100,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 2,
                    overflow: "visible",
                  }}
                >
                  <TouchableOpacity onPress={() => setStatus(2, "PRESENT")}>
                    <LucideCheckCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStatus(2, "LATE")}>
                    <LucideAlertCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStatus(2, "ABSENT")}>
                    <LucideXCircle size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                </View>
              )}
              <View className="relative">
                <TouchableOpacity
                  className="p-3 bg-[#F4F4F5] rounded-full items-center justify-center w-12 h-12"
                  onPress={() => toggleDropdown(2)}
                >
                  <LucideMoreHorizontal size={20} color="#18181B" />
                </TouchableOpacity>

                {openDropdownId === 2 && (
                  <View
                    className="absolute right-0 top-14 border border-[#F4F4F5] p-3 shadow-xl w-48"
                    style={{
                      zIndex: 100,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 24,
                      overflow: "visible",
                    }}
                  >
                    <TouchableOpacity
                      className="flex-row items-center gap-3 p-3 rounded-2xl active:bg-[#F4F4F5]"
                      onPress={() => setOpenDropdownId(null)}
                    >
                      <LucideFileText size={20} color="#18181B" />
                      <Text className="text-[#18181B] font-noto-bold text-sm">
                        Add Note
                      </Text>
                    </TouchableOpacity>

                    <View className="h-[1px] bg-[#F4F4F5] my-1 mx-2" />

                    <TouchableOpacity
                      className="flex-row items-center gap-3 p-3 rounded-2xl active:bg-[#F4F4F5]"
                      onPress={() => {
                        setStatus(2, null);
                        setOpenDropdownId(null);
                      }}
                    >
                      <LucideRotateCcw size={20} color="#EF4444" />
                      <Text className="text-[#EF4444] font-noto-bold text-sm">
                        Reset Status
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
