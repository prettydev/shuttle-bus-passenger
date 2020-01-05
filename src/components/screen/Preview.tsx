import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Button, Card } from 'react-native-paper';
import {
  CurrentSeat,
  DefaultNavigationProps,
  Driver,
  Seats,
  Vehicle,
  initSeats,
} from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { createNewBooking, updateSeatOfTrip } from '../../apis/firebase';
import PrevNextButtons from '../shared/PrevNextButtons';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');

interface Details {
  alias: string;
  departureAddress: string;
  destinationAddress: string;
  routes: string;
  departureDatetime: string;
  estimatedArrivalTime: string;
  vehicleId: string;
  vehicleName: string;
  vehicleRow: string;
  vehicleColumn: number;
  vehicleCapacity: number;
  vehicleModel: string;
  vehicleColor: string;
  vehicleAmenities: string;
  vehicleLicensePlate: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  bookings: Seats;
}

const initDetails = {
  alias: '',
  departureAddress: '',
  destinationAddress: '',
  routes: '',
  departureDatetime: '',
  estimatedArrivalTime: '',
  vehicleId: '',
  vehicleName: '',
  vehicleRow: '',
  vehicleColumn: 0,
  vehicleCapacity: 0,
  vehicleModel: '',
  vehicleColor: '',
  vehicleAmenities: '',
  vehicleLicensePlate: '',
  driverId: '',
  driverName: '',
  driverPhone: '',
  bookings: initSeats,
};

function Page(props: Props): React.ReactElement {
  const {
    state: { booking, seats },
    setSeat,
    setSeats,
  } = useAppContext();

  const render = (): ReactElement => {
    return (
      <View>
        <View>
          <View>
            <Text>Booking details</Text>

            <Text>Pickup</Text>
            <Text>
              {booking.pickup.pickupLatitude},{booking.pickup.pickupLongitude}
            </Text>

            <Text>Dropoff</Text>
            <Text>
              {booking.dropoff.dropoffLatitude},
              {booking.dropoff.dropoffLongitude}
            </Text>
            <Text>Vehicle</Text>
            <View>
              <View>
                <View>
                  <Text>Capacity</Text>
                  <Text>{booking.vehicle.vehicleCapacity}</Text>
                </View>
                <View>
                  <Text>Model</Text>
                  <Text>{booking.vehicle.vehicleModel}</Text>
                </View>
              </View>

              <View>
                <View>
                  <Text>Color</Text>
                  <Text>{booking.vehicle.vehicleColor}</Text>
                </View>
                <View>
                  <Text>Amenities</Text>
                  <Text>{booking.vehicle.vehicleAmenities}</Text>
                </View>
              </View>
              <Text>LicensePlate</Text>
              <Text>{booking.vehicle.vehicleLicensePlate}</Text>
            </View>

            <View>
              <View>
                <Text>Driver</Text>
                <Text>{booking.driver.driverName}</Text>
              </View>
              <View>
                <Text>Seat</Text>
                <Text>{booking.seat.seatId}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>{render()}</ScrollView>
      <PrevNextButtons
        nextStr={'Confirm'}
        prevFunc={(): void => props.navigation.navigate('SelectTable')}
        nextFunc={(): void => {
          const currentSeat: CurrentSeat = {
            seatId: booking.seat.seatId,
            seatState: 2,
          };
          setSeat(currentSeat);
          createNewBooking(booking, (doc) => {
            updateSeatOfTrip(booking.trip.tripId, booking.seat, () => {
              props.navigation.navigate('Confirm');
            });
          });
        }}
      />
    </View>
  );
}

export default Page;
