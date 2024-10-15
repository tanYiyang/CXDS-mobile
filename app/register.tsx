import { useState } from 'react';
import { Text, TextInput, View, Alert, Pressable, ImageBackground, Image  } from 'react-native';
import { useSession } from '@/context/authContext';
import { router } from 'expo-router';
import tw from 'twrnc'; 
import { z } from 'zod'; 

// Define the validation schema using Zod
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path where the error will be shown
});

type Errors = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { register } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [errors, setErrors] = useState<Errors>({ email: '', password: '', confirmPassword: '' });

  const handleRegister = async () => {
    // Validate inputs using Zod
    const validationResult = registerSchema.safeParse({ email, password, confirmPassword });

    // Reset errors before validation
    setErrors({ email: '', password: '', confirmPassword: '' });

    if (!validationResult.success) {
      // If validation fails, set error messages for respective fields
      const errorMessages = validationResult.error.errors.reduce<Errors>((acc, err) => {
        acc[err.path[0] as keyof Errors] = err.message; // Map error messages to respective fields
        return acc;
      }, { email: '', password: '', confirmPassword: '' });

      setErrors(errorMessages);
      return; 
    }

    try {
      await register(email, password);
      
      router.replace('/');
    } catch (err) {
      setErrors({ ...errors, email: 'Registration failed. Please try again.' });
      Alert.alert('Registration Failed', 'Please check your details and try again.'); 
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
      <Text style={tw`text-6xl mb-6 text-white font-bold`}>SIGN UP</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        value={email}
        onChangeText={setEmail}
        style={tw`bg-white border border-gray-300 rounded-md p-2 mb-3`}
        autoCapitalize="none"
      />
      {errors.email ? <Text style={tw`text-red-500 mb-2`}>{errors.email}</Text> : null} 

      <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={tw`bg-white border border-gray-300 rounded-md p-2 mb-3`}
      />
      {errors.password ? <Text style={tw`text-red-500 mb-2`}>{errors.password}</Text> : null} 

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={'gray'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={tw`bg-white border border-gray-300 rounded-md p-2 mb-3`}
      />
      {errors.confirmPassword ? <Text style={tw`text-red-500 mb-4`}>{errors.confirmPassword}</Text> : null} 

      
      <Pressable
        onPress={handleRegister}
        style={({ pressed }) => [
          tw`bg-blue-600 rounded-md p-3`,
          pressed ? tw`bg-blue-500` : null, 
        ]}
      >
        <Text style={tw`text-white text-center`}>Register</Text>
      </Pressable>
      </View>
    </ImageBackground>
  );
}
