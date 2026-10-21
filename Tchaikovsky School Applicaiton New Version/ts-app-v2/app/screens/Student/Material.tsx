import {
  Check,
  Circle,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FilterMode = "All" | "Studied" | "To Study";

type Sheet = {
  id: number;
  title: string;
  type: string;
  date: string;
  uploadedBy: string;
  status: "Studied" | "To Study";
  showMenu?: boolean;
};

const sheets: Sheet[] = [
  {
    id: 1,
    title: "Remember me",
    type: "Piano",
    date: "Aug 19, 2025",
    uploadedBy: "Admin",
    status: "Studied",
    showMenu: true,
  },
  {
    id: 2,
    title: "Remember me",
    type: "Piano",
    date: "Aug 19, 2025",
    uploadedBy: "Admin",
    status: "Studied",
  },
  {
    id: 3,
    title: "Remember me",
    type: "Piano",
    date: "Aug 19, 2025",
    uploadedBy: "Admin",
    status: "To Study",
  },
  {
    id: 4,
    title: "Remember me",
    type: "Piano",
    date: "Aug 19, 2025",
    uploadedBy: "Admin",
    status: "To Study",
  },
];

export default function Material() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>("All");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-noto-bold text-[#09090B]">
            Music Sheets
          </Text>
          <Text className="text-sm text-[#71717A] font-noto mt-1">
            Manage & distribute sheet music.
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center justify-center gap-2 bg-[#18181B] py-3 rounded-[14px] mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Upload size={14} color="#FFFFFF" />
          <Text className="text-[14px] font-noto-bold text-white">
            Upload Sheets
          </Text>
        </TouchableOpacity>

        {/* Filter Card */}
        <View
          className="bg-white rounded-[24px] p-4 mb-6 border border-[#F4F4F5]"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
          }}
        >
          {/* View Toggle */}
          <View
            className="flex-row bg-[#FAFAFA] border border-[#F4F4F5] rounded-[16px] p-1 mb-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            {(["All", "Studied", "To Study"] as FilterMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(mode)}
                className={`flex-1 items-center justify-center py-2.5 rounded-[12px] ${activeFilter === mode ? "bg-white" : "bg-transparent"
                  }`}
                style={
                  activeFilter === mode
                    ? {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.06,
                      shadowRadius: 4,
                      elevation: 2,
                    }
                    : {}
                }
              >
                <Text
                  className={`text-[12px] font-noto-bold ${activeFilter === mode ? "text-[#09090B]" : "text-[#A1A1AA]"
                    }`}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Search & Filter Row */}
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-white border border-[#F4F4F5] rounded-[16px] px-3 py-2 flex-1">
              <Search size={14} color="#A1A1AA" />
              <TextInput
                placeholder="Search sheets..."
                placeholderTextColor="#A1A1AA"
                className="flex-1 ml-2 text-xs font-noto text-[#09090B]"
              />
            </View>
            <TouchableOpacity className="w-10 h-10 bg-white border border-[#F4F4F5] rounded-[14px] items-center justify-center ml-2">
              <Filter size={16} color="#A1A1AA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Header */}
        <View className="flex-row items-center justify-between mb-4 px-1">
          <Text className="text-lg font-noto-bold text-[#09090B]">Files</Text>
          <Text className="text-[10px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase">
            6 Sheets
          </Text>
        </View>

        {/* File Cards List */}
        <View className="gap-3">
          {sheets.map((sheet, index) => (
            <View
              key={sheet.id}
              className="bg-white border border-[#F4F4F5] rounded-[20px] p-3 z-10"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 10,
                elevation: 1,
                zIndex: sheets.length - index,
              }}
            >
              {/* Top Row: Image + Details */}
              <View className="flex-row gap-3 mb-3">
                {/* Left Image */}
                <View className="w-[100px] h-[100px] items-center justify-center overflow-hidden">
                  <Image
                    source={require("../../../assets/admin/Frame.png")}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </View>

                {/* Right Details */}
                <View className="flex-1 pt-0.5">
                  {/* Badge & Three Dots Row */}
                  <View className="flex-row items-center justify-between mb-1.5">
                    <View className="flex-row items-center gap-1.5">
                      {sheet.status === "Studied" ? (
                        <View className="w-[12px] h-[12px] rounded-full bg-[#FFF9F0] items-center justify-center">
                          <Check size={8} color="#D4AF37" strokeWidth={3} />
                        </View>
                      ) : (
                        <View className="w-[12px] h-[12px] rounded-full border border-[#D4AF37]" />
                      )}
                      <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase">
                        Studied
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => toggleMenu(sheet.id)}
                      className="w-9 h-9 items-center justify-center border border-[#F4F4F5] rounded-[10px]"
                    >
                      <MoreHorizontal size={18} color="#71717A" />
                    </TouchableOpacity>
                  </View>

                  {/* Title */}
                  <Text className="text-[14px] font-noto-bold text-[#09090B] mb-1.5">
                    {sheet.title}
                  </Text>

                  {/* Meta Info */}
                  <Text className="text-[11px] text-[#71717A] font-noto mb-0.5">
                    Type: {sheet.type}
                  </Text>
                  <Text className="text-[11px] text-[#71717A] font-noto mb-0.5">
                    {sheet.date}
                  </Text>
                  <Text className="text-[11px] text-[#71717A] font-noto">
                    Uploaded by: {sheet.uploadedBy}
                  </Text>
                </View>
              </View>

              {/* Bottom Preview Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-row items-center justify-center gap-1.5 bg-[#FCF8F2] py-2.5 rounded-[12px]"
              >
                <Eye size={14} color="#09090B" />
                <Text className="text-[13px] font-noto-bold text-[#09090B]">
                  Preview
                </Text>
              </TouchableOpacity>

              {/* Popup Menu */}
              {openMenuId === sheet.id && (
                <View
                  className="absolute top-[36px] right-[12px] w-[160px] bg-white rounded-[16px] border border-[#F4F4F5] p-1.5 py-2"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.08,
                    shadowRadius: 24,
                    elevation: 10,
                  }}
                >
                  <TouchableOpacity className="flex-row items-center gap-2.5 px-3 py-2">
                    <Share2 size={12} color="#52525B" />
                    <Text className="text-[12px] text-[#3F3F46] font-noto-bold">
                      Share
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2.5 px-3 py-2">
                    <Download size={12} color="#52525B" />
                    <Text className="text-[12px] text-[#3F3F46] font-noto-bold">
                      Download
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2.5 px-3 py-2">
                    <RefreshCw size={12} color="#52525B" />
                    <Text className="text-[12px] text-[#3F3F46] font-noto-bold">
                      Switch to Study
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-2.5 px-3 py-2 mt-0.5">
                    <Trash2 size={12} color="#F59E0B" />
                    <Text className="text-[12px] text-[#F59E0B] font-noto-bold">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
