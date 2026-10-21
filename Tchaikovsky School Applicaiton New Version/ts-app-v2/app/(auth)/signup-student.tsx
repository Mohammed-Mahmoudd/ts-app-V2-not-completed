import Accordion from "../../components/accordion";
import DatePicker from "../../components/date-picker";
// import { authAPI } from '@/lib/api'; // Removed for frontend-only mode
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import Model from "../../components/Model";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserData {
  // User table fields
  phoneNumber: string;
  password: string;
  rePassword: string;
  fullName: string;
  preferredLanguage: string;
  country?: string;
  city?: string;
  role?: string;

  // Student table fields
  dateOfBirth?: Date;
  gender?: string;
  instrument?: string;
  secondaryInstrument?: string;
  experienceLevel?: string;
  address?: string;
  preferredDays?: string[];
  preferredTimes?: string[];
  learningMode?: string;
  branchLocation?: string;
  startDate?: Date;
  referralSource?: string;
  specialNotes?: string;

  // Parent information
  motherName?: string;
  motherPhone?: string;
  fatherName?: string;
  fatherPhone?: string;
}

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    role: "student",
    password: "",
    rePassword: "",
    fullName: "",
    preferredLanguage: "",
    phoneNumber: "",
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setUserData((prev: UserData) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  const handleNext = async () => {
    setError(null);

    if (step === 1) {
      if (!isFormValid) return;
      // Scroll to top
      scrollToTop();
      setStep(2);
    } else if (step === 2) {
      if (!isFormValid) return;
      scrollToTop();
      setStep(3);
    } else if (step === 3) {
      // Step 3: Submit all data to signup API
      // Mock Signup Logic
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
    }
  };

  function handlePrevious() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust if header overlaps
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 80 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View className="flex-1 justify-between px-6 py-8">
              {/* Top Section */}
              <View>
                {/* Logo and Title */}
                <View className="mb-6 flex-row items-center pt-4">
                  <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                  />
                  <Text
                    className="mt-3 text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 24,
                      letterSpacing: 0.5,
                    }}
                  >
                    Tchaikovsky
                  </Text>
                </View>

                {/* Welcome Text */}
                <View className="mb-9">
                  <Text
                    className="mb-2 text-3xl text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      letterSpacing: -0.5,
                    }}
                  >
                    Welcome Back
                  </Text>
                  <Text
                    className="text-3xl text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                    }}
                  >
                    Ready to hit the notes?
                  </Text>
                  {/* Error Message */}
                  {error && <Text className="mt-2 text-red-500">{error}</Text>}
                  {/* Progress bar */}
                  <View className="mt-4 h-3 w-full overflow-hidden rounded-full bg-zinc-200">
                    <LinearGradient
                      colors={["#000", "#666"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                        height: "100%",
                        borderRadius: 999,
                      }}
                    />
                  </View>
                  {/* Steps */}
                  <View className="mt-4 flex-row items-center gap-2">
                    {step > 1 && (
                      <TouchableOpacity onPress={handlePrevious}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                      </TouchableOpacity>
                    )}

                    <Text style={{ fontFamily: "NotoSerif_700Bold" }}>
                      Step {step}/3
                    </Text>
                  </View>
                </View>

                {/* Form Steps */}
                {step === 1 && (
                  <AuthInfoForm
                    setIsFormValid={setIsFormValid}
                    onInputChange={handleInputChange}
                    userData={userData}
                  />
                )}
                {step === 2 && (
                  <PersonalInfoForm
                    setIsFormValid={setIsFormValid}
                    onInputChange={handleInputChange}
                    userData={userData}
                  />
                )}
                {step === 3 && (
                  <ConfirmInfo
                    onInputChange={handleInputChange}
                    userData={userData}
                  />
                )}

                {/* Next/Submit Button */}
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={step !== 3 && !isFormValid}
                  className="rounded-full py-5"
                  activeOpacity={0.85}
                  style={{
                    backgroundColor:
                      step === 3 || isFormValid ? "#030303" : "#E5E5E5",
                    shadowColor: "#030303",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: step === 3 || isFormValid ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: step === 3 || isFormValid ? 4 : 0,
                  }}
                >
                  <Text
                    className="text-center font-semibold"
                    style={{
                      fontFamily: "NotoSerif",
                      fontSize: 18,
                      letterSpacing: 0.5,
                      color: step === 3 || isFormValid ? "white" : "#999",
                    }}
                  >
                    {step === 3 ? "Submit" : "Next"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Section */}
              <View className="mb-10 mt-10 flex-row items-center justify-center">
                <Text
                  className="text-[#030303] opacity-60"
                  style={{
                    fontFamily: "NotoSerif",
                    fontSize: 15,
                  }}
                >
                  Have an account already?{" "}
                </Text>
                <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
                  <Text
                    className="text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 15,
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Success Modal */}
      <Model
        visible={showSuccessModal}
        title="Congratulations on joining Tchaikovsky School! 🎶"
        message="Your instructor and schedule will be assigned shortly. We can’t wait to get started with you!"
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/(auth)/login");
        }}
        icon={
          <View className="items-center justify-center rounded-full bg-green-100 p-4">
            <Image source={require("@/assets/images/Okay.png")} />
          </View>
        }
      />
    </View>
  );
};

const PersonalInfoForm: React.FC<{
  setIsFormValid: (valid: boolean) => void;
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}> = ({ setIsFormValid, onInputChange, userData }) => {
  useEffect(() => {
    const fullName = userData.fullName?.trim();
    const preferredLanguage = userData.preferredLanguage?.trim();
    let isValid = !!fullName && !!preferredLanguage;
    if (fullName && fullName.length < 3) {
      isValid = false;
    }
    setIsFormValid(!!isValid);
  }, [userData, setIsFormValid]);

  return (
    <View>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust if header overlaps
      > */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* Full Name */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Full Name *
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-3">
              <TextInput
                placeholder="Enter Full Name"
                placeholderTextColor="#999"
                value={userData.fullName || ""}
                onChangeText={(value) => onInputChange("fullName", value)}
                style={{ fontFamily: "NotoSerif" }}
              />
            </View>
          </View>
        </View>
        {/* Language */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Preferred Language *
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              backgroundColor: "#fff",
            }}
          >
            <RNPickerSelect
              onValueChange={(value) =>
                onInputChange("preferredLanguage", value)
              }
              value={userData.preferredLanguage}
              items={[
                { label: "Arabic", value: "Arabic" },
                { label: "English", value: "English" },
              ]}
              placeholder={{ label: "Select Language", value: null }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  padding: 12,
                  color: "#000",
                },
                inputIOSContainer: {
                  zIndex: 100,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 12,
                  color: "#000",
                },
              }}
            />
          </View>
        </View>
        {/* Country */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Country (Optional)
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-3">
              <TextInput
                placeholder="Enter Country"
                placeholderTextColor="#999"
                value={userData.country || ""}
                onChangeText={(value) => onInputChange("country", value)}
                style={{ fontFamily: "NotoSerif" }}
              />
            </View>
          </View>
        </View>
        {/* City */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            City (Optional)
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-3">
              <TextInput
                placeholder="Enter City"
                placeholderTextColor="#999"
                value={userData.city || ""}
                onChangeText={(value) => onInputChange("city", value)}
                style={{ fontFamily: "NotoSerif" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const AuthInfoForm: React.FC<{
  setIsFormValid: (valid: boolean) => void;
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}> = ({ setIsFormValid, onInputChange, userData }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("");
      return false;
    }

    if (!phone.startsWith("+")) {
      setPhoneError("Phone number must start with country code (e.g., +20)");
      return false;
    }

    if (phone.length < 8) {
      setPhoneError("Phone number is too short");
      return false;
    }

    setPhoneError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("");
      return false;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }

    setPasswordError("");
    return true;
  };

  useEffect(() => {
    const { phoneNumber, password, rePassword } = userData;

    const isPhoneValid = validatePhone(phoneNumber || "");
    const isPasswordValid = validatePassword(password || "");
    const isRePasswordValid = rePassword?.trim() !== "";
    const passwordsMatch = password === rePassword;

    const isFormValid =
      phoneNumber?.trim() !== "" &&
      password?.trim() !== "" &&
      rePassword?.trim() !== "" &&
      isRePasswordValid &&
      passwordsMatch &&
      isPhoneValid &&
      isPasswordValid;

    setIsFormValid(!!isFormValid);
  }, [userData, setIsFormValid]);

  const handlePhoneChange = (value: string) => {
    let formattedValue = value;
    if (value && !value.startsWith("+")) {
      formattedValue = "+" + value;
    }

    onInputChange("phoneNumber", formattedValue);
    validatePhone(formattedValue);
  };

  const handlePasswordChange = (value: string) => {
    onInputChange("password", value);
    validatePassword(value);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      {/* Phone Input */}
      <View className="mb-4">
        <View
          className={`rounded-2xl border ${phoneError && userData.phoneNumber ? "border-red-500" : "border-gray-300"} bg-white p-3`}
        >
          <TextInput
            value={userData.phoneNumber || ""}
            onChangeText={handlePhoneChange}
            placeholder="Phone Number (e.g., +20123456789)"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            autoCapitalize="none"
            style={{
              fontFamily: "NotoSerif",
              fontSize: 14,
              color: "#030303",
            }}
          />
        </View>
        {phoneError && userData.phoneNumber ? (
          <Text
            className="mt-1 text-xs text-red-500"
            style={{ fontFamily: "NotoSerif" }}
          >
            {phoneError}
          </Text>
        ) : null}
      </View>
      {/* Password Input */}
      <View className="mb-4">
        <View
          className={`flex-row items-center rounded-2xl border ${passwordError && userData.password ? "border-red-500" : "border-gray-300"} bg-white p-3`}
        >
          <TextInput
            value={userData.password || ""}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete="password"
            style={{
              flex: 1,
              fontFamily: "NotoSerif",
              fontSize: 14,
              color: "#030303",
            }}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
            className="ml-2"
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {passwordError && userData.password ? (
          <Text
            className="mt-1 text-xs text-red-500"
            style={{ fontFamily: "NotoSerif" }}
          >
            {passwordError}
          </Text>
        ) : null}
      </View>
      {/* Re-Enter Password Input */}
      <View className="mb-6">
        <View
          className={`flex-row items-center rounded-2xl border ${userData.rePassword && userData.password !== userData.rePassword ? "border-red-500" : "border-gray-300"} bg-white p-3`}
        >
          <TextInput
            value={userData.rePassword || ""}
            onChangeText={(value) => onInputChange("rePassword", value)}
            placeholder="Re-Enter password"
            placeholderTextColor="#999"
            secureTextEntry={!showRePassword}
            autoCapitalize="none"
            autoComplete="password"
            style={{
              flex: 1,
              fontFamily: "NotoSerif",
              fontSize: 14,
              color: "#030303",
            }}
          />
          <TouchableOpacity
            onPress={() => setShowRePassword(!showRePassword)}
            activeOpacity={0.7}
            className="ml-2"
          >
            <Ionicons
              name={showRePassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {userData.rePassword && userData.password !== userData.rePassword ? (
          <Text
            className="mt-1 text-xs text-red-500"
            style={{ fontFamily: "NotoSerif" }}
          >
            Passwords do not match
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const ConfirmInfo: React.FC<{
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}> = ({ onInputChange, userData }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View className="mb-4 gap-4">
        {/* Student Information */}
        <Accordion
          title={
            <View>
              <Text className="text-lg font-semibold">Student Information</Text>
              <Text className="text-sm text-neutral-500">
                Personal details and learning preferences
              </Text>
            </View>
          }
        >
          <View className="mb-4 flex-row items-center gap-2">
            <Ionicons name="time-outline" size={20} color="#6E6E6E" />
            <Text className="text-neutral-500">
              Takes about 90 seconds to fill
            </Text>
          </View>

          {/* Date of Birth */}
          <DatePicker
            title="Date of Birth"
            value={userData.dateOfBirth}
            onChange={(date) => onInputChange("dateOfBirth", date)}
          />

          {/* Gender */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Gender
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => onInputChange("gender", value)}
                value={userData.gender}
                items={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                placeholder={{ label: "Select", value: null }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    padding: 12,
                    color: "#000",
                  },
                  inputIOSContainer: {
                    zIndex: 100,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 12,
                    color: "#000",
                  },
                }}
              />
            </View>
          </View>

          {/* Instrument - ✅ FIXED: Now uses capitalized values */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Instrument
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300">
                <RNPickerSelect
                  onValueChange={(value) => onInputChange("instrument", value)}
                  value={userData.instrument}
                  items={[
                    { label: "Piano", value: "Piano" },
                    { label: "Violin", value: "Violin" },
                    { label: "Guitar", value: "Guitar" },
                    { label: "Vocals", value: "Vocals" },
                  ]}
                  placeholder={{ label: "Select Instrument", value: null }}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      padding: 12,
                      color: "#000",
                    },
                    inputIOSContainer: {
                      zIndex: 100,
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 12,
                      color: "#000",
                    },
                  }}
                />
              </View>
            </View>
          </View>

          {/* Second Instrument - ✅ FIXED: Now uses capitalized values */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Second Instrument (Optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300">
                <RNPickerSelect
                  onValueChange={(value) =>
                    onInputChange("secondaryInstrument", value)
                  }
                  value={userData.secondaryInstrument}
                  items={[
                    { label: "Piano", value: "Piano" },
                    { label: "Violin", value: "Violin" },
                    { label: "Guitar", value: "Guitar" },
                    { label: "Vocals", value: "Vocals" },
                  ]}
                  placeholder={{
                    label: "Select Second Instrument",
                    value: null,
                  }}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      padding: 12,
                      color: "#000",
                    },
                    inputIOSContainer: {
                      zIndex: 100,
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 12,
                      color: "#000",
                    },
                  }}
                />
              </View>
            </View>
          </View>

          {/* Experience Level */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Experience Level
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) =>
                  onInputChange("experienceLevel", value)
                }
                value={userData.experienceLevel}
                items={[
                  { label: "Preliminary", value: "Preliminary" },
                  { label: "Grade 1", value: "Grade 1" },
                  { label: "Grade 2", value: "Grade 2" },
                  { label: "Grade 3", value: "Grade 3" },
                  { label: "Grade 4", value: "Grade 4" },
                  { label: "Grade 5", value: "Grade 5" },
                  { label: "Grade 6", value: "Grade 6" },
                  { label: "Grade 7", value: "Grade 7" },
                  { label: "Grade 8", value: "Grade 8" },
                ]}
                placeholder={{ label: "Select Experience Level", value: null }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    padding: 12,
                    color: "#000",
                  },
                  inputIOSContainer: {
                    zIndex: 100,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 12,
                    color: "#000",
                  },
                }}
              />
            </View>
          </View>

          {/* Learning Mode */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Learning Mode
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => onInputChange("learningMode", value)}
                value={userData.learningMode}
                items={[
                  { label: "Online", value: "Online" },
                  { label: "In-Person", value: "In-Person" },
                  { label: "Hybrid", value: "Hybrid" },
                ]}
                placeholder={{ label: "Select Learning Mode", value: null }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    padding: 12,
                    color: "#000",
                  },
                  inputIOSContainer: {
                    zIndex: 100,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 12,
                    color: "#000",
                  },
                }}
              />
            </View>
          </View>

          {/* Branch Location */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Branch Location
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) =>
                  onInputChange("branchLocation", value)
                }
                value={userData.branchLocation}
                items={[
                  { label: "Riyadh park Mall", value: "Riyadh park Mall" },
                  { label: "Jeddah Branch ", value: "Jeddah Branch " },
                  { label: "Al-Reem compound", value: "Al-Reem compound" },
                  { label: "Al-Khobar branch", value: "Al-Khobar branch" },
                ]}
                placeholder={{ label: "Select Branch", value: null }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    padding: 12,
                    color: "#000",
                  },
                  inputIOSContainer: {
                    zIndex: 100,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 12,
                    color: "#000",
                  },
                }}
              />
            </View>
          </View>

          {/* Start Date */}
          <DatePicker
            title="Start Date"
            value={userData.startDate}
            onChange={(date) => onInputChange("startDate", date)}
            maximumDate={
              new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
            } // 1 year from now
          />

          {/* How did you hear about us ? - ✅ FIXED: Changed field name to referralSource */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              How did you hear about us?
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#fff",
              }}
            >
              <RNPickerSelect
                onValueChange={(value) =>
                  onInputChange("referralSource", value)
                }
                value={userData.referralSource}
                items={[
                  { label: "Social Media", value: "Social Media" },
                  { label: "Google Search", value: "Google Search" },
                  { label: "Friend", value: "Friend" },
                  { label: "Other", value: "Other" },
                ]}
                placeholder={{ label: "Select Option", value: null }}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    padding: 12,
                    color: "#000",
                  },
                  inputIOSContainer: {
                    zIndex: 100,
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 12,
                    color: "#000",
                  },
                }}
              />
            </View>
          </View>

          {/* Special Notes (optional) */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Special Notes (optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300 p-2">
                <TextInput
                  placeholder="Enter Special Notes"
                  placeholderTextColor="#999"
                  multiline={true}
                  value={userData.specialNotes || ""}
                  onChangeText={(value) => onInputChange("specialNotes", value)}
                  style={{ fontFamily: "NotoSerif" }}
                />
              </View>
            </View>
          </View>

          {/* Parent Information Section */}
          <Text className="mb-4 mt-6 text-lg font-semibold">
            Parent Information
          </Text>

          {/* Mother's Name */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Mother&apos;s Name (Optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300 p-2">
                <TextInput
                  placeholder="Enter Mother's Name"
                  placeholderTextColor="#999"
                  value={userData.motherName || ""}
                  onChangeText={(value) => onInputChange("motherName", value)}
                  style={{ fontFamily: "NotoSerif" }}
                />
              </View>
            </View>
          </View>

          {/* Mother's Phone */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Mother&apos;s Phone (Optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300 p-2">
                <TextInput
                  placeholder="Enter Mother's Phone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={userData.motherPhone || ""}
                  onChangeText={(value) => onInputChange("motherPhone", value)}
                  style={{ fontFamily: "NotoSerif" }}
                />
              </View>
            </View>
          </View>

          {/* Father's Name */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Father&apos;s Name (Optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300 p-2">
                <TextInput
                  placeholder="Enter Father's Name"
                  placeholderTextColor="#999"
                  value={userData.fatherName || ""}
                  onChangeText={(value) => onInputChange("fatherName", value)}
                  style={{ fontFamily: "NotoSerif" }}
                />
              </View>
            </View>
          </View>

          {/* Father's Phone */}
          <View className="mb-4">
            <Text
              className="mb-2 text-sm text-neutral-500"
              style={{ fontFamily: "NotoSerif_700Bold" }}
            >
              Father&apos;s Phone (Optional)
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="grow rounded-lg border border-gray-300 p-2">
                <TextInput
                  placeholder="Enter Father's Phone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  value={userData.fatherPhone || ""}
                  onChangeText={(value) => onInputChange("fatherPhone", value)}
                  style={{ fontFamily: "NotoSerif" }}
                />
              </View>
            </View>
          </View>
        </Accordion>
      </View>
    </ScrollView>
  );
};
export default SignUpScreen;
