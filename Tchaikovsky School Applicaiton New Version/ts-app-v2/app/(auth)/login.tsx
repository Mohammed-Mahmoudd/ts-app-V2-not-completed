import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// import { useAuth } from '@/contexts/AuthContext'; // Removed for frontend-only mode
// import { adminAPI, authAPI } from '@/lib/api'; // Removed for frontend-only mode
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen: React.FC = () => {
  const router = useRouter();
  // const { signIn } = useAuth(); // Removed for frontend-only mode
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showPendingModal, setShowPendingModal] = useState<boolean>(false);

  const isFormValid = phone.trim() !== "" && password.trim() !== "";

  const [phoneError, setPhoneError] = useState<string>("");

  // Validate phone
  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("");
      return false;
    }
    // Allow the specific mock phone number or admin username
    if (phone === "123456789" || phone === "admin") return true;

    if (!phone.startsWith("+")) {
      setPhoneError("Phone number must start with country code (e.g., +20)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleLogin = async () => {
    if (!isFormValid) return;

    // Validate phone
    if (!validatePhone(phone)) return;

    setLoading(true);
    setError(null);

    // Mock Login Logic
    setTimeout(() => {
      setLoading(false);

      // Check for specific credentials
      if (phone === "+123456789" && password === "admin123") {
        // Navigate to Admin Dashboard
        router.replace("/screens/Admin/Overview");
      } else if (phone === "+123456789" && password === "instructor123") {
        // Navigate to Instructor Dashboard
        router.replace("/screens/Instructor/Dashboard");
      } else if (phone === "+123456789" && password === "student123") {
        // Navigate to Student Dashboard
        router.replace("/screens/Student/Home");
      } else {
        setError({
          message:
            "Invalid credentials.\nAdmin: +123456789 / admin123\nInstructor: +123456789 / instructor123\nStudent: +123456789 / student123",
        });
        setShowErrorModal(true);
      }
    }, 1500);
  };

  const handlePhoneChange = (text: string) => {
    // Always start with '+'
    if (!text.startsWith("+")) {
      text = "+" + text.replace(/\+/g, ""); // remove extra '+' if user typed
    }

    setPhone(text);
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup-role");
  };

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
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            <View className="px-6 py-8">
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
                    className="mb-2 text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 30,
                      letterSpacing: -0.5,
                    }}
                  >
                    Welcome Back
                  </Text>
                  <Text
                    className=""
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 30,
                    }}
                  >
                    Ready to hit the notes?
                  </Text>
                </View>

                <View className="mb-4">
                  <View
                    className="rounded-2xl border bg-white px-4 py-4"
                    style={{ borderColor: phoneError ? "red" : "#ccc" }}
                  >
                    <TextInput
                      value={phone}
                      onChangeText={handlePhoneChange}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      autoCapitalize="none"
                      style={{
                        fontFamily: "NotoSerif",
                        fontSize: 16,
                        color: "#030303",
                      }}
                    />
                  </View>
                  {phoneError ? (
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
                  <View className="flex-row items-center rounded-2xl border border-gray-300 bg-white px-4 py-4">
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoComplete="password"
                      style={{
                        flex: 1,
                        fontFamily: "NotoSerif",
                        fontSize: 16,
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
                </View>

                {/* Remember Me and Forgot Password */}
                <View className="mb-6 flex-row items-center justify-between">
                  <TouchableOpacity
                    onPress={() => setRememberMe(!rememberMe)}
                    activeOpacity={0.7}
                    className="flex-row items-center"
                  >
                    <View
                      className="mr-2 h-5 w-5 items-center justify-center rounded border-2"
                      style={{
                        borderColor: rememberMe ? "#030303" : "#999",
                        backgroundColor: rememberMe ? "#030303" : "transparent",
                      }}
                    >
                      {rememberMe && (
                        <Ionicons name="checkmark" size={14} color="white" />
                      )}
                    </View>
                    <Text
                      className="text-[#030303]"
                      style={{
                        fontFamily: "NotoSerif",
                        fontSize: 14,
                      }}
                    >
                      Remember me
                    </Text>
                  </TouchableOpacity>
                  <ForgotPassword />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={!isFormValid || loading}
                  className="rounded-full py-5"
                  activeOpacity={0.85}
                  style={{
                    backgroundColor:
                      isFormValid && !loading ? "#030303" : "#E5E5E5",
                    shadowColor: "#030303",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isFormValid && !loading ? 0.15 : 0,
                    shadowRadius: 8,
                    elevation: isFormValid && !loading ? 4 : 0,
                  }}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      className="text-center font-semibold"
                      style={{
                        fontFamily: "NotoSerif",
                        fontSize: 18,
                        letterSpacing: 0.5,
                        color: isFormValid ? "white" : "#999",
                      }}
                    >
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* Bottom Section */}
            <View className="h-100 mt-auto">
              <View className="my-10 flex-row items-center justify-center">
                <Text
                  className="text-[#030303] opacity-60"
                  style={{
                    fontFamily: "NotoSerif",
                    fontSize: 15,
                  }}
                >
                  Don&apos;t have an account?{" "}
                </Text>

                <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                  <Text
                    className="text-[#030303]"
                    style={{
                      fontFamily: "NotoSerif_700Bold",
                      fontSize: 15,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Pending Status Modal */}
      <Modal
        isVisible={showPendingModal}
        onBackdropPress={() => setShowPendingModal(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}
      >
        <View className="mx-4 items-center rounded-3xl bg-white p-8">
          {/* Image */}
          <Image
            source={require("../../assets/images/verifiedImage.png")}
            style={{ width: 120, height: 120, marginBottom: 24 }}
            resizeMode="contain"
          />

          {/* Title */}
          <Text
            className="mb-3 text-center text-[#030303]"
            style={{
              fontFamily: "NotoSerif_700Bold",
              fontSize: 24,
              letterSpacing: -0.3,
            }}
          >
            Account Under Review
          </Text>

          {/* Description */}
          <Text
            className="mb-2 text-center text-[#030303] opacity-70"
            style={{
              fontFamily: "NotoSerif",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            We are setting up your schedule. Once its ready, you will get
            access.
          </Text>

          <Text
            className="mb-8 text-center text-[#030303] opacity-70"
            style={{
              fontFamily: "NotoSerif",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            The admin is reviewing it and will activate your access.
          </Text>

          {/* OK Button */}
          <TouchableOpacity
            onPress={() => setShowPendingModal(false)}
            className="w-full rounded-full py-4"
            activeOpacity={0.85}
            style={{
              backgroundColor: "#030303",
              shadowColor: "#030303",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text
              className="text-center font-semibold text-white"
              style={{
                fontFamily: "NotoSerif_600SemiBold",
                fontSize: 18,
                letterSpacing: 0.5,
              }}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Error Modal */}
      <ErrorModal
        visible={showErrorModal}
        error={error}
        onClose={() => {
          setShowErrorModal(false);
          setError(null);
        }}
      />
    </View>
  );
};

// ErrorModal Component
interface ErrorModalProps {
  visible: boolean;
  error: any;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, error, onClose }) => {
  // Function to parse and format error messages
  const parseErrorMessage = (error: any): any => {
    const result: any = {};

    if (!error) {
      return { message: "An unexpected error occurred" };
    }

    // message
    if (typeof error === "string") {
      result.message = error;
    } else if (error.message) {
      result.message = error.message;
    } else if (error.response?.data?.message) {
      result.message = error.response.data.message;
    } else {
      result.message = "An unexpected error occurred";
    }

    // validation errors
    if (error.errors && Array.isArray(error.errors)) {
      result.errors = error.errors;
    } else if (error.response?.data?.errors) {
      result.errors = error.response.data.errors;
    }

    // status code
    if (error.status) {
      result.status = error.status;
    } else if (error.response?.status) {
      result.status = error.response.status;
    }

    return result;
  };

  const errorMessage = parseErrorMessage(error);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
    >
      <View className="mx-4 items-center rounded-3xl bg-white p-8">
        {/* Image */}
        <Image
          source={require("../../assets/images/verifiedImage.png")}
          style={{ width: 120, height: 120, marginBottom: 24 }}
          resizeMode="contain"
        />

        {/* Title */}
        <Text
          className="mb-3 text-center text-[#030303]"
          style={{
            fontFamily: "NotoSerif_700Bold",
            fontSize: 24,
            letterSpacing: -0.3,
          }}
        >
          Oops! Something went wrong
        </Text>

        {/* Error Message */}
        <Text
          className="mb-8 text-center text-[#030303] opacity-70"
          style={{
            fontFamily: "NotoSerif",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {errorMessage.message}
        </Text>

        {/* OK Button */}
        <TouchableOpacity
          onPress={onClose}
          className="w-full rounded-full py-4"
          activeOpacity={0.85}
          style={{
            backgroundColor: "#030303",
            shadowColor: "#030303",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            className="text-center font-semibold text-white"
            style={{
              fontFamily: "NotoSerif_600SemiBold",
              fontSize: 18,
              letterSpacing: 0.5,
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const ForgotPassword = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"phone" | "code" | "reset">("phone");
  const [phone, setPhone] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [resetToken, setResetToken] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined;
    if (visible && step === "code" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [visible, step, timer]);

  const handleDigitChange = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text.slice(-1); // only keep last char
    setDigits(newDigits);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (step === "phone") {
        setStep("code");
        setTimer(30);
      } else if (step === "code") {
        // Any 4 digits work
        if (digits.join("").length === 4) {
          setStep("reset");
        } else {
          setError("Please enter a 4 digit code");
        }
      } else if (step === "reset") {
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        alert("Password reset successfully! (Mock)");
        closeModal();
      }
    }, 1000);
  };

  const handleResend = async () => {
    setError("");
    // Mock resend
    setTimer(30);
  };

  const closeModal = () => {
    setVisible(false);
    setStep("phone");
    setPhone("");
    setDigits(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    // setResetToken("");
    setTimer(30);
    setError("");
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text
          className="text-[#454545]"
          style={{ fontFamily: "NotoSerif_600SemiBold", fontSize: 14 }}
        >
          Forgot Password
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onBackdropPress={closeModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View className="h-[65%] w-full rounded-t-2xl bg-white p-5">
          <View className="mb-4 flex-row items-center justify-end">
            <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
              <Ionicons name="close" size={24} color="#030303" />
            </TouchableOpacity>
          </View>

          {error !== "" && (
            <View className="mb-3 rounded-lg bg-red-50 p-2">
              <Text className="text-center text-sm text-red-600">{error}</Text>
            </View>
          )}

          {step === "phone" ? (
            <>
              <Text className="mb-4 text-3xl font-bold">
                Phone Confirmation
              </Text>
              <Text className="mb-6 text-xl text-gray-600">
                Please verify your phone to continue
              </Text>

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                className="mb-6 rounded-2xl border border-gray-300 bg-white px-4 py-4"
              />

              <TouchableOpacity
                onPress={handleContinue}
                disabled={loading}
                className="rounded-2xl bg-[#030303] py-4"
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    className="text-center text-white"
                    style={{
                      fontFamily: "NotoSerif_600SemiBold",
                      fontSize: 16,
                    }}
                  >
                    Continue
                  </Text>
                )}
              </TouchableOpacity>
            </>
          ) : step === "code" ? (
            <>
              <Text className="mb-4 text-3xl font-bold">Check your SMS</Text>
              <Text className="text-xl text-gray-600/60">
                Please enter the code we sent to
              </Text>
              <Text className="mb-4 text-xl font-bold">{phone}</Text>

              <View className="mx-6 mb-6 flex-row justify-between">
                {digits.map((d, i) => (
                  <TextInput
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el!;
                    }}
                    value={d}
                    onChangeText={(t) => handleDigitChange(t, i)}
                    onKeyPress={(e) => handleKeyPress(e, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="h-14 w-14 rounded-xl border border-gray-300 text-center text-2xl underline"
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={handleContinue}
                disabled={loading || digits.some((d) => !d)}
                className="rounded-2xl bg-[#030303] py-4"
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    className="text-center text-white"
                    style={{
                      fontFamily: "NotoSerif_600SemiBold",
                      fontSize: 16,
                    }}
                  >
                    Continue
                  </Text>
                )}
              </TouchableOpacity>

              {timer > 0 ? (
                <Text className="mt-6 text-center text-gray-500">
                  You can resend a new code in {timer}s
                </Text>
              ) : (
                <View className="mt-6 flex-row items-center justify-center">
                  <Text className="text-gray-500">Didn&apos;t get? </Text>
                  <TouchableOpacity onPress={handleResend}>
                    <Text className="underline">Send me a new code</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <>
              <Text className="mb-4 text-3xl font-bold">Reset Password</Text>
              <Text className="mb-6 text-xl text-gray-600">
                Enter your new password
              </Text>

              <TextInput
                placeholder="New Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                className="mb-4 rounded-2xl border border-gray-300 bg-white px-4 py-4"
              />

              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="mb-6 rounded-2xl border border-gray-300 bg-white px-4 py-4"
              />

              <TouchableOpacity
                onPress={handleContinue}
                disabled={loading || !newPassword || !confirmPassword}
                className="rounded-2xl bg-[#030303] py-4"
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    className="text-center text-white"
                    style={{
                      fontFamily: "NotoSerif_600SemiBold",
                      fontSize: 16,
                    }}
                  >
                    Reset Password
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

export default LoginScreen;
