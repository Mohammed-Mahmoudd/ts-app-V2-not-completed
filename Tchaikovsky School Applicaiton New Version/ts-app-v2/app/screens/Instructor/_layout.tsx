import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Slot, usePathname } from "expo-router";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  LucideBellRing,
  MessageSquare,
  Users,
  UserCheck,
  ClipboardList,
  User,
  Settings,
  MessageCircle,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideInLeft,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import InstructorNavbar from "../../components/InstructorNavbar";
import NavigationMenu, {
  MenuItem,
  UserProfile,
} from "../../components/NavigationMenu";
import NotificationsPanel from "../../components/NotificationsPanel";

const instructorMenuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/screens/Instructor/Dashboard",
  },
  {
    name: "Schedule",
    icon: Calendar,
    href: "/screens/Instructor/Schedule",
  },
  {
    name: "My Students",
    icon: Users,
    href: "/screens/Instructor/Students",
  },
  {
    name: "Materials & Notes",
    icon: BookOpen,
    href: "/screens/Instructor/Materials",
  },
  {
    name: "Feedback",
    icon: MessageSquare,
    href: "/screens/Instructor/Feedback",
  },
  {
    name: "Messages",
    icon: MessageCircle,
    href: "/screens/Instructor/Messages",
  },
  {
    name: "Attendance",
    icon: UserCheck,
    href: "/screens/Instructor/Attendance",
  },
  {
    name: "Notifications",
    icon: LucideBellRing,
    href: "/screens/Instructor/Notifications",
  },
  {
    name: "Requests",
    icon: ClipboardList,
    href: "/screens/Instructor/Schedule?tab=requests",
  },
  {
    name: "Profile",
    icon: User,
    href: "/screens/Instructor/Profile",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/screens/Instructor/Settings",
  },
];

const instructorProfile: UserProfile = {
  name: "Ahmed",
  role: "Instructor",
  // Using Adham's image as a placeholder for now since we don't have an instructor specific image in assets
  image: require("../../../assets/admin/Adham.png"),
};

export default function InstructorLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const pathname = usePathname();

  const isChatScreen = pathname.includes("Chat") || pathname.includes("Messages") || pathname.includes("OtherInstructors");

  return (
    <LinearGradient
      colors={["#fff", "#FFF7E6"]}
      locations={[0.4, 1]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      {!isChatScreen && (
        <View className="pt-12 px-6 pb-4 flex-row items-center gap-5">
          <TouchableOpacity
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2"
          >
            <Ionicons name="menu" size={28} color="#09090B" />
          </TouchableOpacity>
          <Text className="grow text-2xl font-noto">Instructor</Text>
          <Link href="/screens/Instructor/Notifications" asChild>
            <Pressable
              className="p-3.5 rounded-2xl bg-white relative"
              style={{
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <Text
                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-orange-700 rounded-full text-xs text-center align-middle border-white border-2 box-content"
                style={{
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                3
              </Text>
              <LucideBellRing size={24} color="#9F9FA9" />
            </Pressable>
          </Link>
        </View>
      )}

      {/* Screen Content */}
      <View className="flex-1" style={{ paddingBottom: isChatScreen ? 0 : 100 }}>
        <Slot />
      </View>

      {!isChatScreen && <InstructorNavbar />}

      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <View className="absolute inset-0 z-[100] flex-row">
          {/* Backdrop */}
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setIsMenuOpen(false)}
            />
          </Animated.View>

          {/* Drawer */}
          <Animated.View
            entering={SlideInLeft.duration(200)}
            exiting={SlideOutLeft.duration(200)}
            className="absolute left-0 top-0 bottom-0 bg-[#09090B] w-[80%]"
          >
            <NavigationMenu
              onClose={() => setIsMenuOpen(false)}
              menuItems={instructorMenuItems}
              userProfile={instructorProfile}
            />
          </Animated.View>
        </View>
      )}

      {/* Notifications Overlay */}
      {isNotifOpen && (
        <View className="absolute inset-0 z-[100] flex-row">
          {/* Backdrop */}
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setIsNotifOpen(false)}
            />
          </Animated.View>

          {/* Drawer */}
          <Animated.View
            entering={SlideInDown.duration(200)}
            exiting={SlideOutDown.duration(200)}
            className="absolute left-0 bottom-0 bg-white w-full h-[85%] rounded-t-2xl"
          >
            <NotificationsPanel />
          </Animated.View>
        </View>
      )}
    </LinearGradient>
  );
}
