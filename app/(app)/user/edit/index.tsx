import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

export default function EditPersonalization() {
  const [stylePreference, setStylePreference] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
  });
  const [fitPreference, setFitPreference] = useState('');
  const [size, setSize] = useState('');

  return (
    <ScrollView style={tw`bg-black`} contentContainerStyle={tw`px-6 pb-6`}>
      <ScrollView style={tw`w-full h-full bg-black`}>

        {/* Style Preferences */}
        <Text style={tw`text-white text-lg font-semibold mb-2`}>Style Preference</Text>
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-4`}
          placeholder="Enter your preferred style (e.g., Casual, Formal)"
          value={stylePreference}
          onChangeText={setStylePreference}
        />

        {/* Body Measurements */}
        <Text style={tw`text-white text-lg font-semibold mb-2`}>Body Measurements</Text>
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-2`}
          placeholder="Height (e.g., 170 cm)"
          keyboardType="numeric"
          value={bodyMeasurements.height}
          onChangeText={(value) => setBodyMeasurements({ ...bodyMeasurements, height: value })}
        />
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-2`}
          placeholder="Weight (e.g., 70 kg)"
          keyboardType="numeric"
          value={bodyMeasurements.weight}
          onChangeText={(value) => setBodyMeasurements({ ...bodyMeasurements, weight: value })}
        />
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-2`}
          placeholder="Chest (e.g., 90 cm)"
          keyboardType="numeric"
          value={bodyMeasurements.chest}
          onChangeText={(value) => setBodyMeasurements({ ...bodyMeasurements, chest: value })}
        />
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-2`}
          placeholder="Waist (e.g., 75 cm)"
          keyboardType="numeric"
          value={bodyMeasurements.waist}
          onChangeText={(value) => setBodyMeasurements({ ...bodyMeasurements, waist: value })}
        />
        <TextInput
          style={tw`bg-white border border-gray-300  p-2 mb-4`}
          placeholder="Hips (e.g., 95 cm)"
          keyboardType="numeric"
          value={bodyMeasurements.hips}
          onChangeText={(value) => setBodyMeasurements({ ...bodyMeasurements, hips: value })}
        />

        {/* Fit Preference */}
        <Text style={tw`text-white text-lg font-semibold mb-2`}>Fit Preference</Text>
        <Picker
          selectedValue={fitPreference}
          onValueChange={(itemValue) => setFitPreference(itemValue)}
          style={tw`bg-white border border-gray-300  mb-4`}
        >
          <Picker.Item label="Select Fit Preference" value="" />
          <Picker.Item label="Regular Fit" value="regular" />
          <Picker.Item label="Slim Fit" value="slim" />
          <Picker.Item label="Oversized Fit" value="oversized" />
        </Picker>

        {/* Preferred Size */}
        <Text style={tw`text-white text-lg font-semibold mb-2`}>Preferred Size</Text>
        <Picker
          selectedValue={size}
          onValueChange={(itemValue) => setSize(itemValue)}
          style={tw`bg-white border border-gray-300  mb-4`}
        >
          <Picker.Item label="Select Size" value="" />
          <Picker.Item label="XS" value="XS" />
          <Picker.Item label="S" value="S" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="L" value="L" />
          <Picker.Item label="XL" value="XL" />
        </Picker>

        {/* Save Button */}
        <Pressable style={tw`bg-gray-800  p-3 mt-4 items-center`}>
          <Text style={tw`text-white text-lg font-semibold`}>Save Preferences</Text>
        </Pressable>
      </ScrollView>

      <View style={tw`mt-2 items-center`}>
        <Image
          source={require('@/assets/images/user/logo.png')}
          style={tw`h-8 w-8 mt-8`}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
}
