import { Tabs, usePathname } from "expo-router";
import { Image } from "react-native";
import tw from 'twrnc';


export default function TabsLayout() {
    const currentRoute = usePathname()
    
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: 'black' },
                tabBarShowLabel: false,
                headerShown: currentRoute != '/home',
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: '#fff',
                headerTitleAlign: 'left',

            }}
        >


            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: () => (
                        <Image
                            source={require('@/assets/images/eye.png')}
                            style={[
                                tw`h-6 w-7`,

                            ]}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => (
                        <Image
                            source={require('@/assets/images/profile.png')}
                            style={[
                                tw`h-6 w-6`,

                            ]}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: () => (
                        <Image
                            source={require('@/assets/images/home.png')}
                            style={[
                                tw`h-6 w-6`,

                            ]}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: () => (
                        <Image
                            source={require('@/assets/images/star.png')}
                            style={[
                                tw`h-6 w-6`,

                            ]}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: () => (
                        <Image
                            source={require('@/assets/images/cart.png')}
                            style={[
                                tw`h-6 w-6`,

                            ]}
                        />
                    ),
                }}
            />
        </Tabs>

    )
}