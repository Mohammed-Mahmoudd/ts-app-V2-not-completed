import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';

// Enable layout animation on Android
// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
// }

export default function Accordion({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="mb-3 rounded-lg border border-gray-300 bg-white">
      {/* Header */}
      <TouchableOpacity onPress={toggleExpand} className="flex-row items-center justify-between p-3">
        {/* <Text className="text-base font-semibold text-black">{title}</Text> */}
        {title}
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#555" />
      </TouchableOpacity>

      {/* Content */}
      {expanded && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
}
