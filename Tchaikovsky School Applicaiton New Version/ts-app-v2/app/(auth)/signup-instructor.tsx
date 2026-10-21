import Accordion from "../../components/accordion";
import Checkboxes from "../../components/checkboxes";
import PersonalInfoForm from "../../components/personal-info-form";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
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

import AuthInfoForm from "../../components/auth-info-form";
// import { authAPI } from '@/lib/api'; // Removed for frontend-only mode

export interface UserData {
  role: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  rePassword: string;
  gender?: "male" | "female";
  nationality?: string;
  country?: string;
  city?: string;
  preferredLanguage: "Arabic" | "English";
  primaryInstrument?: string;
  secondaryInstruments?: string[];
  yearsOfExperience?: string;
  certifications?: string;
  previousInstitutions?: string;
  performanceExpertise?: string[];
  teachingModes?: string[];
  availableDays?: string[];
  bankName?: string;
  accountHolderName?: string;
  ibanNumber?: string;
  idNumber?: string;
}

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // User data
  const [userData, setUserData] = useState<UserData>({
    role: "instructor",
    fullName: "",
    phoneNumber: "",
    password: "",
    rePassword: "",
    preferredLanguage: "Arabic",
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    router.push("/(auth)/login");
  };

  // Replace your entire handleNext function with this:

  // In your SignUp screen:
  const handleNext = async () => {
    setError(null);
    if (!isFormValid) return;

    try {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step >= 3) {
        // ✅ Remove only rePassword (keep password for update)
        // Mock Signup Logic
        setTimeout(() => {
          setShowPendingModal(true);
        }, 1000);
      }
    } catch (e: any) {
      const errorMessage = e.message ? e.message : "An error occurred.";
      console.error({ errorMessage });
      scrollToTop();
      setError(errorMessage);
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
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
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
                  {error && <Text className="mt-2 text-red-500">{error}</Text>}
                  {step > 1 && (
                    <TouchableOpacity onPress={handlePrevious}>
                      <View className="mt-2 flex-row items-center gap-2 py-2">
                        <Ionicons name="arrow-back" size={24} color="black" />
                        <Text className="font-bold text-gray-600">Back</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Username Input */}

                {step === 1 && (
                  <AuthInfoForm
                    setIsFormValid={setIsFormValid}
                    onInputChange={handleInputChange}
                    userData={userData}
                  />
                )}
                {step === 2 && (
                  <PersonalInfoForm
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

                {/* Sign Up Button */}
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={!isFormValid}
                  className="rounded-full py-5"
                  activeOpacity={0.85}
                  style={{
                    backgroundColor: isFormValid ? "#030303" : "#E5E5E5",
                    shadowColor: "#030303",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isFormValid ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: isFormValid ? 4 : 0,
                  }}
                >
                  <Text
                    className="text-center font-semibold"
                    style={{
                      fontFamily: "NotoSerif",
                      fontSize: 18,
                      letterSpacing: 0.5,
                      color: isFormValid ? "white" : "#999",
                    }}
                  >
                    {step !== 3 ? "Next" : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Section */}
              {/* Sign In Link */}
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
      <Modal
        visible={showPendingModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPendingModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-4/5 items-center rounded-xl bg-white p-6">
            {/* <View className="items-center justify-center rounded-full bg-green-100 p-4">
              <Ionicons name="checkmark-circle" size={60} color="#22c55e" />
            </View> */}
            <Image source={require("@/assets/images/Okay.png")} />
            <Text className="mt-6 text-center text-lg">
              Congratulations on joining Tchaikovsky School! 🎶
            </Text>
            <Text className="text-center text-lg">
              Your schedule will be assigned shortly. We can’t wait to get see
              you!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowPendingModal(false);
                router.push("/(auth)/login");
              }}
              className="mt-6 rounded-full bg-black px-6 py-3"
            >
              <Text className="font-semibold text-white">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ConfirmInfo: React.FC<{
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}> = ({ onInputChange, userData }) => {
  return (
    <View className="mb-4 gap-4">
      {/* Professional Information */}
      <Accordion
        title={
          <View>
            <Text className="text-lg font-semibold">
              Professional Information
            </Text>
            <Text className="text-sm text-neutral-500">
              Teaching experience and qualifications
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

        {/* Primary Instrument */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Primary Instrument
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
                onInputChange("primaryInstrument", value)
              }
              items={[
                { label: "Violin", value: "Violin" },
                { label: "Guitar", value: "Guitar" },
                { label: "Piano", value: "Piano" },
              ]}
              placeholder={{ label: "Select Primary Instrument", value: null }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  padding: 8,
                  color: "#000",
                },
                inputIOSContainer: {
                  zIndex: 100,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 8,
                  color: "#000",
                },
              }}
              value={userData.primaryInstrument || null}
            />
          </View>
        </View>

        {/* Secondary Instruments */}
        <Checkboxes
          title="Secondary Instruments"
          options={["Violin", "Guitar", "Piano"]}
          selectedOptions={userData.secondaryInstruments || []}
          onSelectionChange={(selection) =>
            onInputChange("secondaryInstruments", selection)
          }
        />

        {/* Years of Experience */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Years of Experience
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Years of Experience"
                placeholderTextColor="#999"
                value={userData.yearsOfExperience || ""}
                onChangeText={(value) =>
                  onInputChange("yearsOfExperience", value)
                }
              />
            </View>
          </View>
        </View>

        {/* Certifications */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Certifications or Degree
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Certifications or Degree"
                placeholderTextColor="#999"
                value={userData.certifications || ""}
                onChangeText={(value) => onInputChange("certifications", value)}
              />
            </View>
          </View>
        </View>

        {/* Previous Schools / Institutions */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Previous Schools / Institutions
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Previous Schools / Institutions"
                placeholderTextColor="#999"
                value={userData.previousInstitutions || ""}
                onChangeText={(value) =>
                  onInputChange("previousInstitutions", value)
                }
              />
            </View>
          </View>
        </View>

        {/* Performance / Exam Expertise */}
        <Checkboxes
          title="Performance / Exam Expertise"
          options={[
            "IMEB",
            "ABRSM",
            "Internal Programs",
            "Concert Preparation",
          ]}
          selectedOptions={userData.performanceExpertise || []}
          onSelectionChange={(selection) =>
            onInputChange("performanceExpertise", selection)
          }
        />
      </Accordion>

      {/* Availability & Teaching Preferences */}
      <Accordion
        title={
          <View>
            <Text className="text-lg font-semibold">
              Availability & Teaching Preferences
            </Text>
            <Text className="text-sm text-neutral-500">
              Schedule and teaching mode
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

        {/* Preferred Teaching Mode */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Preferred Teaching Mode
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
                onInputChange("teachingModes", value ? [value] : [])
              }
              items={[
                { label: "Online", value: "Online" },
                { label: "In Person", value: "In-Person" },
              ]}
              placeholder={{ label: "Select", value: null }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  padding: 8,
                  color: "#000",
                },
                inputIOSContainer: {
                  zIndex: 100,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 8,
                  color: "#000",
                },
              }}
              // ✅ FIX: Handle array value correctly
              value={userData.teachingModes?.[0] || null}
            />
          </View>
        </View>

        {/* Available Days */}
        <Checkboxes
          title="Available Days"
          options={[
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ]}
          selectedOptions={userData.availableDays || []}
          onSelectionChange={(selection) =>
            onInputChange("availableDays", selection)
          }
        />
      </Accordion>

      {/* Compensation & Documentation */}
      <Accordion
        title={
          <View>
            <Text className="text-lg font-semibold">
              Compensation & Documentation
            </Text>
            <Text className="text-sm text-neutral-500">
              Payment and legal information
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

        {/* Bank Name */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Bank Name
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Bank Name"
                placeholderTextColor="#999"
                value={userData.bankName || ""}
                onChangeText={(value) => onInputChange("bankName", value)}
              />
            </View>
          </View>
        </View>

        {/* Account Holder Name */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Account Holder Name
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Account Holder Name"
                placeholderTextColor="#999"
                value={userData.accountHolderName || ""}
                onChangeText={(value) =>
                  onInputChange("accountHolderName", value)
                }
              />
            </View>
          </View>
        </View>

        {/* IBAN Number */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            IBAN Number
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter IBAN Number"
                placeholderTextColor="#999"
                value={userData.ibanNumber || ""}
                onChangeText={(value) => onInputChange("ibanNumber", value)}
              />
            </View>
          </View>
        </View>

        {/* Passport | ID */}
        <View className="mb-4">
          <Text
            className="mb-2 text-sm text-neutral-500"
            style={{ fontFamily: "NotoSerif_700Bold" }}
          >
            Passport | ID
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="grow rounded-lg border border-gray-300 p-2">
              <TextInput
                placeholder="Enter Passport | ID"
                placeholderTextColor="#999"
                value={userData.idNumber || ""}
                onChangeText={(value) => onInputChange("idNumber", value)}
              />
            </View>
          </View>
        </View>
      </Accordion>
    </View>
  );
};

export default SignUpScreen;
