import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
import { DefaultNavigationProps, Pickup } from '../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import PrevNextButtons from '../shared/PrevNextButtons';
import { getTripDetails } from '../../apis/firebase';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

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

  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(initialLoc);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        // getPlaces()
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  });

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
    console.log(e);
  };

  return (
    <View style={styles.container}>
      <Text>
        {booking.pickup.pickupAddress}, {booking.pickup.pickupLatitude},
        {booking.pickup.pickupLongitude}
      </Text>
      <Text>
        {booking.dropoff.dropoffAddress}, {booking.dropoff.dropoffLatitude},
        {booking.dropoff.dropoffLongitude}
      </Text>
      <Text>
        {booking.trip.tripId}, {booking.trip.vehicleId},{booking.trip.driverId}
      </Text>

      {location && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
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
        prevFunc={(): void => props.navigation.navigate('TripList')}
        nextFunc={(): void => props.navigation.navigate('DropoffMap')}
      />
    </View>
  );
}

export default Page;
