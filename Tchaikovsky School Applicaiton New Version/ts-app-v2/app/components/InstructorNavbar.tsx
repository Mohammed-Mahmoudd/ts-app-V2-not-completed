import { Link, usePathname } from "expo-router";
import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  Users,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NavItem = {
  name: string;
  icon: LucideIcon;
  href:
    | "/screens/Instructor/Dashboard"
    | "/screens/Instructor/Schedule"
    | "/screens/Instructor/Students"
    | "/screens/Instructor/Materials"
    | "/screens/Instructor/Feedback";
};

const navItems: NavItem[] = [
  {
    name: "Home",
    icon: LayoutDashboard,
    href: "/screens/Instructor/Dashboard",
  },
  { name: "Schedule", icon: Calendar, href: "/screens/Instructor/Schedule" },
  { name: "Students", icon: Users, href: "/screens/Instructor/Students" },
  { name: "Materials", icon: BookOpen, href: "/screens/Instructor/Materials" },
  {
    name: "Feedback",
    icon: MessageSquare,
    href: "/screens/Instructor/Feedback",
  },
];

export default function InstructorNavbar() {
  const pathname = usePathname();

  return (
    <View className="absolute bottom-10 left-0 right-0 items-center z-[100] px-4">
      <View
        className="flex-row bg-white p-3 rounded-[45px] border border-white/50 w-full max-w-[600px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.2,
          shadowRadius: 18,
          elevation: 10,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                className={`flex-1 gap-1 items-center justify-center py-4 ${
                  isActive ? "bg-[#18181B]" : "bg-transparent"
                }`}
                style={
                  isActive
                    ? {
                        borderRadius: 32,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                      }
                    : {
                        shadowColor: "transparent",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0,
                        shadowRadius: 0,
                        elevation: 0,
                      }
                }
              >
                <item.icon
                  size={20}
                  color={isActive ? "#FFFFFF" : "#71717A"}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  className={`text-[9px] font-noto text-center ${
                    isActive
                      ? "text-white font-noto-bold"
                      : "text-[#71717A] font-noto"
                  }`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </View>
  );
}
