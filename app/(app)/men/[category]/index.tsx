import { Text, View, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';
import tw from 'twrnc';

export default function Subcategories() {
  const pathname = usePathname(); // Will help with dynamic paths like "/men/tops"

  return (
    <View style={tw`flex-1 justify-center p-6`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>
        {pathname.includes("tops") ? "Tops" : "Bottoms"}
      </Text>
      
      <Link href={`${pathname}/t-shirts`} style={tw`mb-4`}>
        <Pressable style={tw`bg-blue-600 p-3 rounded-md`}>
          <Text style={tw`text-white text-center`}>T-Shirts</Text>
        </Pressable>
      </Link>
      <Link href={`${pathname}/jackets`} style={tw`mb-4`}>
        <Pressable style={tw`bg-blue-600 p-3 rounded-md`}>
          <Text style={tw`text-white text-center`}>Jackets</Text>
        </Pressable>
      </Link>
    </View>
  );
}
