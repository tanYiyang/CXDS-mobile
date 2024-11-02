import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Loading from '@/components/Loading' // Adjust the path if needed
import tw from 'twrnc';
import { Link } from 'expo-router';

const Thankyou = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period, replace with actual loading logic
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={tw`w-full h-full bg-black`}>
      <View style={tw`flex-row justify-between items-center p-4 mt-5 bg-gray-900`}>
        {/* Cancel Button */}
        <Link href={{ pathname: '/home' }} asChild>
          <TouchableOpacity>
            <Text style={tw`text-white text-lg`}>RETURN</Text>
          </TouchableOpacity>
        </Link>

      </View>
      <View style={tw`items-center my-auto bottom-24 gap-2`}>
      <Image source={require('@/assets/images/cart/thankyou.png')} style={tw`h-24 w-24`} resizeMode="contain"/>
      <Text style={tw`text-white font-bold text-4xl`}>Order Confirmed</Text>
      <Text style={tw`text-white font-bold text-4xl`}>Thank You!</Text>
      </View>
      <View style={tw`bottom-14 items-center`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8`}
            resizeMode="contain"
          />
      </View>
      </View>


  );
};

export default Thankyou;
