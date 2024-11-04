import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import tw from 'twrnc';

export default function ForgotPasswordScreen() {
  const [step, setStep] = useState(1); // Track current step in the process
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']); // Array for each code digit
  const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]; // Refs for each input

  // Mock function to send verification code (replace with actual API call)
  const handleSendVerification = () => {
    if (email) {
      // Logic to send verification code to the provided email
      setStep(2); // Move to the next step without changing pages
    }
  };

  // Handle input for each verification code digit
  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input
    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }
  };

  // Mock function to verify code (replace with actual API call)
  const handleVerifyCode = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // Logic to verify the code
      console.log("Code verified. Proceed with login or reset password.");
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

      <View style={tw`flex-1 justify-center items-center p-6`}>
        {step === 1 ? (
          // Step 1: Enter Email
          <View style={tw`w-full`}>
            <Text style={tw`text-white text-6xl font-bold mb-4`}>Forgot Your Password?</Text>
            <Text style={tw`text-white text-xl font-semibold mb-4`}>Enter your email address to receive a verification code.</Text>
            <TextInput
              style={tw`border bg-white border-white p-2 rounded-lg mb-4`}
              placeholder="Email"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={tw`bg-blue-500 p-3 rounded-lg`} onPress={handleSendVerification}>
              <Text style={tw`text-white text-center`}>Send Verification Code</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Step 2: Enter Verification Code
          <View style={tw`w-full`}>
            <Text style={tw`text-white text-6xl font-bold`}>ENTER</Text>
            <Text style={tw`text-white text-4xl font-bold`}>Verification Code</Text>
            <Text style={tw`text-white text-2xl font-bold mb-4`}>Sent to cx****@gmail.com</Text>
            <View style={tw`flex-row justify-center mb-10`}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={inputs[index]}
                  style={tw`border-b border-white text-white text-lg text-center mx-2 w-12 h-12 rounded`}
                  maxLength={1}
                  keyboardType="numeric"
                  value={digit}
                  onChangeText={(value) => handleCodeChange(value, index)}
                />
              ))}
            </View>
            <TouchableOpacity style={tw`bg-green-500 p-3 rounded-lg w-40 mx-auto`} onPress={handleVerifyCode}>
              <Text style={tw`text-white text-center`}>Verify Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
