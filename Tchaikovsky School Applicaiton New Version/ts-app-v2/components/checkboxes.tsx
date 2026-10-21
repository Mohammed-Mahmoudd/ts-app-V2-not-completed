import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export default function Checkboxes({
  title,
  options,
  selectedOptions,
  onSelectionChange,
}: {
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selection: string[]) => void;
}) {
  const selected = selectedOptions || [];

  const toggleSelect = (option: string) => {
    const newSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onSelectionChange(newSelection);
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
        {title}
      </Text>
      <View className="flex-row flex-wrap">
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => toggleSelect(option)}
            className="mb-2 w-1/2 flex-row items-center gap-2"
          >
            <Ionicons
              name="checkmark-outline"
              size={20}
              color="white"
              className={`rounded-md border-2 p-0.5 text-center ${selected.includes(option) ? 'border-black bg-black' : 'border-zinc-300'}`}
            />
            <Text className="text-md text-gray-700">{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
