import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, Image } from 'react-native';
import tw from 'twrnc';

interface Address {
  id: string;
  addressLine: string;
}

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', addressLine: 'Flat 405, Padmja Towers, City A' },
    { id: '2', addressLine: 'Flat 102, Green Valley Apartments, City B' },
    { id: '3', addressLine: 'House 10, Sunrise Villas, City C' },
    { id: '4', addressLine: 'Villa 202, Ocean Heights, City D' },
  ]);

  const handleDelete = (id: string) => {
    setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
  };

  const handleEdit = (id: string) => {
    // Navigate to edit address screen with the selected address ID
    console.log("Edit address with ID:", id);
  };

  const handleAddAddress = () => {
    // Navigate to add address screen
    console.log("Navigate to Add Address screen");
  };

  const renderItem = ({ item }: { item: Address }) => (
    <View style={tw`flex-row items-center border border-white bg-black rounded-xl p-3 mb-3`}>
      <Pressable style={tw`flex-1 flex-row items-center `}>
        <View style={tw`w-5 h-5 rounded-full border-2 border-white mr-3`} />
        <Text style={tw`text-white`}>{item.addressLine}</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(item.id)}>
        <Image source={require('@/assets/images/user/delete.png')} style={tw`w-5 h-5 mx-3`} />
      </Pressable>
      <Pressable onPress={() => handleEdit(item.id)}>
        <Image source={require('@/assets/images/edit.png')} style={tw`w-5 h-5`} />
      </Pressable>

    </View>
  );

  return (
    <View style={tw`w-full h-full bg-black p-4`}>
      <Text style={tw`text-2xl text-white font-bold mb-4`}>Address List</Text>
      <View>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={tw`mb-4`}
      />
      </View>
      
      <Pressable
        onPress={handleAddAddress}
        style={tw`bg-gray-200 rounded-3xl p-4 items-center justify-center`}
      >
        <Text style={tw`text-3xl text-gray-800`}>+</Text>
      </Pressable>
      <View style={tw`absolute bottom-16 w-full items-center`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8 left-4`}
            resizeMode="contain"
          />
      </View>
    </View>
  );
}
