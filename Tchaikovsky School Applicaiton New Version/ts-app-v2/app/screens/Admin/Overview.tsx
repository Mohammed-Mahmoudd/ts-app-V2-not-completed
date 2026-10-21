import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  LucideActivity,
  LucideCalendar,
  LucideFunnel,
  LucideMusic,
  LucideStar,
  LucideUsers,
} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Overview() {
  const sessions = [
    {
      id: 1,
      instructor: "Alice Chen",
      student: "Sarah J.",
      time: "09:00",
      timeOfDay: "AM",
      instrument: "Piano",
      level: "Grade 1",
      isLive: true,
    },
    {
      id: 2,
      instructor: "Mike Ross",
      student: "David L.",
      time: "10:30",
      timeOfDay: "AM",
      instrument: "Guitar",
      level: "Grade 3",
      isLive: false,
    },
    {
      id: 3,
      instructor: "Jenny Kim",
      student: "Hussien M.",
      time: "01:00",
      timeOfDay: "PM",
      instrument: "Violin",
      level: "Preliminary",
      isLive: false,
    },
  ];

  const requests = [
    {
      id: 1,
      type: "Makeup Request",
      name: "Abishai E.",
      description: "Requested for Friday, 2pm",
      color: "#FFF4F4",
      textColor: "#E7000B",
      borderColor: "#FFE2E2",
    },
    {
      id: 2,
      type: "New Application",
      name: "John Doe",
      description: "Instructor Application",
      color: "#EFF6FF",
      textColor: "#155DFC",
      borderColor: "#DBEAFE",
    },
  ];
  return (
    <View className="p-5">
      {/* Welcome */}
      <Text className="uppercase text-zinc-500 font-noto mb-4">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text className="font-noto text-4xl leading-relaxed">Good Morning,</Text>
      <Text className="text-zinc-600 font-noto text-4xl">Adham</Text>

      {/* Warnings */}
      <View className="border border-amber-200/50 p-8 rounded-3xl my-10 border-l-4 border-l-yellow-500 bg-white/60 gap-3">
        <View
          className="p-4 bg-amber-50 self-start rounded-2xl mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Ionicons name="warning-outline" size={24} color="#E17100" />
        </View>
        <Text className="font-noto-bold text-xl leading-tight">
          Schedulling Conflict Detected
        </Text>
        <Text className="text-zinc-500 text-lg leading-tight">
          Instructor Hussien M. is overbooked for next Tuesday&apos;s afternoon
          block.
        </Text>
        <TouchableOpacity className="bg-zinc-900 items-center p-4 rounded-3xl">
          <Text className="font-noto-bold text-lg text-white">
            Resolve Issue
          </Text>
        </TouchableOpacity>
      </View>

      {/* Statistics */}
      <View className="gap-4 mb-8">
        <View className="flex-row gap-4">
          {/* Total Students */}
          <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start aspect-square pr-0">
            <View className="flex-1">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideUsers size={24} color="#18181B" />
              </View>
            </View>
            <Text className="font-noto-bold text-3xl">124</Text>
            <Text className="text-zinc-400 text-lg">Total Students</Text>
          </View>

          {/* Active Instructors */}
          <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start aspect-square pr-0">
            <View className="flex-1">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideActivity size={24} color="#18181B" />
              </View>
            </View>
            <Text className="font-noto-bold text-3xl">18</Text>
            <Text className="text-zinc-400 text-lg">Active Instructors</Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          {/* Sheet Music */}
          <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start aspect-square pr-0">
            <View className="flex-1">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideMusic size={24} color="#18181B" />
              </View>
            </View>
            <Text className="font-noto-bold text-3xl">450</Text>
            <Text className="text-zinc-400 text-lg">Sheet Music</Text>
          </View>

          {/* Daily Sessions */}
          <View className="flex-1 p-6 rounded-3xl bg-zinc-900 border border-zinc-100 items-start aspect-square pr-0 relative">
            <View className="absolute top-6 right-6 w-2 h-2 bg-emerald-500 rounded-full" />
            <View className="flex-1">
              <View className="border-2 bg-white/10 border-white/10 p-4 rounded-2xl">
                <LucideCalendar size={24} color="white" />
              </View>
            </View>
            <Text className="font-noto-bold text-3xl text-white">12</Text>
            <Text className="text-zinc-400 text-lg font-bold">
              Daily Sessions
            </Text>
          </View>
        </View>
      </View>

      {/* Actions Required */}
      <Text className="text-zinc-900 text-2xl font-noto mb-4">
        Actions Required
      </Text>
      <View className="flex-row flex-wrap">
        {requests.map((req) => (
          <View key={req.id} className="basis-1/2 p-1">
            <View
              className="p-4 rounded-3xl border border-zinc-100 gap-2 flex-1"
              style={{
                backgroundColor: req.color,
              }}
            >
              <View className="flex-row items-center justify-between">
                <Text
                  className="rounded-full border uppercase font-bold py-2 px-3 text-xs"
                  style={{
                    backgroundColor: req.color,
                    color: req.textColor,
                    borderColor: req.borderColor,
                  }}
                >
                  {req.type}
                </Text>
              </View>
              <Text className="font-noto-bold text-xl">{req.name}</Text>
              <Text className="text-zinc-400 text-base">{req.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Today's Sessions */}
      <View className="flex-row items-center mt-8">
        <Text className="flex-1 text-2xl font-noto">Today&apos;s Sessions</Text>
        <Link href="/screens/Admin/Calendar" className="mr-3">
          <Text className="text-zinc-500 underline">View Calendar</Text>
        </Link>
        <TouchableOpacity>
          <LucideFunnel size={20} color="#71717B" />
        </TouchableOpacity>
      </View>

      <View className="gap-4 mt-4">
        {sessions.map((session) => (
          <View
            key={session.id}
            className="flex-row items-center gap-4 p-4 rounded-3xl bg-white border border-zinc-100"
          >
            {/* Time */}
            <View className="items-center p-3 rounded-2xl bg-zinc-50 border border-zinc-100">
              <Text className="text-zinc-400 text-sm font-bold">
                {session.timeOfDay}
              </Text>
              <Text className="font-noto-bold text-xl">{session.time}</Text>
            </View>

            {/* Info */}
            <View className="gap-2">
              <View className="flex-row items-center gap-4">
                <Text className="text-zinc-900 font-bold text-lg">
                  {session.instructor}
                </Text>
                {session.isLive && (
                  <Text className="rounded-full bg-emerald-100 text-emerald-700 py-1 px-3 font-bold">
                    Live
                  </Text>
                )}
              </View>
              <View className="flex-row gap-2 items-baseline text-wrap">
                <Text className="text-zinc-500">{session.instrument}</Text>
                <Text className="text-zinc-500 font-bold text-lg">•</Text>
                <Text className="text-zinc-500">{session.level} with</Text>
                <Text className="text-zinc-800 font-bold">
                  {session.student}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Latest Feedback */}
      <LinearGradient
        colors={["#18181B", "#27272A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginTop: 32,
          padding: 32,
          gap: 24,
          borderRadius: 32,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <LucideStar size={16} color="#FFB900" fill="#FFB900" />
          <Text style={{ color: '#eab308', fontFamily: 'NotoSerif' }}>Latest Feedback</Text>
        </View>

        <Text style={{ color: '#f4f4f5', fontSize: 16, lineHeight: 24, fontFamily: 'NotoSerif' }}>
          &quot;Sarah is an amazing teacher! I learned so much in just one
          session.&quot;
        </Text>

        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          {/* Avatar */}
          <View style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'NotoSerif', fontSize: 14, lineHeight: 20 }}>AC</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#f4f4f5', fontWeight: 'bold' }}>Alice Chen</Text>
            <Text style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 20 }}>Piano Student</Text>
          </View>

          <Link href="/screens/Admin/Feedback" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            View All
          </Link>
        </View>
      </LinearGradient>
    </View>
  );
}
