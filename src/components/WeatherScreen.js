// WeatherScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        // Demander la permission de localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission de localisation refusée.');
          return;
        }

        // Obtenir la position actuelle de l'appareil
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Appeler l'API OpenWeatherMap avec les coordonnées pour les données actuelles
        const apiKey = "98b22d048fd53b33cb283d123eeece15";
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const currentWeatherResponse = await axios.get(currentWeatherUrl);
        setWeatherData(currentWeatherResponse.data);

        // Appeler l'API OpenWeatherMap avec les coordonnées pour les prévisions météorologiques
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const forecastResponse = await axios.get(forecastUrl);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error('Error getting location or weather data', error);
      }
    };

    getLocationAndWeather();
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
    <View>
      {weatherData ? (
        <View>
          <Text>Location: {weatherData.name}</Text>
          <Text>Temperature: {kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</Text>
          <Text>Weather: {weatherData.weather[0].description}</Text>
        </View>
      ) : (
        <Text>Chargement des données météorologiques...</Text>
      )}

      {forecastData ? (
        <View>
          <Text>Prévisions météorologiques:</Text>
          <FlatList
            data={forecastData.list}
            keyExtractor={(item) => item.dt.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>Date/Heure: {new Date(item.dt * 1000).toLocaleString()}</Text>
                <Text>Temperature: {kelvinToCelsius(item.main.temp).toFixed(2)} °C</Text>
                <Text>Weather: {item.weather[0].description}</Text>
                <Text>------------------------------------</Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text>Chargement des prévisions météorologiques...</Text>
      )}
    </View>
  );
};

export default WeatherScreen;
