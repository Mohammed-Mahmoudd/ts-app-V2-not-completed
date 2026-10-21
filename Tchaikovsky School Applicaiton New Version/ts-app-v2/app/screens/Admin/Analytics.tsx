import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomDropdown from "../../components/CustomDropdown";
import InstructorLoadChart from "../../components/InstructorLoadChart";
import PerformanceDistribtuionChart from "../../components/PerformanceDistribtuionChart";
import WeeklyAttendanceChart from "../../components/WeeklyAttendanceChart";

const branches = ["Khobar", "Riyadh", "Jeddah"];

const needAttention = [
  {
    id: 1,
    name: "Mike Ross",
    description: "Missed 3 consecutive sessions",
    level: "Preliminary",
  },
  {
    id: 2,
    name: "Jenny Kim",
    description: "Practice hours low",
    level: "Grade 5",
  },
  {
    id: 3,
    name: "Tom H.",
    description: "Payment pending",
    level: "Grade 4",
  },
];

export default function Analytics() {
  const [view, setView] = useState<"overview" | "instructors" | "students">(
    "overview",
  );
  const [branch, setBranch] = useState<string | null>(null);

  return (
    <View className="p-5">
      <Text className="font-noto text-3xl">Analytics</Text>
      <Text className="font-noto text-zinc-500">Data-driven insights</Text>

      {/* Overview / Instructors / Students */}
      <View className="flex-row items-center justify-between my-6 bg-white border border-zinc-100 rounded-2xl p-2 shadow shadow-black">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setView("overview")}
          className="flex-1"
        >
          <Text
            className={`font-noto-bold text-center py-2 rounded-2xl ${
              view === "overview"
                ? "bg-zinc-900 shadow shadow-black text-white"
                : ""
            }`}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setView("instructors")}
          className="flex-1"
        >
          <Text
            className={`font-noto-bold text-center py-2 rounded-2xl ${
              view === "instructors"
                ? "bg-zinc-900 shadow shadow-black text-white"
                : ""
            }`}
          >
            Instructors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setView("students")}
          className="flex-1"
        >
          <Text
            className={`font-noto-bold text-center py-2 rounded-2xl ${
              view === "students"
                ? "bg-zinc-900 shadow shadow-black text-white"
                : ""
            }`}
          >
            Students
          </Text>
        </TouchableOpacity>
      </View>

      <View className="p-2 rounded-full bg-white shadow shadow-black">
        <CustomDropdown
          value={branch}
          setValue={setBranch}
          data={[
            { label: "All Branches", value: null },
            ...branches.map((branch) => ({ label: branch, value: branch })),
          ]}
          placeholder="All Branches"
          className="rounded-full elevation-sm bg-white"
        />
      </View>

      {/* Charts */}
      <View className="mt-6 gap-4">
        {view === "overview" && (
          <>
            <View className="gap-2 border border-zinc-200/60 rounded-3xl p-4 items-center">
              <Text className="font-noto-bold text-xl text-zinc-900 self-start">
                Weekly Attendance Overall
              </Text>
              <Text className="text-gray-500 mb-8 self-start">
                Session attendance vs missed sessions
              </Text>
              <WeeklyAttendanceChart />
            </View>
            <View className="gap-2 border border-zinc-200/60 rounded-3xl p-4 items-center">
              <Text className="font-noto-bold text-xl text-zinc-900 self-start">
                Performance Distribution
              </Text>
              <Text className="text-gray-500 mb-8 self-start">
                Overall student progress tiers
              </Text>
              <PerformanceDistribtuionChart />
            </View>
          </>
        )}
        {view === "instructors" && (
          <>
            <View className="gap-2 border border-zinc-200/60 rounded-3xl p-4 items-start">
              <Text className="font-noto-bold text-xl text-zinc-900 self-start">
                Instructor Load
              </Text>
              <Text className="text-gray-500 mb-8 self-start">
                Sessions per instructor
              </Text>
              <InstructorLoadChart />
            </View>
          </>
        )}
        {view === "students" && (
          <>
            <View className="gap-2 border border-zinc-200/60 rounded-3xl p-4 items-center">
              <Text className="font-noto-bold text-xl text-zinc-900 self-start">
                Progress Overview
              </Text>
              <Text className="text-gray-500 mb-8 self-start">
                Student performance levels
              </Text>
              <PerformanceDistribtuionChart />
            </View>
            <View className="gap-2 border border-zinc-200/60 rounded-3xl p-4">
              <Text className="font-noto-bold text-xl text-zinc-900 self-start">
                Needs Attention
              </Text>
              <Text className="text-gray-500 mb-8 self-start">
                Students falling behind schedule
              </Text>

              <View className="gap-4">
                {needAttention.map((student) => (
                  <View
                    key={student.id}
                    className="flex-row items-center gap-2 justify-between bg-zinc-50 border border-zinc-100 p-4 rounded-2xl"
                  >
                    <View>
                      <Text className="font-noto-bold text-zinc-900">
                        {student.name}
                      </Text>
                      <Text className="text-gray-500 font-noto text-sm">
                        {student.description}
                      </Text>
                    </View>
                    <Text className="text-black font-noto-bold text-sm rounded-full border border-zinc-300 px-2 py-1">
                      {student.level}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity>
                <Text className="text-zinc-500 font-noto-bold text-center mt-4">
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
