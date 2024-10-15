import { Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';

export default function MenCategories() {
  return (
    <View style={tw`flex-1 justify-center p-6`}>
      <Text style={tw`text-3xl font-bold mb-6 text-center`}>Men's Clothing</Text>
      
      <Link href="/men/tops" style={tw`mb-4`}>
        <Pressable style={tw`bg-blue-600 p-3 rounded-md`}>
          <Text style={tw`text-white text-center`}>Tops</Text>
        </Pressable>
      </Link>
      <Link href="/men/bottoms" style={tw`mb-4`}>
        <Pressable style={tw`bg-blue-600 p-3 rounded-md`}>
          <Text style={tw`text-white text-center`}>Bottoms</Text>
        </Pressable>
      </Link>
     
    </View>
  );
}
