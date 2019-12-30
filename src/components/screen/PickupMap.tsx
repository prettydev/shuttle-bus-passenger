import { Block, Button, Card, Text, theme } from 'galio-framework';
import { DefaultNavigationProps, Pickup } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import PrevNextButtons from '../shared/PrevNextButtons';
import Styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { getBookings } from '../../apis/firebase';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
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
      <Text>
        {booking.pickup.pickupLatitude},{booking.pickup.pickupLongitude}
      </Text>
      <Text>
        {booking.dropoff.dropoffLatitude},{booking.dropoff.dropoffLongitude}
      </Text>

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
        prevFunc={(): void => props.navigation.navigate('TripDetails')}
        nextFunc={(): void => props.navigation.navigate('DropoffMap')}
      />
    </Container>
  );
}

export default Page;
