import React, { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, FlatList, Modal, ScrollView } from 'react-native';
import tw from 'twrnc';

interface Order {
  id: string;
  image: any; // Change this to ImageSourcePropType if you import it
  productName: string;
  status: string;
  deliveryDate: string;
  username: string;
  category: string; // New field for filtering by category
}

const ordersData: Order[] = [
  {
    id: '1',
    image: require('@/assets/images/tshirt.png'), // Placeholder for shirt image
    productName: 'Niek Shirt',
    status: 'Delivered',
    deliveryDate: 'Delivered On 12th October 2024',
    username: 'Krish',
    category: 'Shirts',
  },
  {
    id: '2',
    image: require('@/assets/images/tshirt.png'), // Placeholder for shoes image
    productName: 'Abibas Shoe',
    status: 'Arriving on...',
    deliveryDate: 'Dispatched / Shipping / Out For Delivery',
    username: 'Aneeket',
    category: 'Shoes',
  },
  {
    id: '3',
    image: require('@/assets/images/tshirt.png'), // Placeholder for shoes image
    productName: 'Abibas Shoe',
    status: 'Arriving on...',
    deliveryDate: 'Dispatched / Shipping / Out For Delivery',
    username: 'Aneeket',
    category: 'Shoes',
  },
];

const categories = ['Shirts', 'Shoes', 'Pants', 'Accessories'];

export default function Orders() {
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

  const OrderItem = ({ item }: { item: Order }) => (
    <View style={tw`flex-row bg-gray-900 p-4 m-2 mb-3 rounded-lg`}>
      <Image source={item.image} style={tw`h-20 w-20 rounded-md`} resizeMode="cover" />
      <View style={tw`ml-4 flex-row`}>
        <View style={tw`w-3/5`}>
          <View style={tw`flex-row items-center`}>
            <Image source={require('@/assets/images/user/delivered.png')} style={tw`w-5 h-5 top-0.5`} resizeMode="contain" />
            <Text style={tw`text-white font-semibold`}>{item.status}</Text>
          </View>
          <Text style={tw`text-white text-lg font-bold mt-1`}>{item.productName}</Text>
          <Text style={tw`text-gray-400`}>{item.deliveryDate}</Text>
        </View>
        <View style={tw`items-center w-1/3`}>
          <View style={tw`bg-purple-500 rounded-md w-16 py-0.5 items-center`}>
            <Text style={tw`text-white text-xs`}>{item.username}</Text>
          </View>
          <View style={tw`mt-2 gap-2 left-0.5`}>
            <Pressable style={tw`items-center`}>
              <Image source={require('@/assets/images/smiley.png')} style={tw`w-5 h-5 mr-1`} resizeMode="contain" />
            </Pressable>
            <Pressable style={tw`items-center`}>
              <Image source={require('@/assets/images/sad.png')} style={tw`w-5 h-5 mr-1`} resizeMode="contain" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

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

      {/* Orders List */}
      <FlatList
        data={ordersData.filter((order) => selectedCategories.length === 0 || selectedCategories.includes(order.category))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
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
      <View style={tw`absolute bottom-16 w-full items-center`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8`}
            resizeMode="contain"
          />
      </View>
    </View>
  );
}
