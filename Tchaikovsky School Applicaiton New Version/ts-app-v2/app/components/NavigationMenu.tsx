import { LinearGradient } from "expo-linear-gradient";
import { Href, Link, usePathname, useRouter } from "expo-router";
import { LogOut, LucideIcon, Settings } from "lucide-react-native";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
} from "react-native";

export type MenuItem = {
  name: string;
  icon: LucideIcon;
  href: Href;
};

export type UserProfile = {
  name: string;
  role: string;
  image: ImageSourcePropType;
};

type NavigationMenuProps = {
  onClose?: () => void;
  menuItems: MenuItem[];
  userProfile: UserProfile;
};

export default function NavigationMenu({
  onClose,
  menuItems,
  userProfile,
}: NavigationMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#09090B] ">
      {/* Menu Items */}
      <ScrollView 
        className="flex-1 px-6" 
        style={{ paddingTop: 40 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={true}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} asChild>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onClose?.()}
                className={`flex-row items-center py-5 px-4 rounded-2xl mb-2 ${
                  isActive ? "bg-[#1D1D1D]" : "bg-transparent"
                }`}
              >
                <item.icon
                  size={22}
                  color={isActive ? "#ffffffff" : "#A1A1AA"}
                  strokeWidth={2}
                />
                <Text
                  className={`ml-4 text-base font-noto ${
                    isActive ? "text-white font-noto" : "text-[#A1A1AA]"
                  }`}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>

      {/* Bottom Profile Section */}
      <View className="p-4 space-y-4 pb-12 bg-[#18181B]/30 border-t border-white/5">
        <View className="rounded-2xl p-4 flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onClose?.()}
            className="flex-row items-center flex-1"
          >
            <View className="w-12 h-12 rounded-full bg-[#27272A] items-center justify-center overflow-hidden border border-white/20">
              <Image
                source={userProfile.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
            <View className="ml-3 flex-1">
              <Text
                className="text-white font-noto font-semibold text-md"
                numberOfLines={1}
              >
                {userProfile.name}
              </Text>
              <Text className="text-[#A1A1AA] text-xs font-noto">
                {userProfile.role}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onClose?.()}
            className="p-4"
            style={{ backgroundColor: "#1D1D1D", borderRadius: 50 }}
          >
            <Settings size={20} color="#9F9FA9" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.replace("/(auth)/login")}
        >
          <LinearGradient
            colors={["#fb2c361A", "#E7000B1A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogOut size={20} color="#FF6467" />
            <Text
              style={{
                marginLeft: 12,
                color: "#FF6467",
                fontWeight: "600",
                fontSize: 16,
              }}
              className="font-noto"
            >
              Logout
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
