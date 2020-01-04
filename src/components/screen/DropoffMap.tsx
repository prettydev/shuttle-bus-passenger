import { DefaultNavigationProps, Dropoff } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import PrevNextButtons from '../shared/PrevNextButtons';
import Styled from 'styled-components/native';
import { Text } from 'react-native-elements';
import { useAppContext } from '../../providers/AppProvider';

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

// justifyContent: 'flex-end',
//     alignItems: 'center',

const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 };
// const DEFAULT_DELTA = {latitudeDelta: 0.0922, longitudeDelta: 0.0421}

const initialLoc = {
  latitude: 24,
  longitude: 75,
};

function Page(props: Props): React.ReactElement {
  const {
    state: { booking },
    setDropoff,
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
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  const onMapPress = (e): void => {
    const { coordinate } = e.nativeEvent;
    setLocation(coordinate);

    const dropoff: Dropoff = {
      dropoffAddress: '',
      dropoffLatitude: coordinate.latitude,
      dropoffLongitude: coordinate.longitude,
    };
    setDropoff(dropoff);
  };

  const onDragStart = (e): void => {
    console.log(e);
  };

  return (
    <Container>
      <Text>
        {booking.pickup.pickupAddress}, {booking.pickup.pickupLatitude},
        {booking.pickup.pickupLongitude}
      </Text>
      <Text>
        {booking.dropoff.dropoffAddress}, {booking.dropoff.dropoffLatitude},
        {booking.dropoff.dropoffLongitude}
      </Text>
      <Text>
        {booking.trip.tripId}, {booking.trip.tripId}
      </Text>

      {location && (
        <MapView
          style={{ flex: 1 }}
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
        prevFunc={(): void => props.navigation.navigate('PickupMap')}
        nextFunc={(): void => props.navigation.navigate('SelectTable')}
      />
    </Container>
  );
}

export default Page;
