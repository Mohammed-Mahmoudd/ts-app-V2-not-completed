import { Portal } from "@gorhom/portal";
import {
  LucideArrowRight,
  LucideCalendar,
  LucideClock,
  LucideMapPin,
} from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { Request } from "../../../types/request";
import CustomDropdown from "../../components/CustomDropdown";
import ReviewRequestModal from "../../components/ReviewRequestModal";

const branches = ["Khobar", "Riyadh", "Jeddah"];

const requests: Request[] = [
  {
    id: 1,
    requester: {
      id: 1,
      name: "Sarah Johnson",
      role: "instructor",
      instrument: "Piano",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    type: "reschedule",
    colors: {
      bg: "#EFF6FF",
      text: "#1447E6",
      border: "#DBEAFE",
    },
    payload: {
      from: new Date(),
      to: new Date(),
      branch: "Downtown",
    },
  },
  {
    id: 2,
    requester: {
      id: 1,
      name: "David Lee",
      role: "instructor",
      instrument: "Violin",
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    type: "cancellation",
    colors: {
      bg: "#FEF2F2",
      text: "#C10007",
      border: "#FFE2E2",
    },
    payload: {
      from: new Date(),
      to: new Date(),
      branch: "Uptown",
    },
  },
  {
    id: 3,
    requester: {
      id: 1,
      name: "Maria Gracia",
      role: "instructor",
      instrument: "Guitar",
    },
    type: "extra-session",
    colors: {
      bg: "#ECFDF5",
      text: "#007A55",
      border: "#D0FAE5",
    },
    payload: {
      from: new Date(),
      to: new Date(),
      branch: "Online",
    },
  },
];

export default function Requests() {
  const [branch, setBranch] = useState("");
  const [type, setType] = useState<"instructor" | "student">("instructor");
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);

  return (
    <View className="p-5">
      <Text className="font-noto text-3xl">Requests</Text>
      <Text className="text-zinc-500">
        Manage scheduling changes and approvals
      </Text>

      {/* Filters */}
      {/* Branch Filter */}
      <View
        className="mt-5 p-2 rounded-full bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
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

      {/* Instructor / Student Filter */}
      <View
        className="mt-5 p-2 rounded-full bg-zinc-100 flex-row"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
        <TouchableOpacity
          className="flex-1 rounded-full p-2"
          style={
            type === "instructor" && {
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
            }
          }
          onPress={() => setType("instructor")}
        >
          <Text
            className={`text-center font-noto-bold ${type === "instructor" ? "text-zinc-900" : "text-zinc-500"}`}
          >
            Instructor Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-full p-2"
          style={
            type === "student" && {
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
            }
          }
          onPress={() => setType("student")}
        >
          <Text
            className={`text-center font-noto-bold ${type === "student" ? "text-zinc-900" : "text-zinc-500"}`}
          >
            Student Requests
          </Text>
        </TouchableOpacity>
      </View>

      <View className="gap-4 mt-8">
        {requests.map((req) => (
          <View
            key={req.id}
            className="p-4 bg-white rounded-xl gap-4"
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 2,
            }}
          >
            <View className="flex-row gap-2 items-start">
              <View
                className="w-11 h-11 rounded-full bg-zinc-100 flex-row items-center justify-center border-2 border-white"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 2,
                }}
              >
                {req.requester.profilePicture ? (
                  <Image
                    source={{ uri: req.requester.profilePicture }}
                    className="w-11 h-11 rounded-full"
                  />
                ) : (
                  <Text className="font-noto-bold text-zinc-500">
                    {req.requester.name.charAt(0).toUpperCase()}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-lg font-noto-bold">
                  {req.requester.name}
                </Text>
                <Text className="text-zinc-500">
                  {req.requester.role[0].toUpperCase() +
                    req.requester.role.slice(1)}{" "}
                  • {req.requester.instrument}
                </Text>
              </View>

              <View
                className="px-4 py-2 rounded-full"
                style={{
                  backgroundColor: req.colors.bg,
                  borderWidth: 1,
                  borderColor: req.colors.border,
                }}
              >
                <Text
                  className="font-noto-bold text-sm"
                  style={{ color: req.colors.text }}
                >
                  {req.type
                    .split("-")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </Text>
              </View>
            </View>

            {/* Payload */}
            <View className="gap-4">
              {(req.payload.from || req.payload.to) && (
                <View className="rounded-3xl bg-zinc-50/80 px-4 py-5 border border-zinc-100 gap-6">
                  {req.payload.from && (
                    <View className="flex-row gap-4 items-center">
                      <View
                        className="rounded-full bg-white p-2"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 2,
                        }}
                      >
                        <LucideCalendar size={16} color="#9F9FA9" />
                      </View>
                      <Text className="text-zinc-400 uppercase font-bold text-sm flex-1">
                        From
                      </Text>
                      <View className="items-end">
                        <Text className="text-zinc-900 font-noto-bold">
                          {req.payload.from.toDateString()}
                        </Text>
                        <Text className="text-zinc-500">
                          {req.payload.from.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                    </View>
                  )}
                  {req.payload.to && (
                    <View className="flex-row gap-4 items-center">
                      <View
                        className="rounded-full bg-zinc-900 p-2"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 2,
                        }}
                      >
                        <LucideClock size={16} color="#fff" />
                      </View>
                      <Text className="text-zinc-400 uppercase font-bold text-sm flex-1">
                        To
                      </Text>
                      <View className="items-end">
                        <Text className="text-zinc-900 font-noto-bold">
                          {req.payload.to.toDateString()}
                        </Text>
                        <Text className="text-zinc-500">
                          {req.payload.to.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
              {req.payload.branch && (
                <View className="flex-row items-center gap-3">
                  <LucideMapPin size={16} color="#9F9FA9" />
                  <Text className="text-zinc-400">
                    {req.payload.branch} Branch
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              onPress={() => setCurrentRequest(req)}
              className="flex-row justify-between items-center bg-white p-4 rounded-2xl"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              <Text className="text-zinc-900 font-noto-bold">
                Review Request
              </Text>
              <View className="bg-zinc-900 rounded-full p-2">
                <LucideArrowRight size={16} color="#fff" />
              </View>
            </Pressable>
          </View>
        ))}
      </View>

      <Portal>
        {currentRequest && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, flexDirection: 'row' }}>
            {/* Backdrop */}
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setCurrentRequest(null)}
              />
            </Animated.View>

            {/* Drawer */}
            <Animated.View
              entering={SlideInDown.duration(200)}
              exiting={SlideOutDown.duration(200)}
              style={{ position: 'absolute', left: 0, bottom: 0, backgroundColor: '#FFFFFF', width: '100%', height: '85%', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            >
              <ReviewRequestModal
                request={currentRequest}
                onClose={() => setCurrentRequest(null)}
              />
            </Animated.View>
          </View>
        )}
      </Portal>
    </View>
  );
}
