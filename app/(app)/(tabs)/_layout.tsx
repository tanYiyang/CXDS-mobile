import { Tabs } from "expo-router";
import { Image } from "react-native";
import tw from 'twrnc';


export default function TabsLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: 'black' },
                tabBarShowLabel: false,
                headerShown: false,

            }}
        >


            <Tabs.Screen
                name="explore"
                options={{
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