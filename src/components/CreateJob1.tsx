import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

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

export const CreateJob1 = () => {
  const [categorySelected, setCategorySelected] = useState('HouseKeeping');
  const [visible, setVisible] = useState(false);

  const [arrow, setArrow] = useState('0deg');
  const [show, setShow] = useState('none');

  const {updateNewOfferJob} = useContext(AppContext);

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
    <>
      <View style={styles.boxContaier}>
        <Text style={styles.inputTitle}>Job title</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={e => updateNewOfferJob('title', e)}
          placeholder="housekeeping"
        />
      </View>
      <View style={styles.boxContaier}>
        <Text style={styles.inputTitle}>Job Place</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={e => updateNewOfferJob('jobPlace', e)}
          placeholder="Hyatt Hotel"
        />
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
                  setVisible(!visible),
                    changeVisibility(category.name),
                    updateNewOfferJob('category', category.name);
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
          onChangeText={e => updateNewOfferJob('description', e)}
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
          onChangeText={e => updateNewOfferJob('address', e)}
        />
      </View>
      <View style={styles.boxContaier}>
        <Text style={styles.inputTitle}>City</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Dallas"
          onChangeText={e => updateNewOfferJob('city', e)}
        />
      </View>
      <View style={styles.boxContaier}>
        <Text style={styles.inputTitle}>Hour</Text>
        <TextInput
          style={styles.inputField}
          placeholder="20.00"
          onChangeText={e => updateNewOfferJob('hour', e)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
