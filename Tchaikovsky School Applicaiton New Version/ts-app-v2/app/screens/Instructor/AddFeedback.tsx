import MusicIcon from "../../components/icons/MusicIcon";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LucideArrowLeft, LucideStar } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const sessionTypes = ["Online Theory", "Online Practice", "In person"];
const attendanceOptions = ["Low", "Medium", "High"];
const currentSessionOptions = Array.from({ length: 20 }, (_, i) => i + 1);
const totalSessionOptions = [4, 8, 12, 16, 20];
// ds
export default function AddFeedback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const studentName = params.name || "Student Name";

  const [sessionType, setSessionType] = useState("Online Practice");
  const [currentSession, setCurrentSession] = useState(1);
  const [totalSessions, setTotalSessions] = useState(12);

  const [attendanceRate, setAttendanceRate] = useState("High");
  const [homeworkNotes, setHomeworkNotes] = useState("");
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionRating, setSessionRating] = useState(5);
  const [homeworkRating, setHomeworkRating] = useState(4);

  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const [showCurrentModal, setShowCurrentModal] = useState(false);
  const [showTotalModal, setShowTotalModal] = useState(false);

  const progress = (currentSession / totalSessions) * 100;

  const renderStarRating = (
    rating: number,
    setRating: (n: number) => void,
    label: string,
  ) => (
    <View className="mb-6">
      <Text className="text-md font-noto-bold text-[#18181B] mb-3">
        {label}
      </Text>
      <View className="flex-row gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <LucideStar
              size={24}
              color={star <= rating ? "#000000" : "#E4E4E7"}
              fill={star <= rating ? "#000000" : "transparent"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-6"
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8 flex-row ">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-4 p-2 -ml-2 self-start"
          >
            <LucideArrowLeft size={24} color="#18181B" />
          </TouchableOpacity>
          <View>
            <Text className="text-3xl font-noto-bold text-[#18181B]">
              Feedback
            </Text>
            <Text className="text-[#71717B] font-noto text-base mt-1">
              {studentName} • Ratings & reviews.
            </Text>
          </View>
        </View>

        {/* Session Details Section */}
        <View className="mb-10">
          <View className="flex-row items-center gap-2 mb-6">
            <Text className="text-xl font-noto-bold text-[#18181B]">
              Session Details
            </Text>
          </View>

          {/* Session Type Selector */}
          <Text className="text-sm font-noto-bold text-[#71717A] mb-4">
            Session Type
          </Text>
          <View className="flex-row gap-2 mb-8">
            {sessionTypes.map((type) => {
              const isActive = sessionType === type;
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSessionType(type)}
                  className={`flex-1 py-4 rounded-full border ${
                    isActive
                      ? "bg-black border-black"
                      : "bg-[#F4F4F4] border-[#F4F4F4]"
                  }`}
                >
                  <Text
                    className={`text-center font-noto-bold text-[13px] ${
                      isActive ? "text-white" : "text-[#18181B]"
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Session Pickers */}
          <View className="flex-row gap-4 mb-8">
            {/* Current Session Picker */}
            <TouchableOpacity
              onPress={() => setShowCurrentModal(true)}
              className="flex-1 bg-[#FAFAFB] border border-[#E4E4E7] rounded-2xl p-5"
            >
              <Text className="text-sm font-noto text-[#71717A] mb-2">
                Current Session
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-noto-bold text-[#18181B]">
                  {currentSession}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Total Sessions Picker */}
            <TouchableOpacity
              onPress={() => setShowTotalModal(true)}
              className="flex-1 bg-[#FAFAFB] border border-[#E4E4E7] rounded-2xl p-5"
            >
              <Text className="text-sm font-noto text-[#71717A] mb-2">
                Total Sessions
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-noto-bold text-[#18181B]">
                  {totalSessions}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          <View className="mb-2 border-t pt-3 border-[#E4E4E4] flex-row items-center justify-between">
            <Text className="text-sm font-noto text-[#000000]">Progress</Text>
            <Text className="text-sm font-noto-bold text-[#000000]">
              {currentSession} / {totalSessions} Sessions
            </Text>
          </View>
          <View className="h-3 bg-[#E4E4E7] rounded-full overflow-hidden">
            <View
              className="h-full bg-black rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </View>
        </View>

        {/* Feedback & Rating Section */}
        <View>
          <View className="flex-row items-center gap-2 mb-6">
            <Text className="text-xl font-noto-bold text-[#18181B]">
              Feedback & Rating
            </Text>
          </View>

          {/* Attendance Rate */}
          <View className="flex-row items-center justify-between mb-8">
            <Text className="text-sm font-noto-bold text-[#71717A] min-w-[120px]">
              Attendance Rate:
            </Text>
            <View className="flex-row gap-2 flex-1">
              {attendanceOptions.map((option) => {
                const isActive = attendanceRate === option;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setAttendanceRate(option)}
                    className="flex-1"
                  >
                    <LinearGradient
                      colors={
                        isActive
                          ? ["#000000", "#666666"]
                          : ["#ffffff", "#ffffff"]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        paddingVertical: 10,
                        borderRadius: 999,
                        borderWidth: isActive ? 0 : 1,
                        borderColor: "#B5B5B5",
                      }}
                    >
                      <Text
                        className={`text-center font-noto-bold text-[12px] ${
                          isActive ? "text-white" : "text-[#B5B5B5]"
                        }`}
                      >
                        {option}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Homework Performance Notes */}
          <View className="mb-6">
            <Text className="text-md font-noto-bold text-[#18181B] mb-3">
              Homework performance
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={homeworkNotes}
              onChangeText={setHomeworkNotes}
              placeholder="Comment on the student’s homework and practice quality."
              placeholderTextColor="#99A1AF"
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 text-[#18181B] font-noto text-base min-h-[120px]"
              textAlignVertical="top"
            />
          </View>

          {/* Session Feedback Notes */}
          <View className="mb-8">
            <Text className="text-md font-noto-bold text-[#18181B] mb-3">
              Session Feedback
            </Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={sessionNotes}
              onChangeText={setSessionNotes}
              placeholder="Technical notes, musicality, or practice advice..."
              placeholderTextColor="#99A1AF"
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 text-[#18181B] font-noto text-base min-h-[120px]"
              textAlignVertical="top"
            />
          </View>

          {/* Star Ratings */}
          {renderStarRating(
            sessionRating,
            setSessionRating,
            "Session Feedback",
          )}
          {renderStarRating(
            homeworkRating,
            setHomeworkRating,
            "Homework Performance",
          )}

          {/* File Upload Section */}
          <View className="mb-10 mt-3 rounded-2xl border border-[#E4E4E4] bg-[#F9FAFB] p-3 px-4">
            <View className="mb-4 flex-row items-center gap-2">
              <MusicIcon />
              <Text className="text-[#18181B] font-noto text-lg">
                Sheet Music Files
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // Mock adding a file for now
                const newFile = { id: Date.now(), name: "example_sheet.pdf" };
                setSelectedFiles((prev) => [...prev, newFile]);
              }}
              className="flex-row items-center gap-2 rounded-full border border-[#B5B5B5] bg-white px-3 py-2"
            >
              <Ionicons name="add" size={24} color="#18181B" />
              <Text className="text-[#18181B] font-noto text-base">
                Upload Sheet Music
              </Text>
            </TouchableOpacity>

            {selectedFiles.length > 0 && (
              <View className="mt-4">
                {selectedFiles.map((file) => (
                  <View
                    key={file.id}
                    className="mb-2 flex-row items-center justify-between rounded-xl bg-white px-4 py-3 border border-[#E4E4E4]"
                  >
                    <Text className="flex-1 text-[#18181B] font-noto text-sm">
                      {file.name}
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <TouchableOpacity>
                        <Ionicons name="eye-outline" size={20} color="#000" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setSelectedFiles((prev) =>
                            prev.filter((f) => f.id !== file.id),
                          )
                        }
                      >
                        <Ionicons name="close-circle" size={20} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-full border border-black p-4 overflow-hidden shadow-lg shadow-black/20 mb-10"
          >
            <Text className="text-black text-center font-noto-bold text-xl">
              Save Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Current Session Modal */}
      <Modal
        visible={showCurrentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCurrentModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowCurrentModal(false)}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-[40px] p-8 pb-12 max-h-[70%]">
                {/* Drag Handle */}
                <View className="w-12 h-1.5 bg-[#E4E4E7] rounded-full self-center mb-6" />

                <Text className="text-2xl font-noto-bold text-[#18181B] mb-8 text-center">
                  Select Current Session
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="flex-row flex-wrap gap-y-4 justify-between">
                    {currentSessionOptions.map((num) => (
                      <TouchableOpacity
                        key={num}
                        onPress={() => {
                          setCurrentSession(num);
                          setShowCurrentModal(false);
                        }}
                        className={`w-[18%] aspect-square flex-row items-center p-5 justify-center rounded-2xl border ${
                          currentSession === num
                            ? "bg-black border-black"
                            : "bg-white border-[#E4E4E7]"
                        }`}
                      >
                        <Text
                          className={`font-noto-bold text-lg text-center leading-none ${
                            currentSession === num
                              ? "text-white"
                              : "text-[#18181B]"
                          }`}
                          style={{ includeFontPadding: false }}
                        >
                          {num}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Total Sessions Modal */}
      <Modal
        visible={showTotalModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTotalModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowTotalModal(false)}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-[40px] p-8 pb-12">
                {/* Drag Handle */}
                <View className="w-12 h-1.5 bg-[#E4E4E7] rounded-full self-center mb-6" />

                <Text className="text-2xl font-noto-bold text-[#18181B] mb-8 text-center">
                  Select Total Sessions
                </Text>

                <View className="flex-row flex-wrap gap-4 justify-center">
                  {totalSessionOptions.map((num) => (
                    <TouchableOpacity
                      key={num}
                      onPress={() => {
                        setTotalSessions(num);
                        setShowTotalModal(false);
                      }}
                      className={`w-[45%] py-6 flex items-center justify-center rounded-[24px] border ${
                        totalSessions === num
                          ? "bg-black border-black"
                          : "bg-white border-[#E4E4E7]"
                      }`}
                    >
                      <Text
                        className={`font-noto-bold text-xl text-center ${
                          totalSessions === num
                            ? "text-white"
                            : "text-[#18181B]"
                        }`}
                      >
                        {num}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
