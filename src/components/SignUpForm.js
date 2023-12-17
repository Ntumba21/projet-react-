import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { styles } from './styles/SignupStyle';
import { useNavigation } from '@react-navigation/native';
import firebaseInstance from '../firebase';

const { auth, createUserWithEmailAndPassword } = firebaseInstance;

const SignUpForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const RegisterUser = async () => {
    console.log('RegisterUser function called');
    if (!email || !password || !agree) {
      setError('Please fill all fields and agree to the terms.');
      console.log('Error:', 'Please fill all fields and agree to the terms.');
      return;
    }

    setLoading(true);

    try {
      console.log('Before registration');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('After registration');

      console.log('Before navigation');
      Alert.alert('Account created!', 'Please check your email for further instructions.', [
        { text: 'OK', onPress: () => navigation.replace('WelcomePage') },
      ]);
      console.log('After navigation');

      setLoading(false);
    } catch (signupError) {
      setError(signupError.message);
      console.log('Signup Error:', signupError.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter your email"
      />

      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      <View style={styles.checkboxContainer}>
        <Switch
          value={agree}
          onValueChange={(value) => setAgree(value)}
        />
        <Text>I agree to the terms and conditions</Text>
      </View>

      <TouchableOpacity onPress={RegisterUser}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
