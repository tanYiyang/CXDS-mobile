import { View, Text, Image, Pressable, ScrollView, ImageSourcePropType, Dimensions } from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function UserDashboard() {
    return (
        <ScrollView style={tw`bg-black`} contentContainerStyle={tw`px-6 pb-6`}>
            {/* Profile Section */}
            <View style={tw`border-b border-gray-500 pb-2`}>
                <View style={tw`flex-row justify-between`}>
                    <View style={tw`flex-row items-center`}>
                        <View style={tw`bg-gray-400 w-20 h-20 rounded-full justify-center items-center`}>
                            <Image source={require('@/assets/images/pfp.png')} style={tw`w-20 h-20`} resizeMode="contain" />
                        </View>
                        <View style={tw`ml-4`}>
                            <Text style={tw`text-white text-xs`}>Joined 04/22</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>Aneeket Das</Text>
                        </View>
                    </View>
                    <View>
                        <Pressable>
                            <Image source={require('@/assets/images/edit.png')} style={tw`h-5 w-5 right-4`} resizeMode="contain" />
                        </Pressable>
                    </View>
                </View>
                <View style={tw`items-end`}>
                    <Image source={require('@/assets/images/swipe.png')} style={tw`h-5 w-5 right-4`} resizeMode="contain" />
                    <Text style={tw`text-gray-400 text-xs`}>Swipe to swap accounts</Text>
                </View>
            </View>

            {/* Options Grid */}
            <View style={tw`mt-4`}>
                <View style={tw`items-center gap-4`}>
                    <DashboardButton imagename={require('@/assets/images/user/editpersonalisation.png')} label="Edit Personalization" destination="/user/edit"/>
                    <DashboardButton imagename={require('@/assets/images/user/savedaddresses.png')} label="Saved Addresses" destination="/user/address"/>
                    <DashboardButton imagename={require('@/assets/images/user/paymentmethods.png')} label="Payment Methods" destination="/user/payments"/>
                    <DashboardButton imagename={require('@/assets/images/user/orders.png')} label="Orders" destination="/user/orders"/>
                    <DashboardButton imagename={require('@/assets/images/user/customersupport.png')} label="Customer Support" destination="/user/customersupport"/>
                    <DashboardButton imagename={require('@/assets/images/user/referrals.png')} label="Referrals" destination="/user/referrals"/>
                </View>
            </View>

            {/* Footer Buttons */}
            <View style={tw`mt-10 items-center`}>
                <View style={tw`flex-row flex-wrap justify-between w-full gap-2`}>
                    <FooterButton label="FAQ" />
                    <FooterButton label="Privacy" />
                    <FooterButton label="T&C" />
                    <FooterButton label="Write to us" />
                </View>
                <Image
                    source={require('@/assets/images/user/logo.png')}
                    style={tw`h-8 w-8 mt-8`}
                    resizeMode="contain"
                />
            </View>
        </ScrollView>
    );
}

type DashboardButtonProps = {
    imagename: ImageSourcePropType;
    label: string;
    destination: string;
}

type FooterButtonProps = {
    label: string;
}

// Dashboard Button Component
function DashboardButton({ imagename, label, destination }: DashboardButtonProps) {
    return (
        <Link href={destination} asChild>
            <Pressable style={tw`bg-gray-800 w-4/5 h-20 justify-center items-center flex-row`}>
                <Image 
                    source={imagename} // Pass the image source as a variable
                    style={tw`h-5 w-5 mr-2`} 
                    resizeMode="contain" 
                />
                <Text style={tw`text-white text-base font-semibold`}>{label}</Text>
            </Pressable>
        </Link>
    );
}

// Footer Button Component
function FooterButton({ label }: FooterButtonProps) {
    const buttonWidth = screenWidth > 360 ? '20%' : '40%'; // Adjust based on screen width
    const fontSize = screenWidth > 360 ? 10 : 12; // Smaller font size for smaller screens

    return (
        <Pressable style={[tw`bg-gray-900 p-2 m-1 rounded-lg items-center`, { width: buttonWidth }]}>
            <Text style={[tw`text-white font-semibold`, { fontSize }]}>{label}</Text>
        </Pressable>
    );
}
