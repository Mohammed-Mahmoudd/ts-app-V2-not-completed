import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  LucideArrowRight,
  LucideFilter,
  LucideSearch,
  LucideUsers,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Student {
  id: string;
  name: string;
  instrument: string;
  type: string;
  branch: string;
  image?: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Dana Rossel",
    instrument: "Piano",
    type: "In person",
    branch: "Riyadh branch",
  },
  {
    id: "2",
    name: "Julia Barcha",
    instrument: "Piano",
    type: "In person",
    branch: "Riyadh branch",
  },
];

const filters = [
  { name: "All Students", icon: LucideUsers },
  { name: "Piano" },
  { name: "Guitar" },
  { name: "Violin" },
];

export default function Feedback() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Students");

  return (
    <ScrollView
      className="flex-1 p-6 pt-12"
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-noto-bold text-[#18181B] mb-1">
          Feedback
        </Text>
        <Text className="text-[#71717B] font-noto text-base">
          Student ratings & reviews.
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white border border-[#E4E4E7] rounded-full px-5 py-4 mb-6 flex-row items-center shadow-sm">
        <LucideSearch size={20} color="#9F9FA9" />
        <TextInput
          placeholder="Search students..."
          className="flex-1 ml-3 font-noto text-base text-[#18181B]"
          placeholderTextColor="#9F9FA9"
          value={searchQuery}
          onChangeText={setSearchQuery}
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
            onPress={() => setActiveFilter(filter.name)}
            className={`flex-row items-center px-5 py-2.5 rounded-full border ${
              activeFilter === filter.name
                ? "bg-[#18181B] border-[#18181B]"
                : "bg-white border-[#E4E4E7]"
            }`}
          >
            {filter.icon && (
              <filter.icon
                size={16}
                color={activeFilter === filter.name ? "#FFFFFF" : "#71717A"}
              />
            )}
            <Text
              className={`font-noto-bold text-sm ${
                filter.icon ? "ml-2" : ""
              } ${activeFilter === filter.name ? "text-white" : "text-[#71717A]"}`}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Student List */}
      <View className="gap-6">
        {students.map((student) => (
          <View
            key={student.id}
            className="bg-white border border-[#EFEFEF] rounded-[32px] p-6 shadow-sm"
          >
            {/* Tags Row */}
            <View className="flex-row items-center mb-5 gap-2">
              <View className="bg-[#EEF2FF] px-3 py-1 rounded-full">
                <Text className="text-[#4F39F6] font-noto-bold text-[10px] uppercase tracking-wider">
                  {student.instrument}
                </Text>
              </View>
              <Text className="text-[#9F9FA9] font-noto-bold text-xs">
                • {student.type}
              </Text>
              <Text className="text-[#9F9FA9] font-noto-bold text-xs">
                • {student.branch}
              </Text>
            </View>

            {/* Profile Row */}
            <View className="flex-row items-center mb-6">
              <View className="w-12 h-12 rounded-full bg-[#E4E4E7] items-center justify-center">
                <Text className="text-[#3F3F46] font-noto-bold text-lg">
                  {student.name.charAt(0)}
                </Text>
              </View>
              <Text className="ml-3 text-xl font-noto-bold text-[#18181B]">
                {student.name}
              </Text>
            </View>

            {/* Actions Row */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/screens/Instructor/StudentFeedbackHistory",
                    params: {
                      name: student.name,
                      instrument: student.instrument,
                    },
                  })
                }
                className="flex-1 flex-row items-center justify-center bg-[#FFFDF7] border border-[#F4F4F5] py-4 rounded-2xl gap-2"
              >
                <Text className="text-[#18181B] font-noto-bold text-sm">
                  Feedback History
                </Text>
                <LucideArrowRight size={18} color="#18181B" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/screens/Instructor/AddFeedback" as any,
                    params: { name: student.name },
                  })
                }
                className="flex-1 rounded-2xl overflow-hidden shadow-lg shadow-black/20"
              >
                <LinearGradient
                  colors={["#666666", "#000000"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    gap: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                    className="font-noto"
                  >
                    Add Feedback
                  </Text>
                  <LucideArrowRight size={18} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
