import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('UPI');

  const methods = [
    { name: 'UPI', icon: require('@/assets/images/cart/upi.png') },
    { name: 'Credit Card/Debit Card', icon: require('@/assets/images/cart/creditcard.png') },
    { name: 'Cash on Delivery', icon: require('@/assets/images/cart/cashondelivery.png') },
    { name: 'Net Banking', icon: require('@/assets/images/cart/netbanking.png') },
  ];

  return (
    
    <View style={tw`bg-black`}>
    <View style={tw`flex-row justify-between items-center p-4 mt-5 bg-gray-900`}>
      {/* Cancel Button */}
      <Link href={{pathname: '/cart'}} asChild>
      <TouchableOpacity>      
        <Text style={tw`text-white text-lg`}>CANCEL</Text>
      </TouchableOpacity>
      </Link>

    </View>

      <View style={tw`w-full h-full bg-black p-6`}>
      {/* Title */}
      <Text style={tw`text-white text-lg font-bold mb-6`}>SELECT PAYMENT METHOD</Text>
      
      {/* Payment Options */}
      <View style={tw`bg-gray-900 rounded-lg`}>
        {methods.map((method, index) => (
          <TouchableOpacity
            key={method.name}
            onPress={() => setSelectedMethod(method.name)}
            style={[
              tw`flex-row items-center p-4`,
              selectedMethod === method.name ? tw`bg-gray-800` : null,
              index < methods.length - 1 ? tw`border-b border-gray-700` : null,
            ]}
          >
            <Image source={method.icon} style={tw`h-8 w-8 mr-4`} resizeMode='contain'/>
            <Text style={tw`text-white text-base`}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <View style={tw`top-10`}>

      <Link href={{pathname: '/thankyou'}} asChild>
      <TouchableOpacity style={tw`bg-yellow-400 rounded-lg py-4`}>
        <Text style={tw`text-black text-center font-bold text-base`}>CONTINUE</Text>
      </TouchableOpacity>
      </Link>
      
      </View>
      <View style={tw`items-center mt-103`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8`}
            resizeMode="contain"
          />
      </View>
    </View>

    </View>
  );
}
