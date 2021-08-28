import React from 'react';
import {View, FlatList} from 'react-native';
import {JobCard} from '../components/JobCard';
import {BackgroundWhite} from '../components/BackgroundWhite';

const data = [
  {
    title: 'Warehouse Worker',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '../assets/warehouse.png',
    id: 1,
  },
  {
    title: 'Housekeeping',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '',
    id: 2,
  },
  {
    title: 'Construction Worker',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '../assets/warehouse.png',
    id: 3,
  },
  {
    title: 'LandScaping',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '../assets/warehouse.png',
    id: 4,
  },
  {
    title: 'Chef ',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '../assets/warehouse.png',
    id: 5,
  },
  {
    title: 'Bartender',
    description: 'We need a forklift driver as soon as possible',
    location: 'Dallas',
    hour: '15.00',
    email: 'aebb005@gmail.com',
    phone: '6829687896',
    image: '../assets/warehouse.png',
    id: 6,
  },
];

export const HomeScreen = () => {
  return (
    <BackgroundWhite>
      {/* <CategoriesList /> */}
      <View
        style={{
          flex: 1,
          padding: 12,
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <JobCard job={item} />}
        />
      </View>
    </BackgroundWhite>
  );
};
