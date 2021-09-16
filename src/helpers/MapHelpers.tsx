import {Platform} from 'react-native';

export const moveMaptoTheJob = (
  state: any,
  index: number,
  _map: any,
  mapIndex: number,
) => {
  setTimeout(() => {
    if (mapIndex !== index) {
      mapIndex = index;
      //We get the coordinates from the state and move to that position
      const {coordinate} = state.markers[index];
      if (_map !== null) {
        _map.current.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: state.region.latitudeDelta,
            longitudeDelta: state.region.longitudeDelta,
          },
          350,
        );
      }
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
