import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { styles } from './styles/SignupStyle';
import { useNavigation } from '@react-navigation/native';
import firebaseInstance from '../firebase';

const { auth, createUserWithEmailAndPassword, sendEmailVerification } = firebaseInstance;

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
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      // Rediriger vers l'écran de connexion après une inscription réussie
      navigation.navigate('LoginForm'); // Remplacez 'Login' par le nom de votre écran de connexion

      Alert.alert('Verification email sent!', 'Please check your email to verify your account.');
      setLoading(false);
    } catch (signupError) {
      setError(signupError.message);
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
