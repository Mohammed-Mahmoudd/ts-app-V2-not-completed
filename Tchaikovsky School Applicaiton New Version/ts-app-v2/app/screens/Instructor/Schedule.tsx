import { Portal } from "@gorhom/portal";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import {
  LucideArrowRight,
  LucideCalendar,
  LucideCalendarX,
  LucideChevronDown,
  LucideClock,
  LucideRefreshCw,
  LucideGlobe,
  LucideMapPin,
  LucidePlus,
  LucideRefreshCcw,
  LucideUser,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import ReviewRequestModal from "../../components/ReviewRequestModal";

const sessions = [
  {
    id: 1,
    instrument: "Piano",
    instructor: "Ahmed",
    type: "Practice",
    branch: "Riyadh Branch",
    startTime: new Date(),
    duration: 300000,
    student: "Sarah J.",
  },
  {
    id: 2,
    instrument: "Piano",
    instructor: "Ahmed",
    type: "Practice",
    branch: "Riyadh Branch",
    startTime: new Date(),
    duration: 300000,
    student: "Sarah J.",
  },
];

const requestData = [
  {
    id: 1,
    date: "Oct 22, 2026",
    type: "reschedule",
    colors: {
      bg: "#EFF6FF",
      text: "#1447E6",
      border: "#DBEAFE",
    },
    branch: "Downtown",
    studentName: "Sara Alsheneity",
    studentDetails: "Student • Piano",
    reason: "Medical appointment conflict with session.",
    requester: {
      name: "Sara Alsheneity",
      role: "Student",
      instrument: "Piano",
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    payload: {
      branch: "Downtown",
    },
  },
  {
    id: 2,
    date: "Oct 23, 2026",
    type: "cancellation",
    colors: {
      bg: "#FEF2F2",
      text: "#C10007",
      border: "#FFE2E2",
    },
    branch: "Uptown",
    studentName: "David Lee",
    studentDetails: "Student • Violin",
    reason: "Family emergency.",
    requester: {
      name: "David Lee",
      role: "Student",
      instrument: "Violin",
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    payload: {
      branch: "Uptown",
    },
  },
];

export default function Schedule() {
  const params = useLocalSearchParams();
  const [actionDropdownVisible, setActionDropdownVisible] = useState(false);
  const [branchDropdownVisible, setBranchDropdownVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [activeTab, setActiveTab] = useState<"schedule" | "requests">(
    "schedule",
  );
  const [currentRequest, setCurrentRequest] = useState<any>(null);

  useEffect(() => {
    if (params.tab === "requests") {
      setActiveTab("requests");
    } else {
      setActiveTab("schedule");
    }
  }, [params.tab]);

  const toggleActionDropdown = () => {
    setActionDropdownVisible(!actionDropdownVisible);
    if (branchDropdownVisible) setBranchDropdownVisible(false);
  };

  const toggleBranchDropdown = () => {
    setBranchDropdownVisible(!branchDropdownVisible);
    if (actionDropdownVisible) setActionDropdownVisible(false);
  };

  const closeDropdowns = () => {
    setActionDropdownVisible(false);
    setBranchDropdownVisible(false);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 p-5 pt-6"
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={closeDropdowns}>
          <View className="flex-1 p-5 pt-12">
            {/* Header */}
            <View className="mb-6">
              <Text className="text-3xl font-noto mb-2 text-[#09090B]">
                Schedule & Availability
              </Text>
              <Text className="text-[#71717A] text-lg font-noto">
                Manage your sessions, slots, and requests.
              </Text>
            </View>

            {/* Filters & Actions */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, gap: 16 }}>
              {/* + Actions Dropdown */}

              <View style={{ position: 'relative' }}>
                <View style={{
                  padding: 8,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 9999,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2
                }}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleActionDropdown();
                    }}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 24,
                      backgroundColor: '#FEFAF2',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 9999,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.02,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <LucidePlus size={20} color="#B8B8C1" />
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#09090B' }}>
                      Actions
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Dropdown Menu */}
                {actionDropdownVisible && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 56,
                      left: 0,
                      width: 224,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      padding: 8,
                      zIndex: 50,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8 }}>
                      <LucideClock size={18} color="#09090B" />
                      <Text style={{ fontFamily: 'NotoSerif', color: '#09090B' }}>
                        Add Time Slot
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8 }}>
                      <LucideCalendarX size={18} color="#E17100" />
                      <Text style={{ fontFamily: 'NotoSerif', color: '#E17100' }}>
                        Mark Unavailable
                      </Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: '#E4E4E7', marginVertical: 4, marginHorizontal: 8 }} />

                    <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8 }}>
                      <LucideRefreshCcw size={18} color="#09090B" />
                      <Text style={{ fontFamily: 'NotoSerif', color: '#09090B' }}>
                        Request Makeup
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* All Branches Dropdown */}
              <View style={{
                padding: 8,
                backgroundColor: '#FFFFFF',
                borderRadius: 9999,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2
              }}>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleBranchDropdown();
                    }}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 32,
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 9999,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.02,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#09090B' }}>
                      {selectedBranch}
                    </Text>
                    <LucideChevronDown size={20} color="#71717A" />
                  </TouchableOpacity>
                </View>

                {/* Dropdown Menu */}
                {branchDropdownVisible && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 56,
                      left: 0,
                      width: 224,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      padding: 8,
                      zIndex: 50,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 4,
                    }}
                  >
                    {[
                      "Riyadh Branch",
                      "Jeddah Branch",
                      "Khobar Branch",
                      "Online",
                    ].map((branch, index) => (
                      <React.Fragment key={branch}>
                        {branch === "Online" && (
                          <View style={{ height: 1, backgroundColor: '#E4E4E7', marginVertical: 4, marginHorizontal: 8 }} />
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedBranch(branch);
                            setBranchDropdownVisible(false);
                          }}
                          activeOpacity={0.7}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                            padding: 12,
                            borderRadius: 8,
                          }}
                        >
                          {branch === "Online" ? (
                            <LucideGlobe size={18} color="#09090B" />
                          ) : (
                            <LucideMapPin size={18} color="#09090B" />
                          )}
                          <Text style={{ fontFamily: 'NotoSerif', color: '#09090B' }}>
                            {branch}
                          </Text>
                        </TouchableOpacity>
                      </React.Fragment>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Toggle Switch */}
            <View style={{
              flexDirection: 'row',
              padding: 4,
              backgroundColor: '#FAFAFA',
              borderRadius: 9999,
              borderWidth: 1,
              borderColor: '#f4f4f5',
              marginTop: 24,
              marginBottom: 32,
              position: 'relative',
            }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setActiveTab("schedule")}
                activeOpacity={1}
              >
                {activeTab === "schedule" ? (
                  <LinearGradient
                    colors={["#FFF8E9", "#FFFFFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 9999,
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.02,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#09090B' }}>
                      My Schedule
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={{
                    paddingVertical: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9999,
                  }}>
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#71717B' }}>
                      My Schedule
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setActiveTab("requests")}
                activeOpacity={1}
              >
                {activeTab === "requests" ? (
                  <LinearGradient
                    colors={["#FFF8E9", "#FFFFFF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 9999,
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.02,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#09090B' }}>
                      Requests
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={{
                    paddingVertical: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 9999,
                  }}>
                    <Text style={{ fontFamily: 'NotoSerif-Bold', color: '#71717B' }}>
                      Requests
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Content Section */}
            <View className="flex-1">
              {activeTab === "schedule" ? (
                <View>
                  <View className="flex-row justify-between mb-4">
                    <Text className="text-zinc-900 font-noto-bold text-lg">
                      This Week
                    </Text>
                    <Text className="text-zinc-400 uppercase font-noto-bold text-sm tracking-wider">
                      6 Sessions
                    </Text>
                  </View>
                  <View className="gap-4 pb-12">
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
                              {session.instrument} - Ahmed
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
              ) : (
                <View className="gap-4 pb-12">
                  {requestData.map((req) => (
                    <View
                      key={req.id}
                      className="p-4 bg-white rounded-3xl gap-4 border border-zinc-100"
                      style={{
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      {/* Top Row */}
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-2">
                          <View
                            className="bg-white p-2 rounded-xl border border-zinc-50"
                            style={{
                              shadowColor: "#000",
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.05,
                              shadowRadius: 4,
                              elevation: 1,
                            }}
                          >
                            <LucideCalendar size={18} color="#09090B" />
                          </View>
                          <Text className="font-noto-bold text-zinc-900">
                            {req.date}
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
                            className="font-noto-bold text-xs"
                            style={{ color: req.colors.text }}
                          >
                            {req.type
                              .split("-")
                              .map(
                                (word) => word[0].toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </Text>
                        </View>
                      </View>

                      {/* Branch Row */}
                      <View className="bg-[#FAFAFA] rounded-2xl p-4 flex-row justify-between items-center">
                        <Text className="text-zinc-500 font-noto">
                          Request Branch
                        </Text>
                        <View className="flex-row items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-zinc-100">
                          <LucideMapPin size={17} color="#D4AF37" />
                          <Text className="text-zinc-900 font-noto-bold text-lg">
                            {req.branch}
                          </Text>
                        </View>
                      </View>

                      {/* Student Info Container */}
                      <View className="bg-white flex-row  rounded-2xl p-3 gap-2">
                        <View className="items-center justify-center bg-[#F4F4F5] border border-[#FFFFFF] shadow-lg self-start w-14 h-14 rounded-full">
                          <LucideRefreshCw size={22} color="#71717A" />
                        </View>
                        <View className="self-start px-1 justify-center">
                          <Text className="text-zinc-900 text-lg font-noto-bold">
                            {req.studentName}
                          </Text>
                          <Text className="text-[#71717B] font-noto text-xs">
                            {req.studentDetails}
                          </Text>
                        </View>
                      </View>

                      {/* Reason Section */}
                      <View className="gap-1 px-1">
                        <Text className="text-[#9F9FA9] font-noto-bold text-xs uppercase tracking-wider">
                          Reason
                        </Text>
                        <Text className="text-zinc-900 font-noto">
                          &quot;{req.reason}&quot;
                        </Text>
                      </View>

                      <Pressable
                        onPress={() => setCurrentRequest(req)}
                        className="flex-row justify-between items-center bg-white px-6 py-3 rounded-3xl border border-[#F4F4F5]"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
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
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

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
