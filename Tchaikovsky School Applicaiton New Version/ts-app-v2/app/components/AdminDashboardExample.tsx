import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { adminService } from "../../services/api";
import { DashboardResponse } from "../../types/api.types";

/**
 * Example Admin Dashboard Component
 *
 * This demonstrates how to fetch and display data from the admin API.
 * Make sure you're logged in as an admin user to use this.
 */
export default function AdminDashboardExample() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboard();
      setDashboard(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch dashboard";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Loading dashboard...</Text>
      </View>
    );
  }

  if (!dashboard) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Failed to load dashboard</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-6">Admin Dashboard</Text>

      {/* Stats Grid */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3">Statistics</Text>
        <View className="flex-row flex-wrap -mx-2">
          <StatCard title="Total Users" value={dashboard.stats.totalUsers} />
          <StatCard
            title="Total Sessions"
            value={dashboard.stats.totalSessions}
          />
          <StatCard
            title="Instructors"
            value={dashboard.stats.totalInstructors}
          />
          <StatCard title="Students" value={dashboard.stats.totalStudents} />
          <StatCard
            title="Active Sessions"
            value={dashboard.stats.activeSessions}
          />
          <StatCard
            title="Completed"
            value={dashboard.stats.completedSessions}
          />
          <StatCard
            title="Pending Requests"
            value={dashboard.stats.pendingRequests}
          />
          <StatCard title="Feedbacks" value={dashboard.stats.totalFeedbacks} />
        </View>
      </View>

      {/* Recent Sessions */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3">
          Recent Sessions ({dashboard.sessionsTotal})
        </Text>
        {dashboard.sessions.slice(0, 5).map((session) => (
          <View
            key={session._id}
            className="bg-white p-4 rounded-lg mb-2 shadow-sm"
          >
            <Text className="font-semibold">
              Session #{session.sessionNumber}
            </Text>
            <Text className="text-gray-600 text-sm">Type: {session.type}</Text>
            <Text className="text-gray-600 text-sm">
              Status: {session.status}
            </Text>
          </View>
        ))}
      </View>

      {/* Recent Feedbacks */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3">
          Recent Feedbacks ({dashboard.feedbacksTotal})
        </Text>
        {dashboard.feedbacks.slice(0, 5).map((feedback) => (
          <View
            key={feedback._id}
            className="bg-white p-4 rounded-lg mb-2 shadow-sm"
          >
            <Text className="font-semibold">Rating: {feedback.rating}/5</Text>
            <Text className="text-gray-600 text-sm">{feedback.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Helper component for stat cards
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <View className="w-1/2 px-2 mb-4">
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-gray-600 text-sm mb-1">{title}</Text>
        <Text className="text-2xl font-bold text-blue-600">{value}</Text>
      </View>
    </View>
  );
}
