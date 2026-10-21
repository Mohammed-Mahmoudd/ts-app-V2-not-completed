import { LucideBell, LucideGlobe } from "lucide-react-native";
import { ScrollView, Switch, Text, View } from "react-native";

export default function Settings() {
  return (
    <ScrollView
      className="flex-1 p-5 pt-6"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text className="text-zinc-900 text-3xl font-noto-bold">Settings</Text>
      <Text className="text-zinc-500 font-noto mt-1">
        Preferences & configuration
      </Text>

      {/* Notification Settings */}
      <View className="mt-10 border border-zinc-200/60 bg-white shadow-sm shadow-black rounded-[32px] p-6 gap-4">
        <View className="flex-row gap-4 items-center">
          <View className="rounded-2xl bg-white p-2 shadow-sm border border-zinc-100">
            <LucideBell size={24} color="#A1A1AA" />
          </View>
          <View>
            <Text className="text-zinc-900 text-lg font-noto-bold">
              Notifications
            </Text>
            <Text className="text-gray-500 font-noto">
              Manage alert preferences
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 items-center">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Session Rescheduled
            </Text>
            <Text className="text-zinc-400 font-noto">
              When a time is changed
            </Text>
          </View>
          <Switch />
        </View>

        <View className="h-[1px] bg-zinc-100 my-1" />

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Session Canceled
            </Text>
            <Text className="text-zinc-400 font-noto">
              When a session is removed
            </Text>
          </View>
          <Switch />
        </View>

        <View className="h-[1px] bg-zinc-100 my-1" />

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Makeup Requests
            </Text>
            <Text className="text-zinc-400 font-noto">
              Student requests a makeup
            </Text>
          </View>
          <Switch />
        </View>

        <View className="h-[1px] bg-zinc-100 my-1" />

        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-zinc-900 font-noto-bold">New Feedback</Text>
            <Text className="text-zinc-400 font-noto">
              Student submits feedback
            </Text>
          </View>
          <Switch />
        </View>
      </View>

      {/* General Settings */}
      <View className="mt-10 border border-zinc-200/60 bg-white shadow-sm shadow-black rounded-[32px] p-6 gap-4">
        <View className="flex-row gap-4 items-center">
          <View className="rounded-2xl bg-white p-2 shadow-sm border border-zinc-100">
            <LucideGlobe size={24} color="#A1A1AA" />
          </View>
          <View>
            <Text className="text-zinc-900 text-lg font-noto-bold">
              General
            </Text>
            <Text className="text-gray-500 font-noto">
              System-wide preferences
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8 items-center">
          <View>
            <Text className="text-zinc-900 font-noto-bold">Dark Mode</Text>
            <Text className="text-zinc-400 font-noto">
              Switch to dark theme
            </Text>
          </View>
          <Switch />
        </View>
      </View>
    </ScrollView>
  );
}
