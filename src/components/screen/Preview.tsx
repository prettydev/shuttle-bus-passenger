import {
  Caption,
  Card,
  Divider,
  IconButton,
  Paragraph,
  Subheading,
  Surface,
  Text,
  Title,
} from 'react-native-paper';
import {
  CurrentSeat,
  DefaultNavigationProps,
  Driver,
  Seats,
  Vehicle,
  initSeats,
} from '../../types';
import { Dimensions, ScrollView, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { createNewBooking, updateSeatOfTrip } from '../../apis/firebase';
import Loader from '../shared/Loader';
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
      <>
        <Title>Booking for {booking.trip.tripAlias}</Title>

        <Caption>Pickup</Caption>
        <Text>
          {booking.pickup.pickupLatitude},{booking.pickup.pickupLongitude}
        </Text>

        <Caption>Dropoff</Caption>
        <Text>
          {booking.dropoff.dropoffLatitude},{booking.dropoff.dropoffLongitude}
        </Text>
        <Divider />
        <Subheading>Vehicle</Subheading>
        <View
          style={{
            justifyContent: 'space-around',
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Caption>Capacity</Caption>
              <Text>{booking.vehicle.vehicleCapacity}</Text>
            </View>
            <View>
              <Caption>Model</Caption>
              <Text>{booking.vehicle.vehicleModel}</Text>
            </View>
            <View>
              <Caption>Color</Caption>
              <Text>{booking.vehicle.vehicleColor}</Text>
            </View>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Caption>Amenities</Caption>
              <Text>{booking.vehicle.vehicleAmenities}</Text>
            </View>
            <View>
              <Caption>LicensePlate</Caption>
              <Text>{booking.vehicle.vehicleLicensePlate}</Text>
            </View>
          </View>
        </View>
        <Divider />
        <Subheading>Driver</Subheading>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Caption>DriverName</Caption>
            <Text>{booking.driver.driverName}</Text>
          </View>
          <View>
            <Caption>DriverPhone</Caption>
            <Text>{booking.driver.driverPhone}</Text>
          </View>
        </View>
        <View>
          <Divider />
          <Caption>Seat</Caption>
          <Text>{booking.seat.seatId}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <Card
        style={{
          padding: 20,
          margin: 10,
          justifyContent: 'center',
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>{render()}</ScrollView>
      </Card>
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
    </>
  );
}

export default Page;
