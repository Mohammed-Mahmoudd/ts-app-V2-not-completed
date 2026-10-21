import { UserData } from '@/app/(auth)/signup-instructor';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthInfoForm({
  setIsFormValid,
  onInputChange,
  userData,
}: {
  setIsFormValid: (valid: boolean) => void;
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError('');
      return false;
    }

    // Check if phone starts with +
    if (!phone.startsWith('+')) {
      setPhoneError('Phone number must start with country code (e.g., +20)');
      return false;
    }

    // Check if phone has at least country code and some digits
    if (phone.length < 8) {
      setPhoneError('Phone number is too short');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('');
      return false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }

    setPasswordError('');
    return true;
  };

  useEffect(() => {
    const { phoneNumber, password, rePassword } = userData;

    const isPhoneValid = validatePhone(phoneNumber || '');
    const isPasswordValid = validatePassword(password || '');
    const isRePasswordValid = rePassword?.trim() !== '';
    const passwordsMatch = password === rePassword;

    const isFormValid =
      phoneNumber?.trim() !== '' &&
      password?.trim() !== '' &&
      rePassword?.trim() !== '' &&
      isRePasswordValid &&
      passwordsMatch &&
      isPhoneValid &&
      isPasswordValid;

    setIsFormValid(!!isFormValid);
  }, [userData, setIsFormValid]);

  const handlePhoneChange = (value: string) => {
    // Auto-add + if user starts typing without it
    let formattedValue = value;
    if (value && !value.startsWith('+')) {
      formattedValue = '+' + value;
    }

    onInputChange('phoneNumber', formattedValue);
    validatePhone(formattedValue);
  };

  const handlePasswordChange = (value: string) => {
    onInputChange('password', value);
    validatePassword(value);
  };

  return (
    <>
      {/* Phone Input */}
      <View className="mb-4">
        <View
          className={`rounded-2xl border ${phoneError && userData.phoneNumber ? 'border-red-500' : 'border-gray-300'} bg-white p-3`}
        >
          <TextInput
            value={userData.phoneNumber || ''}
            onChangeText={handlePhoneChange}
            placeholder="Phone Number (e.g., +20123456789)"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={{
              fontFamily: 'NotoSerif',
              fontSize: 14,
              color: '#030303',
            }}
          />
        </View>
        {phoneError && userData.phoneNumber ? (
          <Text className="mt-1 text-xs text-red-500" style={{ fontFamily: 'NotoSerif' }}>
            {phoneError}
          </Text>
        ) : null}
      </View>

      {/* Password Input */}
      <View className="mb-4">
        <View
          className={`flex-row items-center rounded-2xl border ${passwordError && userData.password ? 'border-red-500' : 'border-gray-300'} bg-white p-3`}
        >
          <TextInput
            value={userData.password || ''}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password"
            style={{
              flex: 1,
              fontFamily: 'NotoSerif',
              fontSize: 14,
              color: '#030303',
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7} className="ml-2">
            <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={22} color="#666" />
          </TouchableOpacity>
        </View>
        {passwordError && userData.password ? (
          <Text className="mt-1 text-xs text-red-500" style={{ fontFamily: 'NotoSerif' }}>
            {passwordError}
          </Text>
        ) : null}
      </View>

      {/* Re-Enter Password Input */}
      <View className="mb-6">
        <View
          className={`flex-row items-center rounded-2xl border ${userData.rePassword && userData.password !== userData.rePassword ? 'border-red-500' : 'border-gray-300'} bg-white p-3`}
        >
          <TextInput
            value={userData.rePassword || ''}
            onChangeText={(value) => onInputChange('rePassword', value)}
            placeholder="Re-Enter password"
            placeholderTextColor="#999"
            secureTextEntry={!showRePassword}
            autoCapitalize="none"
            autoComplete="password"
            style={{
              flex: 1,
              fontFamily: 'NotoSerif',
              fontSize: 14,
              color: '#030303',
            }}
          />
          <TouchableOpacity onPress={() => setShowRePassword(!showRePassword)} activeOpacity={0.7} className="ml-2">
            <Ionicons name={showRePassword ? 'eye-outline' : 'eye-off-outline'} size={22} color="#666" />
          </TouchableOpacity>
        </View>
        {userData.rePassword && userData.password !== userData.rePassword ? (
          <Text className="mt-1 text-xs text-red-500" style={{ fontFamily: 'NotoSerif' }}>
            Passwords do not match
          </Text>
        ) : null}
      </View>
    </>
  );
}
