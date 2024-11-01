import React from 'react';
import { View, Text, Image, Pressable, FlatList } from 'react-native';
import tw from 'twrnc';

// Sample Data
const upiData = [
  { id: '1', upiId: '9177583454@ybl' },
  { id: '2', upiId: 'knightriderytz-01@hdfc' },
  { id: '3', upiId: 'Shreyadas283@sbi' },
];

const cardData = [
  { id: '1', bank: 'HDFC Bank', type: 'Credit Card', holder: 'Aneeket Das', lastDigits: '4482' },
  { id: '2', bank: 'ICICI Bank', type: 'Debit Card', holder: 'Krish Vihaan', lastDigits: '6823' },
];

// Payment Methods Page Component
export default function PaymentMethods() {
  return (

    <View style={tw`w-full h-full bg-black p-5`}>
      {/* UPI Section */}
      <Text style={tw`text-white text-lg font-semibold mb-3`}>UPI</Text>
      <View>
      <FlatList
        data={upiData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center justify-between bg-gray-900 px-4 py-3 mb-2 rounded-lg`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`h-5 w-5 bg-pink-500 rounded-full mr-3`} />
              <Text style={tw`text-white`}>{item.upiId}</Text>
            </View>
            <Pressable onPress={() => console.log(`Delete UPI: ${item.upiId}`)}>
              <Image source={require('@/assets/images/user/delete.png')} style={tw`h-5 w-5`} />
            </Pressable>
          </View>
        )}
      />
      </View>

    <View style={tw`mt-5`}>
      {/* Cards Section */}
      <Text style={tw`text-white text-lg font-semibold mb-3`}>Cards</Text>
      
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-gray-900 p-4 mb-3 rounded-lg`}>

            <View style={tw`flex-row items-center justify-between`}>
                
            <View style={tw`flex-row items-center`}>
            <Image source={require('@/assets/images/user/bank1.png')} style={tw`w-20 h-16 mr-2`} resizeMode='contain'/>
            <View>
            <Text style={tw`text-white font-semibold`}>
                {item.type.toUpperCase()}
              </Text>
              </View>
            </View>

              <Image source={require('@/assets/images/user/creditcard.png')} style={tw`h-4 w-8`} />
            </View>

            <Text style={tw`text-white text-lg font-semibold mt-2`}>{item.holder}</Text>
            <Text style={tw`text-gray-400 text-base`}>**** **** **** {item.lastDigits}</Text>
            <View style={tw`flex-row items-center justify-end mt-2`}>
              <Pressable onPress={() => console.log(`Remove Card: ${item.holder}`)} style={tw`flex-row items-center`}>
                <Image source={require('@/assets/images/user/delete.png')} style={tw`h-5 w-5 mr-2`} />
                <Text style={tw`text-red-500`}>REMOVE</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
      {/* Add Button */}
      <Pressable
        onPress={() => console.log('Add new payment method')}
        style={tw`bg-gray-300 h-12 w-1/3 rounded-full justify-center items-center self-center mt-5`}
      >
        <Text style={tw`text-black text-2xl`}>+</Text>
      </Pressable>
      

      <View style={tw`absolute bottom-16 w-full items-center`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8 left-5`}
            resizeMode="contain"
          />
      </View>
    </View>
  );
}
