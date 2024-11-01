import { Stack } from 'expo-router';


export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff',
        
        
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Profile' }}/>               
      <Stack.Screen name="edit/index" options={{ title: 'Edit Personalization' }}/>  
      <Stack.Screen name="address/index" options={{ title: 'Saved Addresses' }}/>  
      <Stack.Screen name="payments/index" options={{ title: 'Payment Methods' }}/>  
      <Stack.Screen name="orders/index" options={{ title: 'Orders' }}/>  
    </Stack>
  );
}
