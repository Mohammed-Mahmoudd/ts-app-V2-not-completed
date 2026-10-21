import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpRoleScreen: React.FC = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | null>(null);

  const handleContinue = () => {
    if (selectedRole === 'instructor') {
      router.push({
        pathname: '/(auth)/signup-instructor',
        params: { role: selectedRole },
      });
    } else if (selectedRole === 'student') {
      router.push({
        pathname: '/(auth)/signup-student',
        params: { role: selectedRole },
      });
    }
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <View className="flex-1 justify-between px-6 py-8">
            {/* Top Section */}
            <View>
              {/* Logo and Title */}
              <View className="mb-8 flex-row items-center pt-4">
                <Image
                  source={require('../../assets/logo.png')}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <Text
                  className="mt-3 text-[#030303]"
                  style={{
                    fontFamily: 'NotoSerif_700Bold',
                    fontSize: 24,
                    letterSpacing: 0.5,
                  }}
                >
                  Tchaikovsky
                </Text>
              </View>

              {/* Welcome Text */}
              <View className="mb-10">
                <Text
                  className="mb-8 text-lg text-[#030303]"
                  style={{
                    fontFamily: 'NotoSerif_700Bold',
                    letterSpacing: -0.5,
                  }}
                >
                  We Are Happy to have you here
                </Text>
                <Text
                  className="text-3xl text-[#030303]"
                  style={{
                    fontFamily: 'NotoSerif_700Bold',
                  }}
                >
                  Are You Student or Instructor?
                </Text>
              </View>

              {/* Role Selection */}
              <View className="mb-8 flex-row justify-between" style={{ gap: 16 }}>
                {/* Student Option */}
                <TouchableOpacity
                  onPress={() => setSelectedRole('student')}
                  activeOpacity={0.7}
                  className="flex-1 items-center justify-center rounded-3xl py-8"
                  style={{
                    backgroundColor: selectedRole === 'student' ? '#030303' : '#F5F5F5',
                    borderWidth: 2,
                    borderColor: selectedRole === 'student' ? '#030303' : 'transparent',
                  }}
                >
                  <Ionicons name="school-outline" size={48} color={selectedRole === 'student' ? 'white' : '#030303'} />
                  <Text
                    className="mt-4"
                    style={{
                      fontFamily: 'NotoSerif_600SemiBold',
                      fontSize: 16,
                      color: selectedRole === 'student' ? 'white' : '#030303',
                    }}
                  >
                    Student
                  </Text>
                </TouchableOpacity>

                {/* Instructor Option */}
                <TouchableOpacity
                  onPress={() => setSelectedRole('instructor')}
                  activeOpacity={0.7}
                  className="flex-1 items-center justify-center rounded-3xl py-8"
                  style={{
                    backgroundColor: selectedRole === 'instructor' ? '#030303' : '#F5F5F5',
                    borderWidth: 2,
                    borderColor: selectedRole === 'instructor' ? '#030303' : 'transparent',
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={48}
                    color={selectedRole === 'instructor' ? 'white' : '#030303'}
                  />
                  <Text
                    className="mt-4"
                    style={{
                      fontFamily: 'NotoSerif_600SemiBold',
                      fontSize: 16,
                      color: selectedRole === 'instructor' ? 'white' : '#030303',
                    }}
                  >
                    Instructor
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Continue Button */}
              {selectedRole && (
                <TouchableOpacity
                  onPress={handleContinue}
                  disabled={!selectedRole}
                  className="rounded-full py-5"
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: selectedRole ? '#030303' : '#E5E5E5',
                    shadowColor: '#030303',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: selectedRole ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: selectedRole ? 4 : 0,
                  }}
                >
                  <Text
                    className="text-center font-semibold"
                    style={{
                      fontFamily: 'NotoSerif',
                      fontSize: 18,
                      letterSpacing: 0.5,
                      color: selectedRole ? 'white' : '#999',
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Bottom Section */}
            <View className="mb-10 mt-10 flex-row items-center justify-center">
              <Text
                className="text-[#030303] opacity-60"
                style={{
                  fontFamily: 'NotoSerif',
                  fontSize: 15,
                }}
              >
                Have an account already?{' '}
              </Text>
              <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
                <Text
                  className="text-[#030303]"
                  style={{
                    fontFamily: 'NotoSerif_700Bold',
                    fontSize: 15,
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUpRoleScreen;
