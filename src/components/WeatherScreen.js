import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { Image } from 'react-native';

const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/w/${iconCode}.png`;
};

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission de localisation refusée.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const apiKey = "98b22d048fd53b33cb283d123eeece15";
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const currentWeatherResponse = await axios.get(currentWeatherUrl);
        setWeatherData(currentWeatherResponse.data);

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

  const getBackgroundImage = (weatherCode) => {
    const backgroundImageUrls = {
      '01d': 'https://postimg.cc/zb1wT8Bz',
      '01n': 'https://postimg.cc/1gVVWTT8',
      '02d': 'https://postimg.cc/9RGR29cV',
      '02n': 'https://postimg.cc/K1wDvnhg',
      '03d': 'https://postimg.cc/Y4Ff4htD',
      '03n': 'https://postimg.cc/jwVwBc0Z',
      '04d': 'https://postimg.cc/GTdBmppD',
      '04n': 'https://postimg.cc/dZ6hkK7x',
    };
  
    const keys = Object.keys(backgroundImageUrls);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return backgroundImageUrls[randomKey];
  };
  const backgroundStyle = {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  };

    return (
<ImageBackground
  source={{ uri: weatherData?.weather[0]?.icon && getBackgroundImage(weatherData.weather[0].icon) }}
  style={backgroundStyle}
>
  <View style={styles.container}>
    {weatherData ? (
      <View style={styles.weatherContainer}>
        <Text style={styles.locationText}>Location: {weatherData.name}</Text>
        <Image 
          source={{ uri: getWeatherIconUrl(weatherData.weather[0].icon) }}
          style={styles.weatherIcon}
        />
        <Text 
        style={styles.temperatureText}
        style={styles.temperatureTextContainer}                         >
          Temperature: {parseInt(kelvinToCelsius(weatherData.main.temp))} °C
        </Text>
        <Text style={styles.weatherDescriptionText}>
          Weather: {weatherData.weather[0].description}
        </Text>
      </View>
    ) : (
      <Text style={styles.loadingText}>Chargement des données météorologiques...</Text>
    )}

    {forecastData ? (
      <ScrollView
        horizontal
        contentContainerStyle={styles.forecastContainer}
      >
        {forecastData.list.map((item) => (
          <View key={item.dt} style={styles.forecastItem}>
            <Text>Date/Heure: {new Date(item.dt * 1000).toLocaleString()}</Text>
            <Text>Temperature: {parseInt(kelvinToCelsius(item.main.temp))} °C</Text>
            <Text>Weather: {item.weather[0].description}</Text>
            <Image
              source={{ uri: getWeatherIconUrl(item.weather[0].icon) }}
              style={styles.forecastIcon}
            />
            <Text style={styles.dividerText}> </Text>
          </View>
        ))}
      </ScrollView>
    ) : (
      <Text style={styles.loadingText}>Chargement des prévisions météorologiques...</Text>
    )}
  </View>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forecastContainer: {
    marginTop: 20,
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 20,
  },
  temperatureTextContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the color and opacity as needed
    padding: 15,
    marginBottom: 10,
  },
  
  temperatureText: {
    fontSize: 24,
  },
  
  weatherDescriptionText: {
    fontSize: 16,
    fontWeigth: 'bold', 
  },
  forecastHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  forecastItem: {
    marginBottom : 50,
    marginRight: 50,
    marginVertical: 50,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  forecastIcon: {
    width: 60,
    height: 60,
  },
  dividerText: {
    fontSize: 40,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  
});


export default WeatherScreen;