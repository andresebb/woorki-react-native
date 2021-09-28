import {transform} from '@babel/core';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';

import {BackgroundWhite} from '../components/BackgroundWhite';
import SmallLogo from '../components/SmallLogo';
import MapView from 'react-native-maps';

const categories = [
  {name: 'HouseKeeping'},
  {name: 'LansCaping'},
  {name: 'Construction'},
  {name: 'Warehouse'},
  {name: 'Kitchen'},
  {name: 'Bartender'},
  {name: 'Hoteleria'},
  {name: 'Other'},
];

export const CreateJobScreen = () => {
  const [categorySelected, setCategorySelected] = useState('HouseKeeping');
  const [visible, setVisible] = useState(false);

  const [arrow, setArrow] = useState('0deg');
  const [show, setShow] = useState('none');

  useEffect(() => {
    changeVisibility();
  }, [visible]);

  // Change chooseCategoryBoxVisibility, arrowTransform, CategorySelected
  const changeVisibility = (category?: any) => {
    if (category) setCategorySelected(category);

    if (visible === true) {
      setShow('flex');
      setArrow('180deg');
    } else {
      setShow('none');
      setArrow('0deg');
    }
  };

  return (
    <BackgroundWhite>
      <View style={styles.containerScreenTitle}>
        <SmallLogo />
        <Text style={styles.screenTitle}>New Job</Text>
      </View>
      <ScrollView
        style={{
          padding: 12,
        }}>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Job title</Text>
          <TextInput style={styles.inputField} placeholder="housekeeping" />
        </View>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Job Place</Text>
          <TextInput style={styles.inputField} placeholder="Hyatt Hotel" />
        </View>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Which category ?</Text>
          {/* Category Selected */}
          <TouchableOpacity
            style={styles.chooseCategoryField}
            activeOpacity={0.4}
            onPress={() => setVisible(!visible)}>
            <Text>{categorySelected}</Text>
            <Icon
              name="chevron-down-outline"
              size={20}
              style={{
                transform: [{rotateX: arrow}],
              }}
            />
          </TouchableOpacity>

          {/*Choose category box */}
          <ScrollView
            style={{
              ...styles.chooseCategoryBox,
              display: show,
            }}>
            {categories.map(category => {
              return (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => {
                    setVisible(!visible), changeVisibility(category.name);
                  }}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Description about the job</Text>
          <TextInput
            style={styles.inputFieldDescription}
            placeholder="We are looking for a very responsible person..."
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Street Address</Text>
          <TextInput
            style={styles.inputField}
            placeholder="4689 Warren Pkway Frisco."
          />
        </View>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput style={styles.inputField} placeholder="Dallas" />
        </View>
        <View style={styles.boxContaier}>
          <Text style={styles.inputTitle}>Hour</Text>
          <TextInput style={styles.inputField} placeholder="20.00" />
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 28,
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              backgroundColor: '#2bc48a',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundWhite>
  );
};

const styles = StyleSheet.create({
  containerScreenTitle: {
    alignItems: 'center',
    marginTop: 24,
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 12,
    color: '#2bc48a',
    fontWeight: 'bold',
  },
  boxContaier: {
    marginBottom: 24,
  },
  inputTitle: {
    marginBottom: 4,
    color: '#858585',
    fontSize: 14,
  },
  inputField: {
    width: '100%',
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputFieldDescription: {
    width: '100%',
    borderColor: '#B5B5B5',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    // justifyContent: 'flex-start',
    // paddingVertical: 24,
  },
  categoryText: {
    paddingVertical: 8,
    textAlign: 'center',
  },
  chooseCategoryField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 44,
    borderColor: '#B5B5B5',
    borderWidth: 1,
    marginBottom: 6,
    borderRadius: 12,
  },
  chooseCategoryBox: {
    borderWidth: 1,
    borderColor: '#b5b5b5',
    padding: 12,
    overflow: 'scroll',
    borderRadius: 12,
    backgroundColor: 'white',
  },
});
