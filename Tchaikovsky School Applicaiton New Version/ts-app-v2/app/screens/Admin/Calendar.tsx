import {
  LucideClock,
  LucidePlus,
  // LucideStar,
  LucideUser,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  // StyleProp,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropdown from "../../components/CustomDropdown";
import SplitDateInput from "../../components/SplitDateInput";
import TimeInput from "../../components/TimeInput";

export default function Calendar() {
  const [location, setLocation] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [view, setView] = useState<"day" | "week" | "month">("month");
  useEffect(() => {
    setView("week");
    setView("day");
  }, []);

  const sessions = [
    {
      id: 1,
      instrument: "Piano",
      instructor: "Alice Chen",
      type: "Practice",
      branch: "Riyadh Branch",
      startTime: new Date(),
      duration: 300000,
      student: "Sarah J.",
    },
    {
      id: 2,
      instrument: "Piano",
      instructor: "Alice Chen",
      type: "Practice",
      branch: "Riyadh Branch",
      startTime: new Date(),
      duration: 300000,
      student: "Sarah J.",
    },
  ];
  return (
    <View className="flex-1 p-5">
      <Text className="text-3xl font-noto">Schedule</Text>
      <Text className="text-zinc-500 font-noto">
        Manage sessions & availability
      </Text>

      <View
        className="my-4 bg-white border border-zinc-100 px-4 py-2 rounded-3xl gap-8"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {/* Day / Week / Month */}
        <View className="flex-row justify-between bg-zinc-100 rounded-2xl p-1">
          <Pressable
            className={`w-1/3 py-2 rounded-xl ${view === "day" ? "bg-white" : ""}`}
            onPress={() => setView("day")}
            style={
              view === "day" && {
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }
            }
          >
            <Text
              className={`text-center font-noto-bold ${view === "day" ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Day
            </Text>
          </Pressable>
          <Pressable
            className={`w-1/3 py-2 rounded-xl ${view === "week" ? "bg-white" : ""}`}
            onPress={() => setView("week")}
            style={
              view === "week" && {
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }
            }
          >
            <Text
              className={`text-center font-noto-bold ${view === "week" ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Week
            </Text>
          </Pressable>
          <Pressable
            className={`w-1/3 py-2 rounded-xl ${view === "month" ? "bg-white" : ""}`}
            onPress={() => setView("month")}
            style={
              view === "month" && {
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }
            }
          >
            <Text
              className={`text-center font-noto-bold ${view === "month" ? "text-zinc-900" : "text-zinc-500"}`}
            >
              Month
            </Text>
          </Pressable>
        </View>

        {/* Filters */}
        <View className="flex-row gap-2">
          {/* Location */}
          <CustomDropdown
            data={[
              { label: "All Locations", value: null },
              { label: "Riyadh Branch", value: "riyadh" },
              { label: "Jeddah Branch", value: "jeddah" },
            ]}
            placeholder="All Locations"
            value={location}
            setValue={setLocation}
          />

          {/* Type */}
          <CustomDropdown
            data={[
              { label: "All Types", value: null },
              { label: "Practice", value: "practice" },
              { label: "Performance", value: "performance" },
            ]}
            placeholder="All Types"
            value={type}
            setValue={setType}
          />

          {/* Create new session button */}
          <NewSessionButton />
        </View>
      </View>

      {/* Today View */}
      {/* <View
        className="relative h-52 border border-zinc-100 rounded-[40px] bg-white my-10"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <CalendarStar
          day="Mo"
          className="top-1/3 left-1/2 -translate-x-[350rnw] -translate-y-[-20rnh]"
        />
        <CalendarStar
          day="Tu"
          className="top-1/3 left-1/2 -translate-x-[250rnw] -translate-y-[15rnh]"
        />
        <CalendarStar
          day="We"
          className="top-1/3 left-1/2 -translate-x-[150rnw] -translate-y-[40rnh]"
        />
        <CalendarStar
          day="Th"
          isStar
          className="top-1/3 left-1/2 -translate-x-[50rnw] -translate-y-[50rnh]"
        />
        <CalendarStar
          day="Fr"
          className="top-1/3 left-1/2 -translate-x-[-50rnw] -translate-y-[40rnh]"
        />
        <CalendarStar
          day="Sa"
          className="top-1/3 left-1/2 -translate-x-[-150rnw] -translate-y-[15rnh]"
        />
        <CalendarStar
          day="Su"
          className="top-1/3 left-1/2 -translate-x-[-250rnw] -translate-y-[-20rnh]"
        />
      </View> */}

      <View className="flex-row justify-between mb-4">
        <Text className="text-zinc-900 font-noto-bold text-lg">This Week</Text>
        <Text className="text-zinc-400 uppercase font-noto-bold text-sm tracking-wider">
          6 Sessions
        </Text>
      </View>
      <View className="gap-4">
        {sessions.map((session) => (
          <View
            key={session.id}
            className="gap-6 border border-zinc-100 bg-white rounded-3xl p-4"
            style={{
              shadowColor: "#00000099",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            {/* Top Row */}
            <View className="flex-row gap-3">
              {/* Session Number Bubble */}
              <View className="w-12 h-12 rounded-2xl bg-indigo-50 items-center justify-center">
                <Text className="text-indigo-600 font-noto-bold text-lg">
                  {session.id}
                </Text>
              </View>

              {/* Title + Type */}
              <View className="flex-1 gap-1">
                <Text className="font-noto-bold text-zinc-900">
                  {session.instrument} - {session.instructor}
                </Text>

                <View className="flex-row items-center gap-2">
                  <View className="px-3 py-1 rounded-full bg-zinc-100">
                    <Text className="text-zinc-600 text-xs font-noto-bold">
                      {session.type}
                    </Text>
                  </View>

                  <Text className="text-zinc-400 text-xs font-noto">
                    • {session.branch}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-6">
              <View className="flex-row items-center gap-1.5">
                <LucideClock size={16} color="#71717a" />
                <Text className="text-zinc-500 text-sm font-medium font-noto-bold">
                  09:00 AM - 10:00 AM
                </Text>
              </View>

              <Text className="text-zinc-300">|</Text>

              <View className="flex-row items-center gap-1.5">
                <LucideUser size={16} color="#71717a" />
                <Text className="text-zinc-500 text-sm font-medium font-noto-bold">
                  Sarah J.
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function NewSessionButton() {
  const instructors = [
    { id: "4", name: "Instructor 1" },
    { id: "5", name: "Instructor 2" },
    { id: "6", name: "Instructor 3" },
  ];
  const students = [
    { id: "1", name: "Student 1" },
    { id: "2", name: "Student 2" },
    { id: "3", name: "Student 3" },
  ];
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<{
    student: string | null;
    instructor: string | null;
    date: Date | null;
    time: Date | null;
    duration: string | null;
    location: string | null;
    type: string | null;
  }>({
    student: null,
    instructor: null,
    time: null,
    date: null,
    duration: null,
    location: null,
    type: null,
  });

  return (
    <>
      <TouchableOpacity
        className="bg-zinc-900 rounded-2xl p-3 flex-row items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => setShowModal(true)}
      >
        <LucidePlus color="white" size={20} />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        statusBarTranslucent
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-[40px] w-11/12">
            <View className="bg-zinc-900 rounded-t-[40px] p-6">
              <Text className="text-2xl mb-4 text-white font-noto-bold">
                New Session
              </Text>
              <Text className="text-zinc-400 font-noto">
                Schedule a lesson or event
              </Text>
            </View>

            {/* Form */}
            <View className="gap-8 px-6 pt-8 pb-4">
              {/* Instructors and Students */}
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1">
                  <Text className="font-noto-bold text-zinc-500">Student</Text>
                  <View className="flex-row">
                    <CustomDropdown
                      className="rounded-full bg-zinc-50 border border-zinc-100"
                      data={students.map((s) => ({
                        label: s.name,
                        value: s.id,
                      }))}
                      placeholder="Select..."
                      value={formData.student}
                      setValue={(value) =>
                        setFormData({ ...formData, student: value })
                      }
                    />
                  </View>
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-noto-bold text-zinc-500">
                    Instructor
                  </Text>
                  <View className="flex-row">
                    <CustomDropdown
                      className="rounded-full bg-zinc-50 border border-zinc-100"
                      data={instructors.map((s) => ({
                        label: s.name,
                        value: s.id,
                      }))}
                      placeholder="Select..."
                      value={formData.instructor}
                      setValue={(value) =>
                        setFormData({ ...formData, instructor: value })
                      }
                    />
                  </View>
                </View>
              </View>
              {/* Date and Time */}
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1">
                  <Text className="font-noto-bold text-zinc-500">Date</Text>
                  <SplitDateInput
                    setValue={(value) =>
                      setFormData({ ...formData, date: value })
                    }
                  />
                </View>
                <View className="flex-1 gap-1">
                  <Text className="font-noto-bold text-zinc-500">Time</Text>
                  <View className="flex-row">
                    <TimeInput
                      setValue={(value) =>
                        setFormData({ ...formData, time: value })
                      }
                    />
                  </View>
                </View>
              </View>

              {/* Session Type */}
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1">
                  <Text className="font-noto-bold text-zinc-500">
                    Session Type
                  </Text>
                  <View className="flex-row">
                    <CustomDropdown
                      className="rounded-full bg-zinc-50 border border-zinc-100"
                      data={[
                        { label: "In-Person", value: "In-Person" },
                        { label: "Theory", value: "Theory" },
                      ]}
                      placeholder="Select..."
                      value={formData.instructor}
                      setValue={(value) =>
                        setFormData({ ...formData, instructor: value })
                      }
                    />
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <TouchableOpacity
                  className="bg-zinc-900 rounded-2xl p-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  onPress={() => setShowModal(false)}
                >
                  <Text className="text-white font-noto text-center">
                    Create Session
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-4"
                  onPress={() => setShowModal(false)}
                >
                  <Text className="text-zinc-500 font-noto text-center">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// function CalendarStar({
//   className,
//   day,
//   isStar,
//   style,
// }: {
//   className?: string;
//   day: "Sa" | "Su" | "Mo" | "Tu" | "We" | "Th" | "Fr";
//   isStar?: boolean;
//   style?: StyleProp<ViewStyle>;
// }) {
//   return (
//     <>
//       {Array.from({ length: isStar ? 10 : 1 }).map((_, i) => (
//         <View
//           className={"absolute items-center gap-2 " + className}
//           style={style}
//           key={i}
//         >
//           <Text className="text-zinc-400 font-noto-bold">{day}</Text>
//           <View
//             className="justify-center items-center w-11 h-11 rounded-full bg-white"
//             style={{
//               shadowColor: isStar ? "#FFF3DB" : "#000",
//               shadowOffset: {
//                 width: 0,
//                 height: 1,
//               },
//               shadowOpacity: 0.25,
//               shadowRadius: 2,
//               elevation: isStar ? 8 : 2,
//             }}
//           >
//             {isStar ? (
//               <LucideStar size={16} color="#FFE9BE" fill="#FFE9BE" />
//             ) : (
//               <LucidePlus size={16} color="#D4D4D8" />
//             )}
//           </View>
//         </View>
//       ))}
//     </>
//   );
// }
