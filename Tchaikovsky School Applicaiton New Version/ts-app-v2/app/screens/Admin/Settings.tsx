import { LucideBell, LucideGlobe } from "lucide-react-native";
import { Switch, Text, View } from "react-native";

export default function Settings() {
  return (
    <View className="pt-12 p-5">
      <Text className="text-zinc-900 text-3xl font-noto">Settings</Text>
      <Text>Preferences & configuration</Text>

      {/* Notification Settings */}
      <View className="mt-10 border border-zinc-200/60 bg-white shadow-sm shadow-black rounded-3xl p-5 gap-4">
        <View className="flex-row gap-4 items-center">
          <View className="rounded-2xl bg-white p-2 shadow shadow-black">
            <LucideBell size={24} color="#A1A1AA" />
          </View>
          <View>
            <Text className="text-zinc-900 text-lg font-noto-bold">
              Notifications
            </Text>
            <Text className="text-gray-500">Manage alert preferences</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Session Rescheduled
            </Text>
            <Text className="text-zinc-400">When a time is changed</Text>
          </View>
          <View>
            <Switch />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Session Canceled
            </Text>
            <Text className="text-zinc-400">When a session is removed</Text>
          </View>
          <View>
            <Switch />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-zinc-900 font-noto-bold">
              Makeup Requests
            </Text>
            <Text className="text-zinc-400">Student requests a makeup</Text>
          </View>
          <View>
            <Switch />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-zinc-900 font-noto-bold">New Feedback</Text>
            <Text className="text-zinc-400">Student submits feedback</Text>
          </View>
          <View>
            <Switch />
          </View>
        </View>
      </View>

      {/* General Settings */}
      <View className="mt-10 border border-zinc-200/60 bg-white shadow-sm shadow-black rounded-3xl p-5 gap-4">
        <View className="flex-row gap-4 items-center">
          <View className="rounded-2xl bg-white p-2 shadow shadow-black">
            <LucideGlobe size={24} color="#A1A1AA" />
          </View>
          <View>
            <Text className="text-zinc-900 text-lg font-noto-bold">
              General
            </Text>
            <Text className="text-gray-500">System-wide preferences</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-8">
          <View>
            <Text className="text-zinc-900 font-noto-bold">Dark Mode</Text>
            <Text className="text-zinc-400">Switch to dark theme</Text>
          </View>
          <View>
            <Switch />
          </View>
        </View>
      </View>
    </View>
  );
}
