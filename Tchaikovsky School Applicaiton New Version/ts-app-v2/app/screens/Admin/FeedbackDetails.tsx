import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Calendar,
  ChevronLeft,
  GraduationCap,
  Star,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface DetailedFeedback {
  id: string;
  studentName: string;
  date: string;
  instructorName: string;
  branch: string;
  type: "Online" | "In Person" | "Theory";
  sessionNumber: string;
  rating: number;
  homeworkComments: string;
  performanceComments: string;
}

const MOCK_DETAILED_FEEDBACK: DetailedFeedback[] = [
  {
    id: "1",
    studentName: "Nourah Abelusi",
    date: "Jan 28, 2024",
    instructorName: "Dana Rossel",
    branch: "Jeddah Branch",
    type: "Theory",
    sessionNumber: "1/3",
    rating: 5,
    homeworkComments:
      "Excellent session! Sarah was very patient and explained the finger techniques.",
    performanceComments:
      "Excellent session! Sarah was very patient and explained the finger techniques.",
  },
  {
    id: "2",
    studentName: "Nourah Abelusi",
    date: "Jan 26, 2024",
    instructorName: "Dana Rossel",
    branch: "Jeddah Branch",
    type: "Online",
    sessionNumber: "2/3",
    rating: 4,
    homeworkComments:
      "Good progress on homework assignments. Keep practicing the scales.",
    performanceComments:
      "Strong performance overall. Rhythm needs a bit more work.",
  },
];

const getTagColors = (
  type: "Online" | "In Person" | "Theory",
): { bg: string; text: string } => {
  switch (type) {
    case "Online":
      return { bg: "#E0F2FE", text: "#0369A1" };
    case "In Person":
      return { bg: "#D1FAE5", text: "#047857" };
    case "Theory":
      return { bg: "#E9D5FF", text: "#7C3AED" };
  }
};

export default function FeedbackDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [sessionFilter, setSessionFilter] = useState<string>("All Sessions");

  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4 mb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 bg-white rounded-2xl border border-[#FFFFFF]/40"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <ChevronLeft size={20} color="#18181B" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-noto-bold text-[#18181B]">
              Session Feedback
            </Text>
            <Text className="text-sm font-noto text-[#71717B] mt-0.5">
              View Feedback for Nourah's Sessions
            </Text>
          </View>
        </View>
      </View>

      {/* Filters */}

      <View className="flex-row gap-3 mb-6">
        {["All Sessions", "Recent", "Oldest"].map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSessionFilter(filter)}
            className="rounded-xl overflow-hidden"
          >
            {sessionFilter === filter ? (
              <LinearGradient
                colors={["#666666", "#000000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  alignItems: "center",
                }}
              >
                <Text className="text-xs font-noto-bold text-white">
                  {filter}
                </Text>
              </LinearGradient>
            ) : (
              <View className="px-4 py-2.5 border border-[#E3E3E3] bg-white rounded-xl">
                <Text className="text-xs font-noto text-[#71717A]">
                  {filter}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Count */}
      <Text className="text-sm font-noto text-[#71717A] mb-4">
        Showing {MOCK_DETAILED_FEEDBACK.length} of 8 feedbacks
      </Text>

      {/* Detailed Feedback Cards */}
      <View className="gap-4">
        {MOCK_DETAILED_FEEDBACK.map((item) => {
          const typeColors = getTagColors(item.type);
          return (
            <View
              key={item.id}
              className="bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm"
            >
              {/* Tags Row */}
              <View className="flex-row gap-2 mb-4">
                <View className="px-3 py-1.5 rounded-full bg-[#F4F4F5]">
                  <Text className="text-xs font-noto-bold text-black">
                    {item.branch}
                  </Text>
                </View>
                <View
                  className="px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: typeColors.bg }}
                >
                  <Text
                    className="text-xs font-noto-bold"
                    style={{ color: typeColors.text }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              {/* Student Info */}
              <View className="flex-row items-center gap-2 mb-2">
                <User size={16} color="#71717A" />
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">
                    Student:{" "}
                  </Text>
                  {item.studentName}
                </Text>
              </View>

              {/* Date Info */}
              <View className="flex-row items-center gap-2 mb-2">
                <Calendar size={16} color="#71717A" />
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">Date: </Text>
                  {item.date}
                </Text>
              </View>

              {/* Instructor Info */}
              <View className="flex-row items-center gap-2 mb-4">
                <GraduationCap size={16} color="#71717A" />
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">
                    Instructor:{" "}
                  </Text>
                  {item.instructorName}
                </Text>
              </View>

              {/* Star Rating */}
              <View className="flex-row gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill={star <= item.rating ? "#FCD34D" : "none"}
                    color={star <= item.rating ? "#FCD34D" : "#D1D5DB"}
                    strokeWidth={1.5}
                  />
                ))}
              </View>

              {/* Home work comments */}
              <View className="mb-3">
                <Text className="text-sm font-noto-bold text-[#18181B] mb-2">
                  Home work comments
                </Text>
                <View className="bg-[#E7E7E7]/50 rounded-2xl p-4">
                  <Text className="text-sm font-noto text-[#18181B] leading-5">
                    {item.homeworkComments}
                  </Text>
                </View>
              </View>

              {/* Performance feedback */}
              <View>
                <Text className="text-sm font-noto-bold text-[#18181B] mb-2">
                  Performance feedback
                </Text>
                <View className="bg-[#E7E7E7]/50 rounded-2xl p-4">
                  <Text className="text-sm font-noto text-[#18181B] leading-5">
                    {item.performanceComments}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
