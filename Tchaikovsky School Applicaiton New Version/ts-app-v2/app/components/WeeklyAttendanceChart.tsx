import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const data = [
  {
    value: 41,
    label: "Mon",
    spacing: 0,
  },
  {
    value: 4,
    frontColor: "#18181B",
  },
  {
    value: 30,
    label: "Tue",
    spacing: 0,
  },
  {
    value: 8,
    frontColor: "#18181B",
  },
  {
    value: 45,
    label: "Wed",
    spacing: 0,
  },
  {
    value: 1,
    frontColor: "#18181B",
  },
  {
    value: 34,
    label: "Thu",
    spacing: 0,
  },
  {
    value: 3,
    frontColor: "#18181B",
  },
  {
    value: 50,
    label: "Fri",
    spacing: 0,
  },
  {
    value: 2,
    frontColor: "#18181B",
  },
  {
    value: 60,
    label: "Sat",
    spacing: 0,
  },
  {
    value: 0,
    frontColor: "#18181B",
  },
];

export default function WeeklyAttendanceChart() {
  return (
    <BarChart
      data={data}
      renderTooltip={(tooltipData: any) => {
        return (
          <View className="flex-row items-center gap-2">
            <Text className="font-noto-bold text-zinc-900">
              {tooltipData.value}
            </Text>
          </View>
        );
      }}
      barWidth={19}
      initialSpacing={0}
      isAnimated
      spacing={4.25}
      labelWidth={37}
      barBorderRadius={6}
      frontColor="#D4AF37"
      stepValue={15}
      maxValue={60}
      yAxisThickness={0}
      xAxisThickness={0}
      yAxisTextStyle={{
        fontWeight: "bold",
      }}
      xAxisLabelTextStyle={{
        fontWeight: "bold",
      }}
    />
  );
}
