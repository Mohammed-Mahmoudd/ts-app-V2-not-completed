import { LucideChevronDown } from "lucide-react-native";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function CustomDropdown({
  data,
  placeholder,
  setValue,
  value,
  className,
}: {
  data: { label: string; value: string | null }[];
  placeholder: string;
  setValue: (value: string) => void;
  value: string | null;
  className?: string;
}) {
  return (
    <View className={`border border-zinc-200 rounded-2xl flex-1 ${className}`}>
      <Dropdown
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        data={data}
        maxHeight={300}
        flatListProps={{
          style: {
            borderRadius: 16,
          },
        }}
        containerStyle={{
          borderRadius: 16,
          elevation: 200,
        }}
        labelField="label"
        valueField="value"
        dropdownPosition="auto"
        placeholderStyle={{
          color: "#717182",
          fontFamily: "NotoSerif-Bold",
          fontSize: 12,
        }}
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderRightIcon={() => <LucideChevronDown color="#717182" size={20} />}
      />
    </View>
  );
}
