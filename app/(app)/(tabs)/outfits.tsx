import React from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import tw from 'twrnc';

const outfits = [
  {
    id: '1',
    shirt: require('@/assets/images/outfits/shirt.png'),
    tie: require('@/assets/images/outfits/tie.png'),
    watch: require('@/assets/images/outfits/watch.png'),
    pants: require('@/assets/images/outfits/pants.png'),
    shoes: require('@/assets/images/outfits/shoe.png'),
  },
  {
    id: '2',
    shirt: require('@/assets/images/recommended1.png'),
    pants: require('@/assets/images/recommended1.png'),
    shoes: require('@/assets/images/recommended1.png'),
  },
  {
    id: '3',
    shirt: require('@/assets/images/tshirt.png'),
    pants: require('@/assets/images/tshirt.png'),
    shoes: require('@/assets/images/tshirt.png'),
  },
  {
    id: '4',
    shirt: require('@/assets/images/recommended1.png'),
    pants: require('@/assets/images/recommended1.png'),
    shoes: require('@/assets/images/recommended1.png'),
  },
  {
    id: '5',
    shirt: require('@/assets/images/tshirt.png'),
    pants: require('@/assets/images/tshirt.png'),
    shoes: require('@/assets/images/tshirt.png'),
  },
  // Add more outfits here
];

const screenHeight = Dimensions.get('window').height;

const OutfitCard = ({ outfit }) => (
  <View style={[tw`w-full justify-center items-center gap-2 bottom-12`, {height: screenHeight}]}>
    
    <View style={tw`w-full h-25% flex-row`}>

    <View style={tw`w-1/2 h-25% flex-col gap-2`}>
    <Image source={outfit.tie} style={tw`w-1/2 h-full`} resizeMode="contain" />
    <Image source={outfit.watch} style={tw`w-1/2 h-full`} resizeMode="contain" />
    </View>

    <Image source={outfit.shirt} style={tw`w-1/2 h-full right-28`} resizeMode="contain" />

    </View>
    
    <Image source={outfit.pants} style={tw`w-1/2 h-25%`} resizeMode="contain" />
    <Image source={outfit.shoes} style={tw`w-43% h-20%`} resizeMode="contain" />
  </View>
);

export default function OutfitsPage() {
  

  return (
    <View style={tw`flex-1 bg-black`}>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OutfitCard outfit={item} />}
        pagingEnabled
        snapToInterval={screenHeight} // Snap each scroll to screen height
        snapToAlignment="start" // Ensures each item starts at the top of the screen
        decelerationRate="fast"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        
      />
    </View>
  );
}
