import React, { useRef, useEffect } from 'react';
import { View, Animated, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';

const Loading = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create a looped animation sequence
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 900, // Total duration for one full cycle
          useNativeDriver: true,
          
        }),
        
      ])
    ).start();
  }, [animation]);

  // Interpolating opacity for each dot based on the single animated value
  const dot1Opacity = animation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [1, 0, 0, 0], // Fades in at start, fades out as next dot starts
  });

  const dot2Opacity = animation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0, 1, 0, 0], // Fades in after first dot, fades out before third
  });

  const dot3Opacity = animation.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: [0, 0, 1, 0], // Fades in last, fades out before cycle restarts
  });

  return (
    <View style={tw`w-full h-full bg-black`}>
          <View style={tw`flex-row justify-between items-center p-4 mt-5 bg-gray-900`}>
      {/* Cancel Button */}
      <Link href={{pathname: '/cart'}} asChild>
      <TouchableOpacity>      
        <Text style={tw`text-white text-lg`}>CANCEL</Text>
      </TouchableOpacity>
      </Link>

    </View>
    <View style={tw`items-center my-auto`}>
      <Text style={tw`text-white text-2xl mb-4`}>Processing Payment...</Text>
      <View style={tw`flex-row`}>
        <Animated.View style={[tw`h-3 w-3 rounded-full bg-white mx-1`, { opacity: dot1Opacity }]} />
        <Animated.View style={[tw`h-3 w-3 rounded-full bg-white mx-1`, { opacity: dot2Opacity }]} />
        <Animated.View style={[tw`h-3 w-3 rounded-full bg-white mx-1`, { opacity: dot3Opacity }]} />
      </View>

      </View>
      <View style={tw`bottom-14 items-center`}>
      <Image
            source={require('@/assets/images/user/logo.png')}
            style={tw`h-8 w-8 top-8`}
            resizeMode="contain"
          />
      </View>
    </View>
  );
};

export default Loading;
