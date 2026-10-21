import { LinearGradient } from "expo-linear-gradient";
import { Href, Link, usePathname, useRouter } from "expo-router";
import {
  LogOut,
  LucideIcon,
  User,
} from "lucide-react-native";
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
  href: any;
};

export type UserProfile = {
  name: string;
  role: string;
  image: ImageSourcePropType;
};

type StudentNavigationMenuProps = {
  onClose?: () => void;
  quickAccessItems: MenuItem[];
  accountItems: MenuItem[];
  userProfile: UserProfile;
};

export default function StudentNavigationMenu({
  onClose,
  quickAccessItems,
  accountItems,
  userProfile,
}: StudentNavigationMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const renderItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    return (
      <Link key={item.name} href={item.href} asChild>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClose?.()}
          className="flex-row items-center py-4 pl-8 mb-1"
          style={
            isActive
              ? { borderRightWidth: 4, borderRightColor: "#EAB308" }
              : { borderRightWidth: 4, borderRightColor: "transparent" }
          }
        >
          <item.icon
            size={19}
            color={isActive ? "#EAB308" : "#52525B"}
            strokeWidth={2}
          />
          <Text
            className={`ml-4 text-sm font-noto ${isActive ? "text-[#EAB308] font-noto-bold" : "text-[#52525B] font-noto-bold"
              }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        style={{ paddingTop: 60 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={true}
      >
        <Text className="text-2xl font-noto-bold text-[#09090B] px-8 mb-8">Menu</Text>

        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] px-8 mb-2 tracking-widest uppercase">
          Quick Access
        </Text>
        {quickAccessItems.map(renderItem)}

        <View className="h-6" />

        <Text className="text-[10px] font-noto-bold text-[#A1A1AA] px-8 mb-2 tracking-widest uppercase">
          Account
        </Text>
        {accountItems.map(renderItem)}
      </ScrollView>

      {/* Bottom Profile Section */}
      <View className="p-6 bg-white">
        <LinearGradient
          colors={["#EAB308", "rgba(234, 179, 8, 0.1)", "#27272A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 29, padding: 1.5 }}
        >
          <View className="rounded-[28px] p-4 bg-white shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center overflow-hidden">
                  <Image
                    source={userProfile.image}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-[#09090B] font-noto-bold text-base" numberOfLines={1}>
                    {userProfile.name}
                  </Text>
                  <Text className="text-[#71717A] text-xs font-noto">
                    {userProfile.role}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                className="flex-1 flex-row items-center justify-center py-2.5"
              >
                <User size={16} color="#52525B" />
                <Text className="ml-2 text-[#52525B] font-noto-bold text-sm">Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace("/(auth)/login")}
                className="flex-1 flex-row items-center justify-center py-2.5 rounded-2xl bg-rose-50 border border-rose-200"
              >
                <LogOut size={16} color="#F43F5E" />
                <Text className="ml-2 text-[#F43F5E] font-noto-bold text-sm">Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
