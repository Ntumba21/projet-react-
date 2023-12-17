// LoginForm.js
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './styles/LoginStyle';
import firebase from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const auth = getAuth();

  const loginUser = async () => {
    if (!validateEmail() || !validatePassword()) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Connexion réussie");

      // Rediriger vers WeatherScreen après une connexion réussie
      navigation.navigate("WeatherScreen");
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = () => {
    if (email.length === 0 || !email.includes("@")) {
      setEmailError("Email invalide");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError("Mot de passe invalide");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleAuthError = (error) => {
    if (error.code === "auth/user-not-found") {
      setEmailError("Aucun utilisateur trouvé avec cet e-mail.");
    } else if (error.code === "auth/wrong-password") {
      setPasswordError("Mot de passe incorrect.");
    } else {
      setEmailError("Échec de la connexion. Veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        // source={require("../../assets/Login.png")}
        style={styles.backgroundImage}
      />
      <Text style={styles.header}>Connexion</Text>
      <Text style={styles.subHeader}>Créer votre compte MéteoSama</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#8888"
          onChangeText={setEmail}
          onBlur={validateEmail}
          value={email}
        />
        {!!emailError && <Text style={styles.error}>{emailError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          placeholderTextColor="#8888"
          onChangeText={setPassword}
          onBlur={validatePassword}
          value={password}
        />
        {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          onPress={loginUser}
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
