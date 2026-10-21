import {
  LucideCalendarCheck,
  LucideCheck,
  LucideTrash2,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  description: string;
  type: "success" | "info" | "alert";
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Schedule Change Approved",
    time: "2 hours ago",
    description:
      "Your request to reschedule the session with Julia Barcha on Oct 24 has been approved by the admin.",
    type: "success",
  },
  {
    id: "2",
    title: "New Student Assigned",
    time: "5 hours ago",
    description:
      "A new student, Adham M., has been assigned to your Violin Beginner class starting next week.",
    type: "info",
  },
  {
    id: "3",
    title: "Studio Announcement",
    time: "Yesterday",
    description:
      "Please note that the studio will be closed for maintenance on Oct 30. All sessions will be rescheduled.",
    type: "alert",
  },
];

export default function Notifications() {
  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-8">
        <Text className="text-3xl font-noto-bold text-[#18181B]">
          Notifications
        </Text>
        <Text className="text-[#71717B] font-noto text-base mt-1">
          Stay updated with your schedule and studio announcements.
        </Text>
      </View>

      {/* Notifications List */}
      <View className="gap-4">
        {MOCK_NOTIFICATIONS.map((item) => (
          <View
            key={item.id}
            className="bg-white border border-[#E4E4E7] rounded-[32px] p-6 shadow-sm"
          >
            <View className="flex-row items-start gap-4 mb-4">
              {/* Icon Container */}
              <View className="w-12 h-12 bg-[#FFFFFF] shadow-lg rounded-2xl items-center justify-center">
                <LucideCheck size={24} color="#000000" />
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-lg font-noto-bold text-[#18181B] flex-1 mr-2">
                    {item.title}
                  </Text>
                  <Text className="text-xs font-noto-bold text-[#9F9FA9] bg-[#FAFAFA] border border-[#F4F4F5] p-2 rounded-[10px]">
                    {item.time}
                  </Text>
                </View>
                <Text className="text-sm font-noto text-[#71717B] leading-5">
                  {item.description}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 pt-2">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#F4F4F5] py-3 rounded-2xl gap-2">
                <LucideCheck size={18} color="#18181B" />
                <Text className="text-sm font-noto-bold text-[#18181B]">
                  Read
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#FFE4E4] py-3 rounded-2xl gap-2">
                <LucideTrash2 size={18} color="#FF5D5D" />
                <Text className="text-sm font-noto-bold text-[#FF5D5D]">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
