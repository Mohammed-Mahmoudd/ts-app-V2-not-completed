import { useRouter, useLocalSearchParams } from "expo-router";
import {
  LucideArrowLeft,
  LucideCheck,
  LucideFileMusic,
  LucideStar,
  LucidePlus,
  LucideX,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SessionFeedback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const studentName = params.name || "Student Name";
  const sessionDate = "2/4/2026"; // Mock date as requested

  const [attendance, setAttendance] = useState<"present" | "absent" | null>(
    null,
  );
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [homework, setHomework] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const quickTags = [
    "Excellent Focus",
    "Needs Practice",
    "Theory Covered",
    "New Piece",
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <ScrollView
      className="flex-1  p-6 pt-2"
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-1 -ml-1 mb-4 self-start"
      >
        <LucideArrowLeft size={24} color="#09090B" />
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-3xl font-noto-bold text-[#09090B] mb-1">
          Session Feedback
        </Text>
        <Text className="text-[#71717A] text-lg font-noto">
          {studentName} • {sessionDate}
        </Text>
      </View>

      {/* Attendance Section */}
      <View className="flex-row gap-4 mb-8">
        <TouchableOpacity
          onPress={() =>
            setAttendance(attendance === "present" ? null : "present")
          }
          activeOpacity={0.7}
          className="flex-1 flex-row items-center justify-center py-4 rounded-2xl"
          style={{
            backgroundColor: attendance === "present" ? "white" : "transparent",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: attendance === "present" ? 0.1 : 0,
            shadowRadius: 8,
            elevation: attendance === "present" ? 4 : 0,
          }}
        >
          <LucideCheck
            size={20}
            color={attendance === "present" ? "#22C55E" : "#9F9FA9"}
          />
          <Text
            className={`ml-2 font-noto-bold text-base ${
              attendance === "present" ? "text-green-600" : "text-[#9F9FA9]"
            }`}
          >
            Present
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setAttendance(attendance === "absent" ? null : "absent")
          }
          activeOpacity={0.7}
          className="flex-1 flex-row items-center justify-center py-4 rounded-2xl"
          style={{
            backgroundColor: attendance === "absent" ? "white" : "transparent",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: attendance === "absent" ? 0.1 : 0,
            shadowRadius: 8,
            elevation: attendance === "absent" ? 4 : 0,
          }}
        >
          <LucideX
            size={20}
            color={attendance === "absent" ? "#EF4444" : "#9F9FA9"}
          />
          <Text
            className={`ml-2 font-noto-bold text-base ${
              attendance === "absent" ? "text-red-600" : "text-[#9F9FA9]"
            }`}
          >
            Absent
          </Text>
        </TouchableOpacity>
      </View>

      {/* Performance Rating */}
      <View className="mb-8">
        <Text className="text-[#09090B] font-noto-bold text-lg mb-3">
          Performance Rating
        </Text>
        <View className="flex-row items-center justify-between w-[100%] px-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <LucideStar
                size={32}
                color={star <= rating ? "#F59E0B" : "#E4E4E7"}
                fill={star <= rating ? "#F59E0B" : "transparent"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Instructor Notes */}
      <View className="mb-8">
        <Text className="text-[#09090B] font-noto-bold text-lg mb-3">
          Instructor Notes
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Enter session notes here..."
          value={notes}
          onChangeText={setNotes}
          className="bg-[#FAFAFB] border border-[#E4E4E7] rounded-2xl p-4 font-noto text-[#09090B] min-h-[120px]"
          textAlignVertical="top"
          placeholderTextColor="#9F9FA9"
        />
      </View>

      {/* Homework Assigned */}
      <View className="mb-8">
        <Text className="text-[#09090B] font-noto-bold text-lg mb-3">
          Homework Assigned
        </Text>
        <TextInput
          placeholder="What should the student practice?"
          value={homework}
          onChangeText={setHomework}
          className="bg-[#FAFAFB] border border-[#E4E4E7] rounded-2xl p-4 font-noto text-[#09090B]"
          placeholderTextColor="#9F9FA9"
        />
      </View>

      {/* Quick Tags */}
      <View className="mb-8">
        <Text className="text-[#09090B] font-noto-bold text-lg mb-3">
          Quick Tags
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {quickTags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                className={`px-4 py-2.5 rounded-full border ${
                  isActive
                    ? "bg-[#18181B] border-[#18181B]"
                    : "bg-white border-[#E4E4E7]"
                }`}
              >
                <Text
                  className={`font-noto-bold text-sm ${
                    isActive ? "text-white" : "text-[#71717B]"
                  }`}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Sheet Music Section */}
      <View className="bg-[#F9FAFB] border border-[#E4E4E4] rounded-3xl p-6 mb-10">
        <View className="flex-row items-center gap-3 mb-4">
          <LucideFileMusic size={20} color="#09090B" />
          <Text className="text-[#09090B] font-noto-bold text-lg">
            Sheet Music Files
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-white border border-[#D1D5DC] rounded-2xl py-3 items-center flex-row gap-4 ps-5 justify-start border-dashed"
        >
          <LucidePlus size={24} color="#71717A" />
          <Text className=" text-[#71717A] font-noto-bold">
            Upload Sheet Music
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer Buttons */}
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 py-4 items-center rounded-2xl border border-[#E4E4E7]"
        >
          <Text className="text-[#71717B] font-noto-bold text-base">
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 bg-[#18181B] py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-noto-bold text-sm">
            Add Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
