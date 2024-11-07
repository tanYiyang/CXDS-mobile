import { Image, Text, View } from 'react-native';
import { Link, Redirect, Stack, usePathname } from 'expo-router';
import tw from 'twrnc';
import { useSession } from '@/context/authContext';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const currentRoute = usePathname();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  /* invert session to turn off/on auth */
  if (session) {
    return <Redirect href="/sign-in" />;
  }

  const isUserRoute = currentRoute.startsWith('/user');
  const isTabRoute = ['/explore', '/profile', '/favorites', '/cart', '/payment', '/thankyou'].includes(currentRoute);

  return (
    <Stack
      screenOptions={{
        headerShown: !isUserRoute && !isTabRoute,
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitle: () =>
          currentRoute === '/home' ? (
            <View style={tw`flex-row items-center`}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={tw`h-10 w-10`}
                resizeMode="contain"
              />
              <Text style={tw`text-3xl text-white ml-2`}>Peek</Text>
            </View>
          ) : <></>,
        headerRight: () =>
          currentRoute !== '/user' ? (
            <View style={tw`flex-row pr-4`}>
              <Link href='/wishlist'>
                <View style={tw`h-6 w-6`}>
                  <Image source={require('@/assets/images/heart.png')} style={tw`h-6 w-6`} resizeMode="contain" />
                </View>
              </Link>
              <Link href='/wishlist'>
                <View style={tw`h-6 w-6`}>
                  <Image source={require('@/assets/images/bell.png')} style={tw`h-6 w-6`} resizeMode="contain" />
                </View>
              </Link>
              <Link href='/user'>
                <View style={tw`h-6 w-6`}>
                  <Image source={require('@/assets/images/profile.png')} style={tw`h-6 w-6`} resizeMode="contain" />
                </View>
              </Link>
            </View>
          ) : null,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          headerTitle: 'Wishlist',
          // Custom headerRight for the Wishlist screen
          headerRight: () => (
            <Link href='/cart'>
              <View style={tw`h-6 w-6`}>
                <Image source={require('@/assets/images/cart.png')} style={tw`h-6 w-6`} resizeMode="contain" />
              </View>
            </Link>
          ),
        }}
      />
      <Stack.Screen 
        name="product-details" 
        options={{ 
          title: 'product-details', 
          // Custom headerRight for the Wishlist screen
          headerRight: () => (
            <Link href='/cart'>
              <View style={tw`h-6 w-6`}>
                <Image source={require('@/assets/images/cart.png')} style={tw`h-6 w-6`} resizeMode="contain" />
              </View>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
