import { ArrowLeft, Calendar, CheckCircle2, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Notifications() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      title: "Upcoming Session Reminder",
      time: "2 hours ago",
      message: "You have a Piano session with Sarah Johnson tomorrow at 9:00 AM.",
      type: "reminder",
    },
    {
      id: 2,
      title: "Reschedule Approved",
      time: "1 day ago",
      message: "Your request to reschedule the session on Dec 14 has been approved by Admin.",
      type: "approved",
    },
    {
      id: 3,
      title: "Schedule Update",
      time: "2 days ago",
      message: "The branch location for your next class has been updated to Room A2.",
      type: "update",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-12">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#F4F4F5] items-center justify-center mb-6"
          >
            <ArrowLeft size={20} color="#71717A" />
          </TouchableOpacity>

          {/* Header */}
          <View className="flex-row items-start justify-between mb-8">
            <View className="flex-1">
              <Text className="text-[26px] font-noto-bold text-[#09090B]">
                Notifications
              </Text>
              <Text className="text-[13px] text-[#71717A] font-noto mt-1">
                Stay updated on your schedule.
              </Text>
            </View>
            <View className="bg-[#F4F4F5] px-3 py-1.5 rounded-full mt-1">
              <Text className="text-[11px] font-noto-bold text-[#52525B]">
                3 New
              </Text>
            </View>
          </View>

          {/* Notifications List */}
          <View className="gap-4">
            {notifications.map((notif) => {
              const isReminder = notif.type === "reminder";
              const isApproved = notif.type === "approved";
              const isUpdate = notif.type === "update";

              return (
                <View
                  key={notif.id}
                  className={`bg-white rounded-[20px] p-5 flex-row border ${
                    isReminder ? "border-[#D4AF37]" : "border-[#F4F4F5]"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.02,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 3 },
                    elevation: 1,
                  }}
                >
                  {/* Icon */}
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center mr-4 mt-0.5 ${
                      isReminder
                        ? "bg-[#FCF8F2]"
                        : isApproved
                        ? "bg-[#F0FDF4]"
                        : "bg-[#EFF6FF]"
                    }`}
                  >
                    {isReminder && <Clock size={18} color="#D4AF37" />}
                    {isApproved && <CheckCircle2 size={18} color="#22C55E" />}
                    {isUpdate && <Calendar size={18} color="#3B82F6" />}
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-start justify-between mb-1.5 gap-2">
                      <Text className="text-[14px] font-noto-bold text-[#09090B] flex-1">
                        {notif.title}
                      </Text>
                      <Text className="text-[10px] font-noto-bold text-[#A1A1AA] pt-0.5">
                        {notif.time}
                      </Text>
                    </View>
                    <Text className="text-[13px] font-noto text-[#71717A] leading-5">
                      {notif.message}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
