import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();
  const [isWelcomeMessageVisible, setWelcomeMessageVisible] = useState(true);

  const handleButtonClick = () => {
    // Utilisez navigation pour naviguer vers la prochaine page
    navigation.navigate('NextPage');
  };

  const handleBackPress = () => {
    if (isWelcomeMessageVisible) {
      // Si le message de bienvenue est visible, masquer le message
      setWelcomeMessageVisible(false);
    } else {
      // Sinon, quitter l'application
      handleExit();
    }

    // Indiquer que le gestionnaire d'événements a été traité
    return true;
  };

  const hideWelcomeMessage = () => {
    setWelcomeMessageVisible(false);
  };

  const handleLogin = () => {
    // Utilisez navigation pour naviguer vers la page de connexion
    navigation.navigate('LoginForm');
  };

  const handleSignUp = () => {
    // Utilisez navigation pour naviguer vers la page d'inscription
    navigation.navigate('SignUpForm');
  };

  const handleExit = () => {
    // Vous pouvez personnaliser cette fonction pour quitter l'application
    console.log("Quitter l'application");
    // Notez que cette méthode est utilisée pour l'exemple, vous pouvez utiliser des bibliothèques de gestion de navigation pour une meilleure expérience utilisateur.
    // Par exemple, vous pourriez utiliser react-navigation et sa fonction popToTop pour retourner à l'écran d'accueil.
    BackHandler.exitApp(); // Cette ligne quitte l'application réellement
  };

  return (
    <View style={styles.container}>
      {isWelcomeMessageVisible && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.header}>Bienvenue à MéTeo Sama</Text>
          <Text style={styles.welcomeText}>
            Nous sommes ravis de vous accueillir dans notre application. Prêt à découvrir MéTeo Sama?
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Avez-vous déjà un compte?" onPress={handleLogin} disabled={!isWelcomeMessageVisible} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Voulez-vous faire partie de l'aventure?" onPress={handleSignUp} disabled={!isWelcomeMessageVisible} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Quitter l'application" onPress={handleExit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
});

export default WelcomePage;