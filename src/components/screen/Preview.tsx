import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
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
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Block flex card shadow style={{ width: width - theme.SIZES.BASE * 2 }}>
          <Block flex space="between" style={{ padding: theme.SIZES.BASE }}>
            <Text size={18} center>
              Booking details
            </Text>

            <Text size={12} muted bold>
              Pickup
            </Text>
            <Text size={14}>
              {booking.pickup.pickupLatitude},{booking.pickup.pickupLongitude}
            </Text>

            <Text size={12} muted bold>
              Dropoff
            </Text>
            <Text size={14}>
              {booking.dropoff.dropoffLatitude},
              {booking.dropoff.dropoffLongitude}
            </Text>
            <Text size={14} muted bold style={{ paddingTop: theme.SIZES.BASE }}>
              Vehicle
            </Text>
            <Block flex style={{ paddingLeft: theme.SIZES.BASE }}>
              <Block flex row>
                <Block flex style={{ width: '50%' }}>
                  <Text size={12} muted bold>
                    Capacity
                  </Text>
                  <Text size={14}>{booking.vehicle.vehicleCapacity}</Text>
                </Block>
                <Block flex style={{ width: '50%' }}>
                  <Text size={12} muted bold>
                    Model
                  </Text>
                  <Text size={14}>{booking.vehicle.vehicleModel}</Text>
                </Block>
              </Block>

              <Block flex row>
                <Block flex style={{ width: '50%' }}>
                  <Text size={12} muted bold>
                    Color
                  </Text>
                  <Text size={14}>{booking.vehicle.vehicleColor}</Text>
                </Block>
                <Block flex style={{ width: '50%' }}>
                  <Text size={12} muted bold>
                    Amenities
                  </Text>
                  <Text size={14}>{booking.vehicle.vehicleAmenities}</Text>
                </Block>
              </Block>
              <Text size={12} muted bold>
                LicensePlate
              </Text>
              <Text size={14}>{booking.vehicle.vehicleLicensePlate}</Text>
            </Block>

            <Block flex row>
              <Block flex style={{ width: '50%' }}>
                <Text
                  size={12}
                  muted
                  bold
                  style={{
                    paddingTop: theme.SIZES.BASE,
                  }}
                >
                  Driver
                </Text>
                <Text size={14}>{booking.driver.driverName}</Text>
              </Block>
              <Block flex style={{ width: '50%' }}>
                <Text
                  size={12}
                  muted
                  bold
                  style={{
                    paddingTop: theme.SIZES.BASE,
                  }}
                >
                  Seat
                </Text>
                <Text size={14}>{booking.seat.seatId}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex center>
      <Text>{booking.trip.tripId}</Text>
      <Text>{booking.trip.tripAlias}</Text>
      <Text>{booking.rider.riderId}</Text>
      <Text>{booking.rider.riderName}</Text>

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
    </Block>
  );
}

export default Page;
