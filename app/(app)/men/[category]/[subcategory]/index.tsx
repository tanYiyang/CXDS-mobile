import { Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import tw from 'twrnc';

export default function ClothingList() {
  const router = useRouter();
  const pathname = usePathname(); // e.g., "/men/tops/t-shirts"

  // Sample product data
  const products = [
    { id: 1, name: 'Basic T-Shirt', price: '$20' },
    { id: 2, name: 'V-Neck T-Shirt', price: '$25' },
    // Add more products
  ];

  return (
    <ScrollView contentContainerStyle={tw`p-6`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Products in {pathname.split("/").pop()}</Text>
      {products.map((product) => (
        <Pressable
          key={product.id}
          style={tw`bg-gray-100 mb-4 p-4 rounded-md`}
          onPress={() => router.push(`/product-details?id=${product.id}`)}
        >
          <Text style={tw`text-lg`}>{product.name}</Text>
          <Text style={tw`text-sm text-gray-500`}>{product.price}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
