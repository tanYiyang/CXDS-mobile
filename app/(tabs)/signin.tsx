import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const router = useRouter();

  const handleConfirm = () => {
    console.log('Mobile Number:', mobileNumber);
    // Navigate to another screen if needed
    // router.push('/nextScreen');
  };

  return (
    <View style={styles.container}>
      {/* Top logo and text */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Peek</Text>
      </View>

      {/* Sign-In Text */}
      <Text style={styles.signInText}>SIGN IN</Text>

      {/* Mobile Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
      </View>

      {/* Confirm Button */}
      <Button title="Confirm" onPress={handleConfirm} color="#6A5ACD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'radial-gradient(circle, tan 0%, rosewood 20%, strato 40%, stone 75%)', // Your background gradient
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  signInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});
