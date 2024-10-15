import { Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  // Fetch product details based on ID
  const product = {
    id,
    name: 'Basic T-Shirt',
    description: 'A comfortable and stylish t-shirt.',
    price: '$20',
  };

  return (
    <ScrollView contentContainerStyle={tw`p-6`}>
      <Text style={tw`text-3xl font-bold mb-4`}>{product.name}</Text>
      <Text style={tw`text-lg text-gray-500 mb-4`}>{product.description}</Text>
      <Text style={tw`text-2xl font-semibold mb-6`}>{product.price}</Text>
      {/* Add more product details */}
    </ScrollView>
  );
}
