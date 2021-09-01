import React from 'react';
import {View, FlatList} from 'react-native';
import {JobCard} from '../components/JobCard';
import {BackgroundWhite} from '../components/BackgroundWhite';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';

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
  const [direction, setDirection] = useState('');
  const [offset, setOffset] = useState(0);

  const getDirection = (currentOffset: any) => {
    if (currentOffset > offset) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    setOffset(currentOffset);
    console.log(direction);
  };

  return (
    <BackgroundWhite>
      <View
        style={{
          flex: 1,
          padding: 12,
        }}>
        <FlatList
          data={data}
          onScroll={e => getDirection(e.nativeEvent.contentOffset.y)}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <JobCard job={item} />}
        />
      </View>
    </BackgroundWhite>
  );
};
