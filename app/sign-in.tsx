import React, { useState } from 'react';
import { Text, View, TextInput, Alert, Pressable, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { useSession } from '@/context/authContext';
import tw from 'twrnc';
import { z } from 'zod';

// Define the validation schema using Zod
const signInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function SignIn() {
  const { signIn, isLoading } = useSession(); // Access signIn and isLoading from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({}); // State to hold error messages

  const handleSignIn = async () => {
    // Validate inputs using Zod
    const validationResult = signInSchema.safeParse({ email, password });

    // Reset errors before validation
    setErrors({});

    if (!validationResult.success) {
      // If validation fails, set error messages for respective fields
      const errorMessages = validationResult.error.errors.reduce<Record<string, string>>(
        (acc, err) => {
          acc[err.path[0]] = err.message; // Map error messages to respective fields
          return acc;
        },
        {}
      );
      setErrors(errorMessages);
      return; 
    }

    try {
      
      await signIn(email, password);
      
      router.replace('/');
    } catch (error) {
      
      Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (

    <ImageBackground
      source={require('@/assets/images/background.png')}
      style={tw`bg-black w-full h-full`}
    >
      <View style={tw`flex-row items-center p-6 mt-6`}>
        <Image 
          source={require('@/assets/images/logo.png')} 
          style={tw`h-12 w-12 mr-2`} // Adjust size as needed
          resizeMode="contain" // Maintain aspect ratio
        />
        <Text style={tw`mt-3 text-6xl text-white font-bold`}>Peek</Text>
      </View>
      <View style={tw`flex-1 justify-center p-6`}>
        <Text style={tw`text-6xl mb-6 text-white font-bold`}>SIGN IN</Text>


        <TextInput
          placeholder="Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={setEmail}
          style={tw`bg-white border border-gray-300 rounded-md p-2 mb-3`}
          autoCapitalize="none"
        />
        {errors.email && <Text style={tw`text-red-500 mb-2`}>{errors.email}</Text>}


        <TextInput
          placeholder="Password"
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={tw`bg-white border border-gray-300 rounded-md p-2 mb-6`}
        />
        {errors.password && <Text style={tw`text-red-500 mb-2`}>{errors.password}</Text>}


        <Pressable
          onPress={handleSignIn}
          style={({ pressed }) => [
            tw`bg-blue-600 rounded-md p-3`,
            pressed ? tw`bg-blue-500` : null,
          ]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={tw`text-white text-center`}>Sign In</Text>
          )}
        </Pressable>

        {isLoading && <Text style={tw`mt-4 text-center`}>Signing In...</Text>}


        <Pressable
          onPress={() => router.push('/register')}
          style={({ pressed }) => [
            tw`bg-gray-200 rounded-md p-3 mt-4`,
            pressed ? tw`bg-gray-300` : null,
          ]}
        >
          <Text style={tw`text-gray-700 text-center`}>Don't have an account? Sign Up</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
