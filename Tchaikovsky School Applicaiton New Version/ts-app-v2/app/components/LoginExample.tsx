import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Example Login Component
 *
 * This is a simple example showing how to use the authentication API.
 * You can use this as a reference for building your actual login screen.
 */
export default function LoginExample() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, user, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ phone, password });
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      Alert.alert("Error", errorMessage);
    }
  };

  if (isAuthenticated && user) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl font-bold mb-4">Welcome, {user.name}!</Text>
        <Text className="text-gray-600 mb-2">Phone: {user.phone}</Text>
        <Text className="text-gray-600 mb-2">Role: {user.role}</Text>
        <Text className="text-gray-600 mb-4">Status: {user.status}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-2xl font-bold mb-8">Login Example</Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        className="w-full bg-blue-500 rounded-lg px-4 py-3 items-center"
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="text-white font-bold">
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Text className="mt-6 text-gray-500 text-sm text-center">
        This is an example component.{"\n"}
        Check API_USAGE.md for more examples.
      </Text>
    </View>
  );
}
