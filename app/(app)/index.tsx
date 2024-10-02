import { Text, View, Button } from 'react-native';
import { useSession } from '@/context/authContext';
import { router } from 'expo-router';

export default function Index() {
  const { signOut } = useSession();

  const handleSignOut = () => {
    signOut();
    // After signing out, redirect to the sign-in page
    router.replace('/sign-in'); // Use replace to prevent going back to the previous page
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 24 }}>Welcome to the Main Page</Text>
      
      {/* Sign Out Button */}
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
