import {StyleSheet} from 'react-native';

export const SignButtonStyle = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
