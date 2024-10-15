import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function WishlistPage() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-black`}>
      <Text style={tw`text-white text-4xl`}>This is the Wishlist Page</Text>
    </View>
  );
}
