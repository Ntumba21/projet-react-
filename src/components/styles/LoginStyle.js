//LoginStyle.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
