import { Mail, MoreHorizontal, Search, UserPlus } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MOCK_PEOPLE = [
  {
    id: "1",
    name: "Omar Khalid",
    role: "Students",
    email: "omar.k@example.com",
    phone: "+966 50 123 4567",
    instrument: "Violin",
    status: "Active",
    level: "Grade 5",
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    role: "Students",
    email: "sarah.a@example.com",
    phone: "+966 50 234 5678",
    instrument: "Piano",
    status: "Active",
    level: "Grade 3",
  },
  {
    id: "3",
    name: "Hussien M.",
    role: "Instructors",
    email: "hussien.m@example.com",
    phone: "+966 50 345 6789",
    specialty: "Piano Specialist",
    currentStudents: 12,
    maxStudents: 20,
  },
  {
    id: "4",
    name: "Laila S.",
    role: "Instructors",
    email: "laila.s@example.com",
    phone: "+966 50 456 7890",
    specialty: "Violin Instructor",
    currentStudents: 18,
    maxStudents: 20,
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("Students");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Students", "Instructors"];

  const filteredPeople = MOCK_PEOPLE.filter((person) => {
    const matchesTab = person.role === activeTab;
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ScrollView
      className="flex-1 px-6 mt-6"
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-noto-bold text-[#18181B]">People</Text>
        <Text className="text-[#71717B] font-noto text-base mt-1">
          Manage your school{"'"}s community.
        </Text>
      </View>

      {/* Add User Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-[#18181B] w-full py-4 rounded-2xl flex-row shadow-2xl shadow-[#18181B]/20 items-center justify-center mb-8 gap-3"
      >
        <UserPlus size={18} color="white" strokeWidth={2} />
        <Text className="text-white font-noto-bold text-base">Add User</Text>
      </TouchableOpacity>

      {/* Filter and Search Container */}
      <View className="bg-white border border-[#F4F4F5] border-[1.2px] rounded-[32px] p-5 shadow-sm">
        {/* Tab Selection */}
        <View className="flex-row p-1 rounded-2xl mb-4 w-full ">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
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
                  : { backgroundColor: "transparent" }
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
          ))}
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center border border-[#E4E4E7] rounded-2xl px-4 py-3">
          <Search size={20} color="#A1A1AA" />
          <TextInput
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            placeholderTextColor="#A1A1AA"
            className="flex-1 ml-3 font-noto text-base text-[#18181B] leading-tight"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* People List */}
      <View className="mt-8 gap-4">
        {filteredPeople.length > 0 ? (
          filteredPeople.map((person) => (
            <View
              key={person.id}
              className="bg-white border border-[#F4F4F5] rounded-[32px] p-6 px-8 shadow-sm"
            >
              {/* Card Top: Profile & Name */}
              <View className="flex-row items-start gap-4 mb-5">
                <View className="bg-white shadow-lg rounded-full">
                  <View className="w-14 h-14 p-2 rounded-full bg-[#FEF3C6] items-center justify-center border border-[#FFFFFF]">
                    <Text className="text-[#18181B] font-noto-bold text-lg">
                      {getInitials(person.name)}
                    </Text>
                  </View>
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-noto-bold text-[#18181B]">
                      {person.name}
                    </Text>
                    <TouchableOpacity>
                      <MoreHorizontal size={20} color="#A1A1AA" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-base font-noto text-[#71717A] mt-0.5">
                    {activeTab === "Students"
                      ? person.instrument
                      : person.specialty}
                  </Text>
                </View>
              </View>

              {/* Card Content based on Role */}
              {activeTab === "Instructors" ? (
                <View className="gap-4 ">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-sm font-bold text-[#9F9FA9]">
                        Load
                      </Text>
                      <Text className="text-lg font-bold">
                        {person.currentStudents} student
                      </Text>
                    </View>
                    <View className="flex-[0.5] ml-6 h-2.5 bg-[#F4F4F5] rounded-full overflow-hidden">
                      <View
                        className={`h-full rounded-full ${person.currentStudents! < 15 ? "bg-[#10B981]" : "bg-[#EF4444]"}`}
                        style={{
                          width: `${(person.currentStudents! / person.maxStudents!) * 100}%`,
                        }}
                      />
                    </View>
                  </View>

                  <TouchableOpacity className="bg-[#18181B] py-4 rounded-[18px] items-center mt-2">
                    <Text className="text-white font-noto-bold text-base">
                      View Schedule
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View className="gap-6">
                  <View className="py-2 px-4 flex-row w-full">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-[#9F9FA9] mb-1">
                        Status
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <View className="w-2 h-2 rounded-full bg-[#00A63E]" />
                        <Text className="text-lg font-bold text-[#00A63E]">
                          {person.status}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-[#9F9FA9] mb-1">
                        Level
                      </Text>
                      <Text className="text-lg font-bold text-[#3F3F46]">
                        {person.level}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[#18181B] py-4 rounded-[18px] items-center">
                      <Text className="text-white font-noto-bold text-base">
                        View Profile
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="aspect-square p-4 border border-[#E4E4E7] rounded-[18px] items-center justify-center">
                      <Mail size={22} color="#18181B" strokeWidth={1.5} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className="py-10 items-center justify-center opacity-40">
            <Text className="font-noto text-[#71717A]">
              No {activeTab.toLowerCase()} found.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
