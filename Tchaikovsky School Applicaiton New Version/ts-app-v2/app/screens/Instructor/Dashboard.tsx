import { Link, useRouter } from "expo-router";
import {
  LucideCalendar,
  LucideCheckSquare,
  LucideStar,
  LucideUsers,
  LucideMapPin,
  LucideArrowRight,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const sessions = [
    {
      id: 1,
      instructor: "Alice Chen",
      student: "Sarah J.",
      time: "09:00",
      timeOfDay: "AM",
      day: "SAT",
      instrument: "Piano",
      mode: "In-person",
      location: "La Palma",
      level: "Grade 1",
      isLive: true,
    },
    {
      id: 2,
      instructor: "Mike Ross",
      student: "David L.",
      time: "10:30",
      timeOfDay: "AM",
      day: "SAT",
      instrument: "Guitar",
      mode: "In-person",
      location: "Studio A",
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
      day: "SAT",
      mode: "Online",
      location: "Zoom",
      level: "Preliminary",
      isLive: false,
    },
  ];
  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 200 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="p-5">
        <Text className="font-noto text-4xl leading-relaxed">
          Good Morning, Hussien
        </Text>
        <Text className="text-[#71717B] font-noto text-lg">
          Here&apos;s what&apos;s happening in your schedule today
        </Text>

        {/* Statistics */}
        <View className="gap-4 mb-8 mt-5">
          <View className="flex-row gap-4">
            {/* Total Students */}
            <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start gap-5 aspect-square pr-0">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideCalendar size={24} color="#18181B" />
              </View>
              <View>
                <Text className="font-noto-bold text-3xl">124</Text>
                <Text className="text-zinc-400 text-lg">Total Students</Text>
              </View>
            </View>

            {/* Active Instructors */}
            <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start gap-5 aspect-square pr-0">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideUsers size={24} color="#18181B" />
              </View>
              <View>
                <Text className="font-noto-bold text-3xl">18</Text>
                <Text className="text-zinc-400 text-lg">Weekly Count</Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-4">
            {/* Sheet Music */}
            <View className="flex-1 p-6 rounded-3xl bg-white border border-zinc-100 items-start gap-5 aspect-square pr-0">
              <View className="border bg-zinc-50 border-2 border-zinc-100 p-4 rounded-2xl">
                <LucideStar size={24} color="#18181B" />
              </View>
              <View>
                <Text className="font-noto-bold text-3xl">4</Text>
                <Text className="text-zinc-400 text-lg">Feedback Due</Text>
              </View>
            </View>

            {/* Daily Sessions */}
            <View className="flex-1 p-6 rounded-3xl bg-zinc-900 border border-zinc-100 items-start gap-5 aspect-square pr-0 relative">
              <View className="absolute top-6 right-6 w-2 h-2 bg-emerald-500 rounded-full" />
              <View className="border-2 bg-white/10 border-white/10 p-4 rounded-2xl">
                <LucideCheckSquare size={24} color="white" />
              </View>
              <View>
                <Text className="font-noto-bold text-3xl text-white">2</Text>
                <Text className="text-zinc-400 text-lg font-bold">
                  Attendance
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tomorrow's Schedule */}
        <View className="flex-row justify-between items-end mt-8 mb-4">
          <View className="flex-col">
            <Text className="text-2xl font-noto">Tomorrow&apos;s </Text>
            <Text className="text-2xl font-noto">Schedule</Text>
          </View>
          <Link href="/screens/Admin/Calendar" asChild>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-zinc-500 font-noto mr-1">
                View Full Schedule
              </Text>
              <LucideArrowRight size={16} color="#71717B" />
            </TouchableOpacity>
          </Link>
        </View>

        <View className="p-4 rounded-3xl bg-white border border-zinc-100 gap-4">
          {sessions.map((session, index) => (
            <View key={session.id} className="p-4">
              <View className="flex-row items-center gap-4 mb-4">
                {/* Time */}
                <View className="items-center p-2 rounded-2xl bg-zinc-50 border border-zinc-100 w-20">
                  <Text className="text-zinc-400 text-xs font-bold mb-1">
                    {session.day}
                  </Text>
                  <Text className="font-noto-bold text-lg mb-1">
                    {session.time}
                  </Text>
                  <Text className="text-zinc-400 text-xs font-bold">
                    {session.timeOfDay}
                  </Text>
                </View>

                {/* Info */}
                <View className="flex-1 gap-1">
                  <Text className="text-zinc-900 font-noto-bold text-xl">
                    {session.student}
                  </Text>

                  <View className="flex-row items-center gap-1 flex-wrap">
                    <LucideUsers size={14} color="#71717B" />
                    <Text className="text-zinc-500 font-noto text-sm">
                      {session.instrument} ({session.mode})
                    </Text>
                    <LucideMapPin size={14} color="#71717B" className="ml-2" />
                    <Text className="text-zinc-500 font-noto text-sm">
                      {session.location}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Mark Attendance Button */}
              <TouchableOpacity
                onPress={() => router.push("/screens/Instructor/Attendance")}
                className="w-full py-3 rounded-xl border items-center justify-center bg-white"
                activeOpacity={0.7}
                style={{ borderColor: "#E4E4E7", borderWidth: 2 }}
              >
                <Text className="font-noto font-bold text-zinc-900">
                  Mark Attendance
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
