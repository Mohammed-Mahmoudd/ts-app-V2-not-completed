import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, usePathname } from "expo-router";
import {
  Bell,
  BookOpen,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Home,
  MessageCircle,
  MessageSquare,
  Settings,
  TrendingUp,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import StudentNavbar from "../../components/StudentNavbar";
import StudentNavigationMenu, {
  MenuItem,
  UserProfile,
} from "../../components/StudentNavigationMenu";

const quickAccessItems: MenuItem[] = [
  { name: "Home", icon: Home, href: "/screens/Student/Home" },
  { name: "Schedule", icon: CalendarIcon, href: "/screens/Student/Schedule" },
  { name: "Material", icon: BookOpen, href: "/screens/Student/Material" },
  { name: "Feedback", icon: MessageSquare, href: "/screens/Student/Feedback" },
];

const accountItems: MenuItem[] = [
  { name: "Profile", icon: User, href: "/screens/Student/Profile" },
  { name: "Messages", icon: MessageCircle, href: "/screens/Student/Messages" },
  { name: "Progress", icon: TrendingUp, href: "/screens/Student/Progress" },
  { name: "Attendance", icon: CheckCircle, href: "/screens/Student/Attendance" },
  { name: "Session History", icon: Clock, href: "/screens/Student/SessionHistory" },
  { name: "Notifications", icon: Bell, href: "/screens/Student/Notifications" },
  { name: "Settings", icon: Settings, href: "/screens/Student/Settings" },
];

// We use Adham's picture for now as a placeholder for Dana
const studentProfile: UserProfile = {
  name: "Dana",
  role: "Piano Student",
  image: require("../../../assets/admin/Primitive.img.png"), 
};

export default function StudentLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isFullScreen = pathname.includes("Chat") || pathname.includes("Messages") || pathname.includes("Notifications");

  return (
    <LinearGradient
      colors={["#fff", "#FFF7E6"]}
      locations={[0.4, 1]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      {!isFullScreen && (
        <View className="pt-12 px-6 pb-4 flex-row items-center gap-5">
          <TouchableOpacity
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2"
          >
            <Ionicons name="menu" size={28} color="#09090B" />
          </TouchableOpacity>
          <Text className="grow text-2xl font-noto-bold text-[#09090B]">Student</Text>
          <Pressable
            onPress={() => {
              const { router } = require("expo-router");
              router.push("/screens/Student/Notifications");
            }}
            className="p-3.5 rounded-2xl bg-white relative border border-gray-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Text
              className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-orange-700 rounded-full text-xs text-center align-middle border-white border-2 box-content"
              style={{ overflow: 'hidden' }}
            >
              3
            </Text>
            <Bell size={24} color="#9F9FA9" />
          </Pressable>
        </View>
      )}

      {/* Screen Content */}
      {isFullScreen ? (
        <View className="flex-1">
          <Slot />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 160 }}
        >
          <Slot />
        </ScrollView>
      )}

      {!isFullScreen && <StudentNavbar />}

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
            className="absolute left-0 top-0 bottom-0 bg-white w-[80%]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 4, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <StudentNavigationMenu
              onClose={() => setIsMenuOpen(false)}
              quickAccessItems={quickAccessItems}
              accountItems={accountItems}
              userProfile={studentProfile}
            />
          </Animated.View>
        </View>
      )}
    </LinearGradient>
  );
}
