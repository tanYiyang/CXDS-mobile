import { Image, Text, View } from 'react-native';
import { Link, Redirect, Stack, usePathname } from 'expo-router';
import tw from 'twrnc';
import { useSession } from '@/context/authContext';


export default function AppLayout() {
  const { session, isLoading } = useSession();
  const currentRoute = usePathname()

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  const isUserRoute = currentRoute.startsWith('/user');

  return (
    <Stack
      screenOptions={{
        headerShown: !isUserRoute,
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitle: () => (
          currentRoute === '/home' ? (
            <View style={tw`flex-row items-center`}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={tw`h-10 w-10`}
                resizeMode="contain"
              />
              <Text style={tw`text-3xl text-white ml-2`}>Peek</Text>
            </View>
          ) : (<></>)
        ),
        // Conditionally render the headerLeft and headerRight based on the current route
        headerRight: () => 
          currentRoute !== '/user' ? 
          (
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


            <Link href='/user' >
              <View style={tw`h-6 w-6`}>
                <Image source={require('@/assets/images/profile.png')} style={tw`h-6 w-6`} resizeMode="contain" />
              </View>
            </Link>
          </View>
        ): null,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
