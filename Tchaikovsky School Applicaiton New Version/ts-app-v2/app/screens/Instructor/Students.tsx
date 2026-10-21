import { useRouter } from "expo-router";
import {
  LucideMessageSquare,
  LucideMoreHorizontal,
  LucideSearch,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const studentData = [
  {
    id: 1,
    name: "Julia Barcha",
    instrument: "Piano",
    level: "Advanced",
    status: "Active",
    nextClass: "Oct 24, 10:00 AM",
    image: null, // Test initials placeholder
  },
  {
    id: 2,
    name: "Sarah Johnson",
    instrument: "Violin",
    level: "Intermediate",
    status: "Active",
    nextClass: "Oct 25, 11:30 AM",
    image: null,
  },
  {
    id: 3,
    name: "Michael Chen",
    instrument: "Guitar",
    level: "Beginner",
    status: "On Break",
    nextClass: "Nov 02, 04:00 PM",
    image: null,
  },
];

export default function Students() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const closeDropdown = () => setOpenDropdownId(null);

  const filters = [
    { name: "All Students", icon: Users },
    { name: "Piano" },
    { name: "Guitar" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, padding: 24, paddingTop: 48 }}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
        onScroll={closeDropdown}
        scrollEventThrottle={16}
      >
        {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-noto-bold text-[#09090B] mb-2">
              My Students
            </Text>
            <Text className="text-[#71717A] text-lg font-noto">
              Track progress and manage student profiles.
            </Text>
          </View>

          {/* Feedback History Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center py-3 px-6 rounded-2xl border border-[#E4E4E7] mb-8 self-start"
            style={{ backgroundColor: "#FFF8DD" }}
          >
            <Text className="font-noto text-[#09090B] text-lg">
              Feedback History
            </Text>
          </TouchableOpacity>

          {/* Search Bar */}
          <View
            className="flex-row items-center bg-white border border-[#E4E4E7] rounded-full px-4 py-4 mb-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 15,
              elevation: 2,
            }}
          >
            <LucideSearch size={22} color="#9F9FA9" />
            <TextInput
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 font-noto text-base text-[#09090B]"
              placeholderTextColor="#9F9FA9"
            />
          </View>

          {/* Filter Tags */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-8"
            contentContainerStyle={{ gap: 12 }}
          >
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center bg-white border border-[#E4E4E7] px-4 py-2.5 rounded-full shadow-sm"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                {filter.icon && <filter.icon size={16} color="#71717A" />}
                <Text
                  className={`${filter.icon ? "ml-2" : ""} font-noto-bold text-[#71717A] text-sm`}
                >
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Student Cards Grid */}
          <View className="flex-row flex-wrap gap-4">
            {studentData.map((student) => (
              <View
                key={student.id}
                className="bg-white rounded-[32px] border border-zinc-100 p-6 w-full mb-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 12,
                  elevation: 2,
                }}
              >
                {/* Top Row: Options */}
                <View className="flex-row justify-end mb-2 relative z-50">
                  <TouchableOpacity
                    onPress={() => toggleDropdown(student.id)}
                    className="p-1"
                  >
                    <LucideMoreHorizontal size={20} color="#71717A" />
                  </TouchableOpacity>

                  {/* Dropdown Menu */}
                  {openDropdownId === student.id && (
                    <View
                      className="absolute top-8 right-0 w-56 bg-white rounded-2xl p-2 z-[100] border border-zinc-100"
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.1,
                        shadowRadius: 12,
                        elevation: 10,
                      }}
                    >
                      <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-xl active:bg-zinc-50">
                        <Text className="font-noto text-[#09090B]">
                          View Progress
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-xl active:bg-zinc-50">
                        <Text className="font-noto text-[#09090B]">
                          Feedback History
                        </Text>
                      </TouchableOpacity>

                      <View className="h-[1px] bg-zinc-100 my-1 mx-2" />

                      <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-xl active:bg-red-50">
                        <Text className="font-noto text-[#EF4444]">
                          Archive
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Profile Picture / Initials */}
                <View className="items-center mb-3">
                  <View
                    className="w-20 h-20 rounded-full items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#FEF3C6" }}
                  >
                    {student.image ? (
                      <Image
                        source={{ uri: student.image }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <Text className="text-2xl font-noto-bold text-amber-600">
                        {student.name.charAt(0)}
                      </Text>
                    )}
                  </View>

                  <Text
                    className="mt-3 font-noto-bold text-[#09090B] text-center"
                    numberOfLines={1}
                  >
                    {student.name}
                  </Text>
                  <Text className="text-[#71717A] text-xs font-noto text-center">
                    {student.instrument} • {student.level}
                  </Text>
                </View>

                {/* Status & Next Class Containers */}
                <View className="flex-row gap-3 mb-6">
                  <View className="flex-1 bg-[#FAFAFA] rounded-3xl p-4 items-center border border-zinc-100/50">
                    <Text className="text-[10px] text-[#71717A] font-noto-bold uppercase mb-1">
                      Status
                    </Text>
                    <Text className="text-sm font-noto-bold text-[#09090B]">
                      {student.status}
                    </Text>
                  </View>
                  <View className="flex-1 bg-[#FAFAFA] rounded-3xl p-4 items-center border border-zinc-100/50">
                    <Text className="text-[10px] text-[#71717A] font-noto-bold uppercase mb-1">
                      Next Class
                    </Text>
                    <Text
                      className="text-sm font-noto-bold text-[#09090B]"
                      numberOfLines={1}
                    >
                      {student.nextClass}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="gap-2">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-[#18181B] py-4 rounded-2xl items-center"
                  >
                    <Text className="text-white font-noto-bold text-sm">
                      Profile
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/screens/Instructor/SessionFeedback",
                        params: { name: student.name },
                      })
                    }
                    className="flex-row items-center justify-center py-2"
                  >
                    <LucideMessageSquare size={14} color="#71717A" />
                    <Text className="ml-2 text-[#71717A] font-noto-bold text-[11px]">
                      Log Session Feedback
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
  );
}
