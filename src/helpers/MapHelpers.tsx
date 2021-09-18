import {Platform} from 'react-native';

export const moveMaptoTheJob = (
  jobs: any,
  index: number,
  _map: any,
  mapIndex: number,
) => {
  setTimeout(() => {
    //We get the coordinates from the state and move to that position
    const {coordinate} = jobs[index];
    if (_map !== null) {
      _map.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.1864195044303443,
          longitudeDelta: 0.1840142817690068,
        },
        350,
      );
    }
  }, 200);
};

export const onMarkerPress = (
  mapEventData: any,
  _scrollView: any,
  CARD_WIDTH: number,
  inset: number,
) => {
  const markerID = mapEventData._targetInst.return.key;

  // X means the the distance that scrollView have to move to show that job on the card
  let x = markerID * CARD_WIDTH + markerID * 20;
  if (Platform.OS === 'ios') {
    x = x - inset;
  }

  _scrollView.current.scrollTo({x: x, y: 0, animated: true});
};
