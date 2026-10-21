import { Image } from "expo-image";
import {
  ChevronLeft,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  uploadedBy: string;
}

interface Subfolder {
  id: string;
  name: string;
  description: string;
  files: FileItem[];
}

interface Folder {
  id: string;
  name: string;
  description: string;
  subfolders: Subfolder[];
}

const MOCK_FOLDERS: Folder[] = [
  {
    id: "f1",
    name: "Classical Pieces",
    description: "Bach, Beethoven, and Mozart essentials.",
    subfolders: [
      {
        id: "sf1",
        name: "Piano Sonatas",
        description: "Standard grade 5-8 pieces.",
        files: [
          {
            id: "fi1",
            name: "Moonlight Sonata.pdf",
            type: "PDF Document",
            size: "2.4MB",
            date: "Jan 28, 2024",
            uploadedBy: "Hussien M.",
          },
          {
            id: "fi2",
            name: "Für Elise.pdf",
            type: "PDF Document",
            size: "1.1MB",
            date: "Jan 25, 2024",
            uploadedBy: "Laila S.",
          },
        ],
      },
      {
        id: "sf2",
        name: "Violin Concertos",
        description: "Advanced solo repertoire.",
        files: [],
      },
    ],
  },
  {
    id: "f2",
    name: "Modern Pop",
    description: "Contemporary hits for piano and guitar.",
    subfolders: [],
  },
  {
    id: "f3",
    name: "Jazz Standards",
    description: "Real Book essentials and improvisations.",
    subfolders: [],
  },
];

export default function Materials() {
  const [activeTab, setActiveTab] = useState("Folder");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [currentSubfolder, setCurrentSubfolder] = useState<Subfolder | null>(
    null,
  );

  const tabs = ["Folder", "Subfolder", "Files"];

  const goBack = () => {
    if (currentSubfolder) {
      setCurrentSubfolder(null);
      setActiveTab("Subfolder");
    } else if (currentFolder) {
      setCurrentFolder(null);
      setActiveTab("Folder");
    }
  };

  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-noto-bold text-[#18181B]">
            Music Sheets
          </Text>
          {(currentFolder || currentSubfolder) && (
            <TouchableOpacity
              onPress={goBack}
              className="p-2 bg-[#F4F4F5] rounded-full"
            >
              <ChevronLeft size={20} color="#18181B" />
            </TouchableOpacity>
          )}
        </View>
        <Text className="text-[#71717B] font-noto text-base mt-1">
          Manage & distribute sheet music.
        </Text>
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-[#18181B] w-full py-4 rounded-2xl flex-row shadow-2xl shadow-[#18181B]/20 items-center justify-center mb-8 gap-3"
      >
        <Plus size={18} color="white" strokeWidth={2} />
        <Text className="text-white font-noto-bold text-base">
          Upload New Files
        </Text>
      </TouchableOpacity>

      {/* Filter and Search Container */}
      <View className="bg-white border border-[#F4F4F5] border-[1.2px] rounded-[32px] p-5 shadow-sm">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="flex-1 flex-row items-center border border-[#E4E4E7] rounded-2xl px-4 py-3">
            <Search size={20} color="#A1A1AA" />
            <TextInput
              placeholder="Search sheets..."
              placeholderTextColor="#A1A1AA"
              className="flex-1 ml-3 font-noto text-base text-[#18181B] leading-tight"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="p-3.5 border border-[#E4E4E7] rounded-2xl">
            <SlidersHorizontal size={22} color="#18181B" />
          </TouchableOpacity>
        </View>

        {/* Category Selection Tabs */}
        <View className="flex-row p-1 rounded-2xl bg-[#F4F4F5]">
          {tabs.map((tab) => {
            const isDisabled =
              (tab === "Subfolder" && !currentFolder) ||
              (tab === "Files" && !currentSubfolder);

            return (
              <TouchableOpacity
                key={tab}
                onPress={() => !isDisabled && setActiveTab(tab)}
                disabled={isDisabled}
                className="flex-1 items-center py-3 rounded-xl"
                style={
                  activeTab === tab
                    ? {
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "#E4E4E7",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }
                    : {
                        backgroundColor: "transparent",
                        opacity: isDisabled ? 0.4 : 1,
                      }
                }
              >
                <Text
                  className={`text-sm font-noto ${
                    activeTab === tab
                      ? "text-[#18181B] font-noto-bold"
                      : "text-[#71717A]"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Items Count Summary */}
      <View className="flex-row justify-between items-center mt-8 px-1">
        <Text className="text-xl font-noto-bold text-[#18181B]">
          {activeTab} Selection
        </Text>
        <Text className="text-sm font-noto-bold text-[#9F9FA9]">
          {activeTab === "Folder"
            ? MOCK_FOLDERS.length
            : activeTab === "Subfolder"
              ? currentFolder?.subfolders.length
              : currentSubfolder?.files.length}{" "}
          {activeTab === "Files" ? "SHEETS" : activeTab.toUpperCase() + "S"}
        </Text>
      </View>

      {/* Grid List */}
      <View className="flex-row flex-wrap gap-4 mt-4">
        {/* Render Folders */}
        {activeTab === "Folder" && (
          <>
            {MOCK_FOLDERS.map((folder) => (
              <TouchableOpacity
                key={folder.id}
                onPress={() => {
                  setCurrentFolder(folder);
                  setActiveTab("Subfolder");
                }}
                className="w-[47.5%] bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="p-2.5  rounded-2xl">
                    <Image
                      source={require("../../../assets/admin/folder.svg")}
                      style={{ width: 80, height: 80 }}
                      contentFit="contain"
                    />
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                </View>
                <Text className="text-lg font-noto-bold text-[#18181B] mb-1">
                  {folder.name}
                </Text>
                <Text
                  className="text-xs text-[#71717B] font-noto mb-4"
                  numberOfLines={2}
                >
                  {folder.description}
                </Text>
                <View className="flex-row items-center gap-1.5 pt-4 ">
                  <FileText size={14} color="#A1A1AA" />
                  <Text className="text-xs font-noto-bold text-[#71717A]">
                    {folder.subfolders.length} subfolders
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Add Folder Card */}
            <TouchableOpacity className="w-[47.5%] bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="p-2.5 rounded-2xl">
                  <View className="w-20 h-20 bg-[#FFFDF8] border border-2 border-dashed border-[#FFF2D8] rounded-2xl items-center justify-center">
                    <Plus size={32} color="#71717A" strokeWidth={1.5} />
                  </View>
                </View>
                <TouchableOpacity>
                  <MoreHorizontal size={20} color="#A1A1AA" />
                </TouchableOpacity>
              </View>

              <Text className="text-lg font-noto-bold text-[#18181B] mb-1">
                Add New Folder
              </Text>
              <Text
                className="text-xs text-[#71717B] font-noto mb-4"
                numberOfLines={2}
              >
                Create a new folder to organize your music sheets
              </Text>

              <View className="flex-row items-center gap-1.5 pt-4">
                <FileText size={14} color="#A1A1AA" />
                <Text className="text-xs font-noto-bold text-[#71717A]">
                  0 subfolders
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {/* Render Subfolders */}
        {activeTab === "Subfolder" && currentFolder && (
          <>
            {currentFolder.subfolders.map((sf) => (
              <TouchableOpacity
                key={sf.id}
                onPress={() => {
                  setCurrentSubfolder(sf);
                  setActiveTab("Files");
                }}
                className="w-[47.5%] bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm"
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="p-2.5 rounded-2xl">
                    <Image
                      source={require("../../../assets/admin/subfolder.svg")}
                      style={{ width: 80, height: 80 }}
                      contentFit="contain"
                    />
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#A1A1AA" />
                  </TouchableOpacity>
                </View>
                <Text className="text-lg font-noto-bold text-[#18181B] mb-1">
                  {sf.name}
                </Text>
                <Text
                  className="text-xs text-[#71717B] font-noto mb-4"
                  numberOfLines={2}
                >
                  {sf.description}
                </Text>
                <View className="flex-row items-center gap-1.5 pt-4">
                  <FileText size={14} color="#A1A1AA" />
                  <Text className="text-xs font-noto-bold text-[#71717A]">
                    {sf.files.length} files
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Add Subfolder Card */}
            <TouchableOpacity className="w-[47.5%] bg-white border border-[#F4F4F5] rounded-[32px] p-5 shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="p-2.5 rounded-2xl">
                  <View className="w-20 h-20 bg-[#FFFDF8] border border-2 border-dashed border-[#FFF2D8] rounded-2xl items-center justify-center">
                    <Plus size={32} color="#71717A" strokeWidth={1.5} />
                  </View>
                </View>
                <TouchableOpacity>
                  <MoreHorizontal size={20} color="#A1A1AA" />
                </TouchableOpacity>
              </View>

              <Text className="text-lg font-noto-bold text-[#18181B] mb-1">
                Add New Subfolder
              </Text>
              <Text
                className="text-xs text-[#71717B] font-noto mb-4"
                numberOfLines={2}
              >
                Create a new subfolder to categorize your sheets
              </Text>

              <View className="flex-row items-center gap-1.5 pt-4">
                <FileText size={14} color="#A1A1AA" />
                <Text className="text-xs font-noto-bold text-[#71717A]">
                  0 files
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        {/* Render Files */}
        {activeTab === "Files" && currentSubfolder && (
          <View className="w-full gap-4">
            {currentSubfolder.files.map((file) => (
              <View
                key={file.id}
                className="bg-white border border-[#F4F4F5] rounded-[32px] p-5 gap-4 shadow-sm"
              >
                {/* Preview and File Details Row */}
                <View className="flex-row gap-4">
                  {/* Preview Placeholder */}
                  <View className="w-32 h-40 rounded-2xl overflow-hidden">
                    <Image
                      source={require("../../../assets/admin/preview.png")}
                      className="w-[100%] h-[100%]"
                    />
                  </View>

                  {/* File Details - Centered */}
                  <View className="flex-1 justify-center">
                    {/* Title and Menu */}
                    <View className="flex-row justify-between items-start mb-3">
                      <Text
                        className="text-lg font-noto-bold text-[#18181B] flex-1 mr-2"
                        numberOfLines={2}
                      >
                        {file.name}
                      </Text>
                      <TouchableOpacity>
                        <MoreHorizontal size={18} color="#A1A1AA" />
                      </TouchableOpacity>
                    </View>

                    {/* File Metadata */}
                    <View className="gap-2">
                      <View className="flex-row items-center">
                        <Text className="text-sm text-[#9F9FA9] font-noto w-24">
                          Type:
                        </Text>
                        <Text className="text-sm text-[#18181B] font-noto-bold">
                          {file.type}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-sm text-[#9F9FA9] font-noto w-24">
                          Date:
                        </Text>
                        <Text className="text-sm text-[#18181B] font-noto-bold">
                          {file.date}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-sm text-[#9F9FA9] font-noto w-24">
                          Uploaded by:
                        </Text>
                        <Text className="text-sm text-[#18181B] font-noto-bold">
                          {file.uploadedBy}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Preview Button - Full Width Row */}
                <TouchableOpacity className="bg-[#FEFAF2] border border-[#F4EEDC] py-2.5 rounded-xl items-center">
                  <Text className="text-[#92400E] font-noto-bold text-xs uppercase tracking-wider">
                    Preview
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
