import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const data = [
  { value: 15, color: "#D4AF37" },
  { value: 30, color: "#A16207" },
  { value: 26, color: "#18181B" },
];

export default function PerformanceDistribtuionChart() {
  return (
    <>
      <PieChart data={data} donut innerRadius={82} showTooltip />
      {/* Legend */}
      <View className="flex-row gap-2 flex-wrap justify-center items-center px-4">
        <View className="flex-row items-center gap-2">
          <View className="h-4 w-4 bg-[#D4AF37] rounded-full" />
          <Text className="font-noto-bold text-zinc-900">Excellent</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="h-4 w-4 bg-[#18181B] rounded-full" />
          <Text className="font-noto-bold text-zinc-900">Good</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="h-4 w-4 bg-[#A16207] rounded-full" />
          <Text className="font-noto-bold text-zinc-900">Needs Attention</Text>
        </View>
      </View>
    </>
  );
}
