import { DefaultBookingNavigationProps, Pickup } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import PrevNextButtons from '../shared/PrevNextButtons';
import Styled from 'styled-components/native';
import { getBookings } from '../../apis/firebase';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultBookingNavigationProps<'TripList'>;
}

const Container = Styled.View`
    flex: 1;
`;

interface ILocation {
  latitude: number;
  longitude: number;
}

const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 };
// const DEFAULT_DELTA = {latitudeDelta: 0.0922, longitudeDelta: 0.0421}

const initialLoc = {
  latitude: 24,
  longitude: 75,
};

function Page(props: Props): React.ReactElement {
  const {
    state: { booking },
    setPickup,
  } = useAppContext();

  const [location, setLocation] = useState<ILocation | undefined>(initialLoc);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const onMapPress = (e): void => {
    const { coordinate } = e.nativeEvent;
    setLocation(coordinate);

    const pickup: Pickup = {
      pickupAddress: '',
      pickupLatitude: coordinate.latitude,
      pickupLongitude: coordinate.longitude,
    };
    setPickup(pickup);
  };

  const onDragStart = (e): void => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  return (
    <Container>
      {location && (
        <MapView
          style={{
            flex: 1,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            ...DEFAULT_DELTA,
          }}
          onPress={onMapPress}
        >
          <Marker
            draggable
            coordinate={location}
            onDragStart={onDragStart}
            onDragEnd={onMapPress}
          />
        </MapView>
      )}

      <PrevNextButtons
        style={{ position: 'absolute', bottom: 0 }}
        prevFunc={(): void => props.navigation.navigate('TripDetails')}
        nextFunc={(): void => props.navigation.navigate('DropoffMap')}
      />
    </Container>
  );
}

export default Page;
