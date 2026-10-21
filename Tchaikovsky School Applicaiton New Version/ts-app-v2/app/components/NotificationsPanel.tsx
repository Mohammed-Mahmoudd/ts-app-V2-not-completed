import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { timeAgo } from "../../utils/timeUtils";

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      title: "Instructor Overbooked",
      desc: "Hussien M. exceeded weekly limit.",
      date: new Date("2026-01-29T5:00:00"),
      isRead: false,
    },
    {
      id: 2,
      title: "New Makeup Request",
      desc: "Student Abishai requested a session.",
      date: new Date("2026-01-28T15:00:00"),
      isRead: false,
    },
    {
      id: 3,
      title: "System Update",
      desc: "Maintenance scheduled for tonight.",
      date: new Date("2026-01-28T12:00:00"),
      isRead: true,
    },
  ];
  return (
    <View className="flex-1 pt-8 px-6">
      <View className="flex-row items-center justify-between mb-8">
        <View>
          <Text className="text-2xl font-noto font-bold">Notifications</Text>
          <Text className="text-sm text-zinc-400">
            You have 2 unread messages
          </Text>
        </View>
        <TouchableOpacity
          className="rounded-full bg-zinc-900 py-2 px-4"
          style={{
            shadowColor: "#18181B",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 10,
          }}
        >
          <Text className="uppercase text-white font-noto-bold text-sm">
            Mark All Read
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-8">
            {notifications.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row gap-4 items-baseline"
              >
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    borderRadius: 9999,
                    backgroundColor: item.isRead ? "#E4E4E7" : "#FF0000",
                  }}
                />

                <View className="flex-1">
                  <Text className="font-noto font-bold text-zinc-900 text-lg">
                    {item.title}
                  </Text>
                  <Text
                    className="text-sm text-zinc-500 font-noto mt-0.5"
                    numberOfLines={1}
                  >
                    {item.desc}
                  </Text>
                </View>
                <Text className="text-sm text-zinc-400 font-noto-bold">
                  {timeAgo(item.date)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
