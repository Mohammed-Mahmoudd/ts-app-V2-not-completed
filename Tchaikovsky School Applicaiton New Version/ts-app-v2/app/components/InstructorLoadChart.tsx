import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const data = [
  {
    label: "Sarah J.",
    value: 29,
    frontColor: "#D4AF37",
  },
  {
    label: "David L.",
    value: 21,
    frontColor: "#D4AF37",
  },
  {
    label: "Hussien M.",
    value: 32,
    frontColor: "#18181B",
  },
  {
    label: "Maria K.",
    value: 18,
    frontColor: "#D4AF37",
  },
];

export default function InstructorLoadChart() {
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
      horizontal
      barWidth={19}
      labelsDistanceFromXaxis={55}
      labelsExtraHeight={30}
      barBorderTopRightRadius={6}
      barBorderTopLeftRadius={6}
      frontColor="#D4AF37"
      stepValue={8}
      maxValue={32}
      yAxisThickness={0}
      xAxisThickness={0}
      yAxisTextStyle={{
        fontWeight: "bold",
      }}
      xAxisLabelTextStyle={{
        fontWeight: "bold",
        fontSize: 14,
        width: 80,
        overflow: "visible",
        textAlign: "right",
      }}
    />
  );
}
