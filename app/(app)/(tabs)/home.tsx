import { Image, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import { useSession } from '@/context/authContext';
import { router } from 'expo-router';
import tw from 'twrnc';
import { useState } from 'react';

export default function Index() {
  const { signOut } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const categories = [
    { label: 'EVERYDAY', path: '/men/tops/everyday' }, // Example paths
    { label: 'FORMAL', path: '/men/tops/formal' },
    { label: 'BEAT THE SUN', path: '/men/tops/beat-the-sun' },
    { label: 'BEAT THE COLD', path: '/men/tops/beat-the-cold' },
    { label: 'VINTAGE', path: '/men/tops/vintage' },
    { label: 'OUTDOOR', path: '/men/tops/outdoor' },
    { label: 'SPORTS', path: '/men/tops/sports' },
  ];

  const handleSignOut = () => {
    signOut();
    router.replace('/sign-in');
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      {/* Search Bar */}
      <View style={tw`bg-white m-2 flex-row items-center border border-gray-300 rounded-full h-12`}>
        {!isFocused && searchQuery === '' && (
          <Image
            source={require('@/assets/images/search.png')}
            style={tw`h-5 w-5 ml-4`}
            resizeMode="contain"
          />)}

        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search by keyword"
          placeholderTextColor="#A9A9A9"
          style={tw`p-2 ml-2 text-base w-full`}
        />
      </View>

      {/* ScrollView for vertical scrolling */}
      <ScrollView contentContainerStyle={tw`p-5 pt-10`}>

        {/* Style Your Way */}
        <Text style={tw`text-4xl font-bold text-white`}>STYLE YOUR WAY</Text>
        {/* Scrollable categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-2`}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={tw`mr-4 w-36 h-56 bg-gray-200 rounded-md justify-center items-center`}
              onPress={() => router.push(category.path)}
            >
              {/* Category Label */}
              <Text style={tw`text-black text-sm mt-2 font-semibold`}>{category.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Peek Into Insight*/}
        <Text style={tw`mt-4 text-4xl font-bold text-white`}>PEEK INTO INSIGHT</Text>
        {/* Scrollable categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-2`}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={tw`mr-4 w-36 h-56 bg-gray-200 rounded-md justify-center items-center`}
              onPress={() => console.log(`Navigate to ${category.label}`)}
            >
              {/* Category Label */}
              <Text style={tw`text-black text-sm mt-2 font-semibold`}>{category.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* In The Limelight*/}
        <Text style={tw`mt-4 text-4xl font-bold text-white`}>IN THE LIMELIGHT</Text>
        {/* Scrollable categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-2`}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={tw`mr-4 w-36 h-56 bg-gray-200 rounded-md justify-center items-center`}
              onPress={() => console.log(`Navigate to ${category.label}`)}
            >
              {/* Category Label */}
              <Text style={tw`text-black text-sm mt-2 font-semibold`}>{category.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Stylish Steals*/}
        <Text style={tw`mt-4 text-4xl font-bold text-white`}>STYLISH STEALS</Text>
        {/* Scrollable categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-2`}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={tw`mr-4 w-36 h-56 bg-gray-200 rounded-md justify-center items-center`}
              onPress={() => console.log(`Navigate to ${category.label}`)}
            >
              {/* Category Label */}
              <Text style={tw`text-black text-sm mt-2 font-semibold`}>{category.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
