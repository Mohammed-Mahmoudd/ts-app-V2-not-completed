import { BarChart } from "react-native-gifted-charts";
import { Award, Star } from "lucide-react-native";
import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

const weeklyData = [
  { value: 45, frontColor: "#E4E4E7", label: "W1", labelTextStyle: { color: "#A1A1AA", fontSize: 11, fontFamily: "NotoSerif" } },
  { value: 60, frontColor: "#E4E4E7", label: "W2", labelTextStyle: { color: "#A1A1AA", fontSize: 11, fontFamily: "NotoSerif" } },
  { value: 35, frontColor: "#E4E4E7", label: "W3", labelTextStyle: { color: "#A1A1AA", fontSize: 11, fontFamily: "NotoSerif" } },
  { value: 50, frontColor: "#E4E4E7", label: "W4", labelTextStyle: { color: "#A1A1AA", fontSize: 11, fontFamily: "NotoSerif" } },
  { value: 90, frontColor: "#D4AF37", label: "W5", labelTextStyle: { color: "#A1A1AA", fontSize: 11, fontFamily: "NotoSerif" } },
];

const milestones = [
  { id: 1, title: "Level 1 Completion", subtitle: "Piano Fundamentals", progress: 100, completed: true },
  { id: 2, title: "Level 2 Completion", subtitle: "Piano Fundamentals", progress: 100, completed: true },
  { id: 3, title: "Level 3 Completion", subtitle: "Piano Fundamentals", progress: 100, completed: true },
  { id: 4, title: "Level 4 Completion", subtitle: "Advanced Theory", progress: 0, completed: false },
  { id: 5, title: "Level 5 Completion", subtitle: "Advanced Theory", progress: 0, completed: false },
];

export default function Progress() {
  const BAR_WIDTH = 40;
  const NUM_BARS = 5;
  // page padding 20*2=40, card padding 20*2=40
  const chartWidth = screenWidth - 80;
  // spacing = gap between bars (not before first). (total - all bars) / (gaps between bars)
  const barSpacing = Math.floor((chartWidth - NUM_BARS * BAR_WIDTH) / (NUM_BARS - 1));

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-[26px] font-noto-bold text-[#09090B]">
            My Progress
          </Text>
          <Text className="text-[13px] text-[#71717A] font-noto mt-1">
            Track your growth and achievements.
          </Text>
        </View>

        {/* Stat Cards Row */}
        <View className="flex-row gap-4 mb-5">
          {/* Completion Card */}
          <View
            className="flex-1 bg-[#18181B] rounded-[24px] p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }}
          >
            <Text className="text-[9px] font-noto-bold text-[#71717A] tracking-widest uppercase mb-3">
              COMPLETION
            </Text>
            <View className="flex-row items-baseline gap-2 mb-4">
              <Text className="text-[36px] font-noto-bold text-white leading-none">
                65%
              </Text>
              <Text className="text-[12px] font-noto text-[#71717A]">
                Term 1
              </Text>
            </View>
            {/* Progress Bar */}
            <View className="h-1.5 bg-[#3F3F46] rounded-full overflow-hidden">
              <View
                className="h-full bg-[#D4AF37] rounded-full"
                style={{ width: "65%" }}
              />
            </View>
          </View>

          {/* Avg Rating Card */}
          <View
            className="flex-1 bg-white border border-[#F4F4F5] rounded-[24px] p-5 items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.02,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 1,
            }}
          >
            <View className="w-11 h-11 bg-[#FCF8F2] rounded-full items-center justify-center mb-2.5">
              <Star size={18} color="#D4AF37" fill="#D4AF37" />
            </View>
            <Text className="text-[30px] font-noto-bold text-[#09090B] leading-none mb-1">
              4.8
            </Text>
            <Text className="text-[9px] font-noto-bold text-[#A1A1AA] tracking-widest uppercase">
              AVG RATING
            </Text>
          </View>
        </View>

        {/* Weekly Performance Chart */}
        <View
          className="bg-white border border-[#F4F4F5] rounded-[24px] p-5 mb-6"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.02,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
          }}
        >
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-[15px] font-noto-bold text-[#09090B]">
              Weekly Performance
            </Text>
            <View className="bg-[#FAFAFA] border border-[#F4F4F5] rounded-[10px] px-3 py-1.5">
              <Text className="text-[11px] font-noto-bold text-[#71717A]">
                Last 4 Weeks
              </Text>
            </View>
          </View>

          <BarChart
            data={weeklyData}
            width={chartWidth}
            height={140}
            barWidth={BAR_WIDTH}
            barBorderTopLeftRadius={10}
            barBorderTopRightRadius={10}
            spacing={barSpacing}
            initialSpacing={0}
            endSpacing={0}
            hideRules
            hideAxesAndRules
            noOfSections={3}
            maxValue={100}
            isAnimated
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisLabelWidth={0}
          />
        </View>

        {/* Session Milestones */}
        <View className="mb-6">
          <Text className="text-[16px] font-noto-bold text-[#09090B] mb-3">
            Session Milestones
          </Text>

          <View>
            {milestones.map((milestone, index) => (
              <View key={milestone.id}>
                <View className="flex-row items-center py-4">
                  {/* Icon */}
                  <View className="mr-4">
                    {milestone.completed ? (
                      <View className="w-9 h-9 rounded-full items-center justify-center bg-[#F0FDF4]">
                        <Award size={18} color="#16A34A" />
                      </View>
                    ) : (
                      <View className="w-9 h-9 rounded-full items-center justify-center bg-[#F4F4F5]">
                        <Award size={18} color="#D4D4D8" />
                      </View>
                    )}
                  </View>

                  {/* Title & Subtitle */}
                  <View className="flex-1">
                    <Text
                      className={`text-[13px] font-noto-bold mb-0.5 ${milestone.completed ? "text-[#09090B]" : "text-[#A1A1AA]"
                        }`}
                    >
                      {milestone.title}
                    </Text>
                    <Text
                      className={`text-[11px] font-noto ${milestone.completed ? "text-[#71717A]" : "text-[#D4D4D8]"
                        }`}
                    >
                      {milestone.subtitle}
                    </Text>
                  </View>

                  {/* Progress % */}
                  <Text
                    className={`text-[12px] font-noto-bold ${milestone.completed ? "text-[#D4AF37]" : "text-[#D4D4D8]"
                      }`}
                  >
                    {milestone.progress}%
                  </Text>
                </View>

                {/* Divider (except last) */}
                {index < milestones.length - 1 && (
                  <View className="h-[1px] bg-[#F4F4F5]" />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
