import React, { useState } from 'react';
import { View, Text, TextInput, Image, Pressable, FlatList, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';
import WishlistProduct from '@/components/WishlistProduct'; // Make sure this path is correct based on your file structure
import { router } from 'expo-router';
import { Link } from 'expo-router';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageSource: any; // Replace with ImageSourcePropType if available
  category: string;
}

const wishlistData: WishlistItem[] = [
  {
    id: '1',
    name: 'Niek Shirt',
    price: 1038.5,
    originalPrice: 2077,
    imageSource: require('@/assets/images/tshirt.png'),
    category: 'Shirts',
  },
  {
    id: '2',
    name: 'Abibas Shoe',
    price: 799.99,
    originalPrice: 1200,
    imageSource: require('@/assets/images/tshirt.png'),
    category: 'Shoes',
  },
  {
    id: '3',
    name: 'Stylish Pants',
    price: 649.99,
    originalPrice: 999,
    imageSource: require('@/assets/images/tshirt.png'),
    category: 'Pants',
  },
];

const categories = ['Shirts', 'Shoes', 'Pants', 'Accessories'];

export default function Wishlist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prevCategories) => prevCategories.filter((c) => c !== category));
  };

  return (
    <View style={tw`w-full h-full bg-black`}>
      {/* Header */}
      <View style={tw`flex-row mb-2`}>
        <View style={tw`bg-[#fffff0] m-2 flex-row items-center border border-gray-300 rounded-lg h-10 w-76`}>
          {!isFocused && searchQuery === '' && (
            <Image source={require('@/assets/images/search.png')} style={tw`h-5 w-5 ml-4`} resizeMode="contain" />
          )}
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search"
            placeholderTextColor="#A9A9A9"
            style={tw`p-2 ml-2 text-base`}
          />
        </View>
        <View style={tw`justify-center w-1/4`}>
          <Pressable onPress={() => setFilterModalVisible(true)} style={tw`ml-3 p-2 bg-gray-700 rounded-lg h-10 items-center justify-center flex-row`}>
            <Text style={tw`text-white`}>FILTER</Text>
            <Image source={require('@/assets/images/filter.png')} style={tw`w-4 h-4 ml-2`} resizeMode="contain" />
          </Pressable>
        </View>
      </View>

      {/* Selected Categories with Remove Option */}
      <View style={tw`flex-row flex-wrap mb-1 pl-2`}>
        {selectedCategories.map((category) => (
          <View key={category} style={tw`flex-row items-center bg-gray-800 px-3 py-1 rounded-full mr-2 mb-2`}>
            <Text style={tw`text-white mr-2`}>{category}</Text>
            <Pressable onPress={() => removeCategory(category)}>
              <Text style={tw`text-white font-bold`}>×</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {/* Wishlist Items List */}
      <FlatList
        data={wishlistData.filter((item) => selectedCategories.length === 0 || selectedCategories.includes(item.category))}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={tw`justify-between px-2`}
        renderItem={({ item }) => (
          
          <WishlistProduct
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            imageSource={item.imageSource}
          />
          
        )}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-75`}>
          <View style={tw`bg-gray-800 p-5 rounded-lg w-3/4`}>
            <Text style={tw`text-white text-lg font-bold mb-3`}>Select Categories</Text>
            <ScrollView style={tw`mb-5`}>
              {categories.map((category) => (
                <Pressable key={category} onPress={() => toggleCategory(category)} style={tw`flex-row items-center mb-2`}>
                  <View style={tw`w-5 h-5 rounded-full mr-3 ${selectedCategories.includes(category) ? 'bg-purple-500' : 'bg-gray-700'}`} />
                  <Text style={tw`text-white`}>{category}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={() => setFilterModalVisible(false)} style={tw`bg-purple-500 py-2 rounded-md`}>
              <Text style={tw`text-center text-white`}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
