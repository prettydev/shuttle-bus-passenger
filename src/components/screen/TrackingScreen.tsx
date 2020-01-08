import { DefaultBookingNavigationProps, Pickup } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { NavigationStackProp } from 'react-navigation-stack';
import Styled from 'styled-components/native';

interface Props {
  navigation: NavigationStackProp<{ driverId: string }>;
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
  // const driverId = props.navigation.getParam('driverId');
  const [location, setLocation] = useState<ILocation | undefined>(initialLoc);
  const driverId = props.navigation.getParam('driverId');
  useEffect(() => {
    Geolocation.getCurrentPosition(
      // get location of bus from firebase
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
        >
          <Marker draggable coordinate={location} />
        </MapView>
      )}
    </Container>
  );
}

export default Page;
