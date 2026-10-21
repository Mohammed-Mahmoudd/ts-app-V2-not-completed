# API Integration Examples

This document shows how to use the API services in your React Native app.

## Authentication

### Using the Auth Hook

```tsx
import { useAuth } from '../contexts/AuthContext';

function LoginScreen() {
  const { login, isLoading, isAuthenticated, user } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        phone: '1234567890',
        password: 'password123',
      });
      // User is now logged in, navigate to home
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Your UI here
  );
}
```

### Register a New User

```tsx
import { useAuth } from "../contexts/AuthContext";

function RegisterScreen() {
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      await register({
        name: "John Doe",
        phone: "1234567890",
        password: "password123",
        role: "student",
        preferredLanguage: "English",
        country: "USA",
        city: "New York",
        gender: "male",
        student: {
          instrument: "instrumentId",
          learningMode: "Hybrid",
        },
      });
      // User is registered and logged in
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
}
```

### Logout

```tsx
import { useAuth } from "../contexts/AuthContext";

function ProfileScreen() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // User is logged out, navigate to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
}
```

## API Services

### Admin Dashboard

```tsx
import { adminService } from '../services/api';
import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await adminService.getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch dashboard:', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    // Display dashboard stats, sessions, feedbacks, etc.
  );
}
```

### Sessions

```tsx
import { sessionService } from "../services/api";

// Get all sessions
const sessions = await sessionService.getAllSessions();

// Create a session (admin only)
const newSession = await sessionService.createSession({
  instructor: "instructorId",
  student: "studentId",
  startTime: "2026-02-01T10:00:00Z",
  duration: 60,
  branch: "branchId",
  type: "in-person",
  sessionNumber: 1,
  totalSessions: 10,
});

// Update a session (admin only)
const updated = await sessionService.updateSession("sessionId", {
  status: "completed",
});

// Delete a session (admin only)
await sessionService.deleteSession("sessionId");
```

### Feedback

```tsx
import { feedbackService } from "../services/api";

// Add feedback to a session
const feedback = await feedbackService.addFeedback("sessionId", {
  comment: "Great session!",
  rating: 5,
  HWComment: "Homework was challenging",
  HWRating: 4,
});

// Get all feedbacks for a session
const feedbacks = await feedbackService.getAllFeedbacks("sessionId");
```

### Instruments

```tsx
import { instrumentService } from "../services/api";

// Get all instruments
const instruments = await instrumentService.getInstruments();

// Create instrument (admin only)
const newInstrument = await instrumentService.createInstrument({
  name: "Piano",
});

// Delete instrument (admin only)
await instrumentService.deleteInstrument("instrumentId");
```

### Branches

```tsx
import { branchService } from "../services/api";

// Get all branches
const branches = await branchService.getBranches();

// Create branch (admin only)
const newBranch = await branchService.createBranch({
  name: "Downtown Branch",
  location: "123 Main St",
});

// Delete branch (admin only)
await branchService.deleteBranch("branchId");
```

### Users

```tsx
import { userService } from "../services/api";

// Get all users
const users = await userService.getAllUsers();
```

## Error Handling

All API calls can throw errors. Always wrap them in try-catch blocks:

```tsx
try {
  const data = await sessionService.getAllSessions();
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error("Server error:", error.response.data);
  } else if (error.request) {
    // No response received
    console.error("Network error:", error.message);
  } else {
    // Other errors
    console.error("Error:", error.message);
  }
}
```

## Token Refresh

Token refresh is handled automatically by the API client. When a request fails with 401:

1. The client automatically attempts to refresh the token
2. If successful, the original request is retried
3. If refresh fails, the user is logged out

You don't need to handle this manually!

## Configuration

To change the API base URL (e.g., for production), edit `config/api.config.ts`:

```typescript
const USE_LOCAL_IP = false; // Use localhost for emulator
// or
const USE_LOCAL_IP = true; // Use local IP for physical device
```
