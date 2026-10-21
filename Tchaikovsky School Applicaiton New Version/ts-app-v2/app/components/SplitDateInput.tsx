import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function SplitDateInput({
  setValue,
}: {
  setValue: (value: Date | null) => void;
}) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);

  // Convert to Date object
  const getDate = () => {
    if (year.length === 4 && month && day) {
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return null;
  };

  return (
    <View className="flex-row items-center border border-zinc-100 rounded-2xl bg-zinc-50 px-2">
      {/* Year */}
      <TextInput
        className="placeholder:text-gray-500 text-zinc-900"
        keyboardType="number-pad"
        maxLength={4}
        placeholder="YYYY"
        value={year}
        onChangeText={(text) => {
          setYear(text);
          setValue(getDate());
          if (text.length === 4) monthRef.current?.focus();
        }}
      />
      <Text className="text-gray-500">/</Text>

      {/* Month */}
      <TextInput
        className="placeholder:text-gray-500 text-zinc-900"
        ref={monthRef}
        keyboardType="number-pad"
        maxLength={2}
        placeholder="MM"
        value={month}
        onChangeText={(text) => {
          setMonth(text);
          if (text.length === 2) dayRef.current?.focus();
        }}
      />
      <Text className="text-gray-500">/</Text>

      {/* Day */}
      <TextInput
        className="placeholder:text-gray-500 text-zinc-900 grow"
        ref={dayRef}
        keyboardType="number-pad"
        maxLength={2}
        placeholder="DD"
        value={day}
        onChangeText={setDay}
      />
    </View>
  );
}
