import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FeedbackItem {
  id: string;
  type: "Online" | "In Person" | "Theory";
  reviewerName: string;
  reviewerImage: string | null;
  sessionProgress: string;
  category: string;
  rating: number;
  instructorName: string;
  date: string;
  feedbackText: string;
}

const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    type: "Online",
    reviewerName: "Nourah Abelusi",
    reviewerImage: null,
    sessionProgress: "1/4",
    category: "Home work",
    rating: 5,
    instructorName: "Dana Rossel",
    date: "Jan 28, 2024",
    feedbackText:
      "Excellent session! The instructor was very knowledgeable and patient. I learned a lot about music theory and composition techniques.",
  },
  {
    id: "2",
    type: "In Person",
    reviewerName: "Ahmed Hassan",
    reviewerImage: null,
    sessionProgress: "3/8",
    category: "Piano Practice",
    rating: 4,
    instructorName: "Sarah Mitchell",
    date: "Jan 26, 2024",
    feedbackText:
      "Great hands-on experience. The in-person format really helped me understand the finger positioning better.",
  },
  {
    id: "3",
    type: "Theory",
    reviewerName: "Laila Mohammed",
    reviewerImage: null,
    sessionProgress: "2/6",
    category: "Music Theory",
    rating: 5,
    instructorName: "Dana Rossel",
    date: "Jan 25, 2024",
    feedbackText:
      "Very comprehensive theory lesson. The instructor explained complex concepts in an easy-to-understand way.",
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

const getInitials = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

export default function Feedback() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackType, setFeedbackType] = useState<"instructor" | "student">(
    "instructor",
  );
  const [classType, setClassType] = useState<
    "All Ratings" | "Online" | "In Person" | "Theory"
  >("All Ratings");

  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-noto-bold text-[#18181B]">
            Feedback
          </Text>
        </View>
        <Text className="text-[#71717B] font-noto text-base mt-1">
          Student ratings & reviews.
        </Text>
      </View>

      {/* Filter and Search Container */}
      <View className="bg-white border border-[#F4F4F5] border-[1.2px] rounded-[32px] p-5 shadow-sm mb-6">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="flex-1 flex-row items-center border border-[#E4E4E7] rounded-2xl px-4 py-3">
            <Search size={20} color="#A1A1AA" />
            <TextInput
              placeholder="Search reviews..."
              placeholderTextColor="#A1A1AA"
              className="flex-1 ml-3 font-noto text-base text-[#18181B] leading-tight"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="p-3.5 border border-[#E4E4E7] rounded-2xl">
            <SlidersHorizontal size={22} color="#18181B" />
          </TouchableOpacity>
        </View>

        {/* Class Type Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          style={{ borderRadius: 16 }}
        >
          {["All Ratings", "Online", "In Person", "Theory"].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setClassType(type as any)}
              style={{ borderRadius: 12, overflow: 'hidden' }}
            >
              {classType === type ? (
                <LinearGradient
                  colors={["#666666", "#000000"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={{ paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif-Bold', color: '#FFFFFF' }}>
                    {type}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={{ paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center', backgroundColor: 'transparent' }}>
                  <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif', color: '#71717A' }}>
                    {type}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feedback Type Selection - Main Tabs */}
      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
        <TouchableOpacity
          onPress={() => setFeedbackType("instructor")}
          style={{
            flex: 1,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: feedbackType !== "instructor" ? 1 : 0,
            borderColor: feedbackType !== "instructor" ? '#E3E3E3' : 'transparent',
            backgroundColor: feedbackType !== "instructor" ? '#FFFFFF' : '#000000'
          }}
        >
          {feedbackType === "instructor" ? (
            <LinearGradient
              colors={["#666666", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                width: "100%",
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif-Bold', color: '#FFFFFF' }}>
                Instructor Feedback
              </Text>
            </LinearGradient>
          ) : (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif', color: '#71717A' }}>
                Instructor Feedback
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFeedbackType("student")}
          style={{
            flex: 1,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: feedbackType !== "student" ? 1 : 0,
            borderColor: feedbackType !== "student" ? '#E3E3E3' : 'transparent',
            backgroundColor: feedbackType !== "student" ? '#FFFFFF' : '#000000'
          }}
        >
          {feedbackType === "student" ? (
            <LinearGradient
              colors={["#666666", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                width: "100%",
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif-Bold', color: '#FFFFFF' }}>
                Student Feedback
              </Text>
            </LinearGradient>
          ) : (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: 'NotoSerif', color: '#71717A' }}>
                Student Feedback
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Feedback Cards List */}
      <View className="gap-4">
        {MOCK_FEEDBACK.map((item) => {
          const tagColors = getTagColors(item.type);
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => router.push("/screens/Admin/FeedbackDetails")}
              className="bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm"
            >
              {/* Tag Row */}
              <View className="mb-4">
                <View
                  className="px-3 py-1.5 rounded-full self-start"
                  style={{ backgroundColor: tagColors.bg }}
                >
                  <Text
                    className="text-xs font-noto-bold"
                    style={{ color: tagColors.text }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              {/* Profile Section */}
              <View className="flex-row items-start gap-3 mb-4">
                {/* Profile Picture / Initial */}
                <View className="w-12 h-12 rounded-full bg-[#F4F4F5] items-center justify-center">
                  <Text className="text-lg font-noto-bold text-[#18181B]">
                    {getInitials(item.reviewerName)}
                  </Text>
                </View>

                {/* Name and Details */}
                <View className="flex-1">
                  <Text className="text-base font-noto-bold text-[#18181B]">
                    {item.reviewerName}
                  </Text>
                  <Text className="text-sm font-noto text-[#71717A] mt-0.5">
                    {item.sessionProgress}
                  </Text>
                </View>

                {/* Category and Rating */}
                <View className="items-end">
                  <Text className="text-sm font-noto text-[#71717A] mb-1">
                    {item.category}
                  </Text>
                  {/* Star Rating */}
                  <View className="flex-row gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= item.rating ? "#FCD34D" : "none"}
                        color={star <= item.rating ? "#FCD34D" : "#D1D5DB"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </View>
                  {/* Navigation Icon */}
                  <ChevronRight size={20} color="#71717A" />
                </View>
              </View>

              {/* Details Section */}
              <View className="mb-3 gap-1">
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">
                    Instructor:{" "}
                  </Text>
                  {item.instructorName}
                </Text>
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">Date: </Text>
                  {item.date}
                </Text>
                <Text className="text-sm font-noto text-[#71717A]">
                  <Text className="font-noto-bold text-[#18181B]">Type: </Text>
                  {item.type}
                </Text>
              </View>

              {/* Feedback Content */}
              <View className="bg-[#E7E7E7]/50 rounded-2xl p-4">
                <Text className="text-sm font-noto text-[#18181B] leading-5">
                  {item.feedbackText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
