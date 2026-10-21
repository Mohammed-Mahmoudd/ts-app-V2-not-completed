import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function TimeInput({
  setValue,
}: {
  setValue: (value: Date) => void;
}) {
  const [hour, setHour] = useState<string>();
  const [minute, setMinute] = useState<string>();
  const [period, setPeriod] = useState<"AM" | "PM">();

  const minuteRef = useRef<TextInput>(null);

  // Convert to Date object if needed
  const getTime = () => {
    let h = Number(hour);
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    const now = new Date();
    now.setHours(h, Number(minute), 0, 0);
    return now;
  };

  return (
    <View className="flex-row items-center border border-zinc-100 rounded-2xl px-2 bg-zinc-50 flex-1">
      {/* Hour */}
      <TextInput
        keyboardType="number-pad"
        maxLength={2}
        value={hour}
        placeholder="HH"
        onChangeText={(text) => {
          setHour(text);
          if (text.length === 2) {
            minuteRef.current?.focus();
          }
        }}
        onBlur={() => {
          // Remove non-digit characters
          let n = hour?.replace(/\D/g, "") || "";
          // Allow empty input (user deleting)
          if (n === "") {
            setHour("");
            return;
          }
          // Clamp to 1-12
          let num = Math.min(Math.max(Number(n), 1), 12);
          setHour(num.toString());
          setValue(getTime());
        }}
      />

      <Text>:</Text>

      {/* Minute */}
      <TextInput
        ref={minuteRef}
        keyboardType="number-pad"
        maxLength={2}
        value={minute}
        placeholder="MM"
        onChangeText={(text) => {
          setMinute(text);
        }}
        onBlur={() => {
          let n = minute?.replace(/\D/g, "") || "";
          if (n === "") {
            setMinute("");
            return;
          }
          // Allow typing up to 59
          let num = Math.min(Number(n), 59);
          setMinute(num.toString());
          // Pad single digits with leading 0 on blur
          if (minute?.length === 1) setMinute(minute.padStart(2, "0"));
          setValue(getTime());
        }}
      />

      {/* Spacer */}
      <View className="flex-1" />

      {/* AM/PM toggle */}
      <View className="flex-row gap-2">
        <Pressable onPress={() => setPeriod("AM")}>
          <Text
            className={
              period === "AM" ? "text-zinc-900 font-semibold" : "text-gray-500"
            }
          >
            AM
          </Text>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => setPeriod("PM")}>
          <Text
            className={
              period === "PM" ? "text-zinc-900 font-semibold" : "text-gray-500"
            }
          >
            PM
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
