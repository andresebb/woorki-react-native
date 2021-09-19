import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  onDebounce: (value: string) => void;
}

export const SearchInput = ({onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  const debouncedValue = useDebouncedValue(textValue, 1000);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Find a job"
        placeholderTextColor="#B5B5B5"
        style={styles.inputField}
        selectionColor="black"
        value={textValue}
        onChangeText={setTextValue}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.logoLeftContainer}>
        <Icon name="search-outline" size={20} color="#B5B5B5" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    marginRight: 60,
  },
  inputField: {
    color: '#1B1B1B',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 36,
    paddingLeft: 46,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  logoLeftContainer: {
    position: 'absolute',
    top: 14,
    left: 6,
  },
});
