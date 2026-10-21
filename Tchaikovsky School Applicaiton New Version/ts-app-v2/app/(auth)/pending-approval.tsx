import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PendingApprovalScreen: React.FC = () => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          {/* Icon */}
          <View
            className="mb-8 h-32 w-32 items-center justify-center rounded-full"
            style={{ backgroundColor: '#FFF4E6' }}
          >
            <Ionicons name="time-outline" size={64} color="#FF9500" />
          </View>

          {/* Title */}
          <Text
            className="mb-4 text-center text-[#030303]"
            style={{
              fontFamily: 'NotoSerif_700Bold',
              fontSize: 32,
              letterSpacing: -0.5,
            }}
          >
            Account Under Review
          </Text>

          {/* Description */}
          <Text
            className="mb-8 text-center text-[#030303] opacity-70"
            style={{
              fontFamily: 'NotoSerif',
              fontSize: 18,
              lineHeight: 28,
            }}
          >
            We are working to get you inside the app with us. Your account is currently pending approval.
          </Text>

          {/* Additional Info */}
          <View className="mb-8 w-full rounded-2xl bg-gray-50 p-6">
            <View className="mb-4 flex-row items-start">
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={{ marginRight: 12 }} />
              <View className="flex-1">
                <Text
                  style={{
                    fontFamily: 'NotoSerif_600SemiBold',
                    fontSize: 16,
                    color: '#030303',
                  }}
                >
                  Account Created Successfully
                </Text>
                <Text
                  className="mt-1 opacity-60"
                  style={{
                    fontFamily: 'NotoSerif',
                    fontSize: 14,
                    color: '#030303',
                  }}
                >
                  Your registration has been received
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <Ionicons name="hourglass-outline" size={24} color="#FF9500" style={{ marginRight: 12 }} />
              <View className="flex-1">
                <Text
                  style={{
                    fontFamily: 'NotoSerif_600SemiBold',
                    fontSize: 16,
                    color: '#030303',
                  }}
                >
                  Awaiting Approval
                </Text>
                <Text
                  className="mt-1 opacity-60"
                  style={{
                    fontFamily: 'NotoSerif',
                    fontSize: 14,
                    color: '#030303',
                  }}
                >
                  Our team is reviewing your account
                </Text>
              </View>
            </View>
          </View>

          {/* Message */}
          <Text
            className="mb-8 text-center text-[#030303] opacity-60"
            style={{
              fontFamily: 'NotoSerif',
              fontSize: 15,
            }}
          >
            You will receive a notification once your account is approved. This usually takes 24-48 hours.
          </Text>

          {/* Back to Login Button */}
          <TouchableOpacity
            onPress={handleBackToLogin}
            className="w-full rounded-full py-5"
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
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PendingApprovalScreen;
