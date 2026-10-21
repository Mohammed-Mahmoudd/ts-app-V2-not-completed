import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

export default function DatePicker({
  title,
  value,
  onChange,
  maximumDate,
}: {
  title: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  maximumDate?: Date;
}) {
  const [date, setDate] = useState(value || new Date());
  const [show, setShow] = useState(false);

  const handleChange = (event: any, selected: any) => {
    setShow(false);
    if (selected) {
      setDate(selected);
      onChange?.(selected);
    }
  };

  const displayDate = value ? value.toLocaleDateString() : null;

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
        {title}
      </Text>

      <TouchableOpacity onPress={() => setShow(true)} className="rounded-lg border border-gray-300 bg-white p-3">
        <Text className={displayDate ? 'text-black' : 'text-gray-400'}>{displayDate || 'mm/dd/yyyy'}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={maximumDate || new Date()} // optional: prevent future dates
        />
      )}
    </View>
  );
}
