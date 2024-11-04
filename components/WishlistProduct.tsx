import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

interface WishlistProductCardProps {
  name: string;
  price: number;
  originalPrice: number;
  imageSource: any;
}

const WishlistProduct: React.FC<WishlistProductCardProps> = ({ name, price, originalPrice, imageSource }) => {
  return (
    <View style={tw`w-[47%] bg-black rounded-lg mb-4 overflow-hidden`}>
      {/* Product Image */}
      <View style={tw`border-l-2 border-yellow-500`}>
      <Pressable onPress={() => router.push(`/product-details?id=${1}`)}>
        <Image source={imageSource} style={tw`h-60 w-full bg-[#fef7e6]`} resizeMode="contain" />
        </Pressable>
      </View>

      {/* Product Info */}
      <View style={tw`p-2`}>
        <Text style={tw`text-gray-400 text-xs`}>NIEK</Text>
        <Text style={tw`text-white font-bold text-sm`}>{name}</Text>
        
        {/* Price */}
        <View style={tw`flex-row items-center justify-between`}>
          <View>
          <Text style={tw`text-[#c887fd] text-sm font-bold mr-2`}>${price.toFixed(2)}</Text>
          <Text style={tw`text-red-500 text-xs line-through`}>${originalPrice.toFixed(2)}</Text>
          </View>

        {/* Add to Bag Button */}
        <TouchableOpacity style={tw`bg-[#fef7e6] rounded-full p-0.5 px-2`}>
          <Text style={tw`text-black text-center font-bold text-xs`}>ADD TO BAG</Text>
        </TouchableOpacity>

        </View>


      </View>
    </View>
  );
};

export default WishlistProduct;
