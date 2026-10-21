import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface ModelProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  title?: string;
  buttonText?: string;
  imageSource?: ImageSourcePropType;
  icon?: React.ReactNode;
}

const Model: React.FC<ModelProps> = ({
  visible,
  message,
  onClose,
  title = 'Success!',
  buttonText = 'OK',
  imageSource,
  icon,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
    >
      <View className="mx-4 items-center rounded-3xl bg-white p-8">
        {/* Image or Icon */}
        {icon ? (
          <View className="mb-6">{icon}</View>
        ) : (
          <Image
            source={imageSource || require('../assets/images/Okay.png')}
            style={{ width: 120, height: 120, marginBottom: 24 }}
            resizeMode="contain"
          />
        )}

        {/* Title */}
        <Text
          className="mb-3 text-center text-[#030303]"
          style={{
            fontFamily: 'NotoSerif_700Bold',
            fontSize: 24,
            letterSpacing: -0.3,
          }}
        >
          {title}
        </Text>

        {/* Message */}
        <Text
          className="mb-8 text-center text-[#030303] opacity-70"
          style={{
            fontFamily: 'NotoSerif',
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {message}
        </Text>

        {/* OK Button */}
        <TouchableOpacity
          onPress={onClose}
          className="w-full rounded-full py-4"
          activeOpacity={0.85}
          style={{
            backgroundColor: '#030303',
            shadowColor: '#030303',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            className="text-center font-semibold text-white"
            style={{
              fontFamily: 'NotoSerif_600SemiBold',
              fontSize: 18,
              letterSpacing: 0.5,
            }}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Model;
