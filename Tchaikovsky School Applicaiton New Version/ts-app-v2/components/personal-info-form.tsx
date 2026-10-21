import { UserData } from '@/app/(auth)/signup-instructor';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function PersonalInfoForm({
  onInputChange,
  userData,
}: {
  onInputChange: (field: string, value: any) => void;
  userData: UserData;
}) {
  return (
    <View>
      {/* Profile Picture */}
      <ProfilePicturePicker />

      {/* Full Name */}
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          Full Name *
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="grow rounded-lg border border-gray-300 p-2">
            <TextInput
              placeholder="Enter Full Name"
              placeholderTextColor="#999"
              value={userData.fullName || ''}
              onChangeText={(value) => onInputChange('fullName', value)}
            />
          </View>
        </View>
      </View>
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          Language *
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            backgroundColor: '#fff',
          }}
        >
          <RNPickerSelect
            value={userData.preferredLanguage}
            onValueChange={(value) => onInputChange('preferredLanguage', value)}
            items={[
              { label: 'Arabic', value: 'Arabic' },
              { label: 'English', value: 'English' },
            ]}
            placeholder={{ label: 'Select', value: null }}
            style={{
              inputIOS: {
                fontSize: 16,
                padding: 8,
                color: '#000',
              },
              inputIOSContainer: {
                zIndex: 100,
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 8,
                color: '#000',
              },
            }}
          />
        </View>
      </View>
      {/* Gender */}
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          Gender
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            backgroundColor: '#fff',
          }}
        >
          <RNPickerSelect
            value={userData.gender}
            onValueChange={(value) => onInputChange('gender', value)}
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            placeholder={{ label: 'Select', value: null }}
            style={{
              inputIOS: {
                fontSize: 16,
                padding: 8,
                color: '#000',
              },
              inputIOSContainer: {
                zIndex: 100,
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 8,
                color: '#000',
              },
            }}
          />
        </View>
      </View>

      {/* Date of Birth */}
      <DateOfBirthPicker onInputChange={onInputChange} userData={userData} />

      {/* Nationality */}
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          Nationality
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="grow rounded-lg border border-gray-300 p-2">
            <TextInput
              placeholder="Enter Nationality"
              placeholderTextColor="#999"
              value={userData.nationality || ''}
              onChangeText={(value) => onInputChange('nationality', value)}
            />
          </View>
        </View>
      </View>

      {/* Country of Residence */}
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          Country of Residence
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="grow rounded-lg border border-gray-300 p-2">
            <TextInput
              placeholder="Enter Country of Residence"
              placeholderTextColor="#999"
              value={userData.country || ''}
              onChangeText={(value) => onInputChange('country', value)}
            />
          </View>
        </View>
      </View>

      {/* City */}
      <View className="mb-4">
        <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
          City
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="grow rounded-lg border border-gray-300 p-2">
            <TextInput
              placeholder="Enter City"
              placeholderTextColor="#999"
              value={userData.city || ''}
              onChangeText={(value) => onInputChange('city', value)}
            />
          </View>
        </View>
      </View>

      {/* Language */}
    </View>
  );
}

const DateOfBirthPicker = ({
  onInputChange,
  userData,
}: {
  onInputChange: (field: string, value: any) => void;
  userData: any;
}) => {
  const [date, setDate] = useState(userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : null,
  );

  const onChange = (event: any, selected: any) => {
    setShow(false);
    if (selected) {
      setDate(selected);
      setSelectedDate(selected.toLocaleDateString());
      onInputChange('dateOfBirth', selected.toISOString());
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
        Date of Birth
      </Text>

      <TouchableOpacity onPress={() => setShow(true)} className="rounded-lg border border-gray-300 bg-white p-3">
        <Text className={selectedDate ? 'text-black' : 'text-gray-400'}>{selectedDate || 'mm/dd/yyyy'}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()} // optional: prevent future dates
        />
      )}
    </View>
  );
};

const ProfilePicturePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask for permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'We need access to your photos to select a profile picture.');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1], // make it square
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm text-neutral-500" style={{ fontFamily: 'NotoSerif_700Bold' }}>
        Profile Picture
      </Text>

      <View className="flex-row items-center gap-2">
        {/* Profile Preview */}
        {image ? (
          <Image
            source={{ uri: image }}
            height={80}
            width={80}
            className="aspect-square h-20 w-20 rounded-full border border-gray-300"
          />
        ) : (
          <View className="aspect-square h-20 w-20 items-center justify-center rounded-full border border-dashed border-gray-300 p-4">
            <Ionicons name="person-outline" size={32} color="#D2D6DD" />
          </View>
        )}

        {/* Upload Button */}
        <TouchableOpacity
          onPress={pickImage}
          className="grow flex-row items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2"
        >
          <Ionicons name="cloud-upload-outline" size={24} color="black" />
          <Text>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
