import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
import {
  DefaultNavigationProps,
  Driver,
  Seats,
  Vehicle,
  initSeats,
} from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import PrevNextButtons from '../shared/PrevNextButtons';
import { getTripDetails } from '../../apis/firebase';
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
    setVehicle,
    setDriver,
    setSeats,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [details, setDetails] = useState<Details>(initDetails);

  useEffect(() => {
    getTripDetails(booking.trip.tripId, (res) => {
      if (res.exists) {
        setDetails(res.data());
        setIsLoading(false);
      } else {
        // eslint-disable-next-line no-console
        console.log('No such document!');
      }
    });
  });

  const render = (): ReactElement => {
    return (
      <Block flex card shadow style={{ width: width - theme.SIZES.BASE * 2 }}>
        <Block flex space="between" style={{ padding: theme.SIZES.BASE }}>
          <Text size={18} center>
            {details && details.alias}
          </Text>

          <Text size={12} muted bold>
            Departure
          </Text>
          <Text size={14}>{details && details.departureAddress}</Text>

          <Text size={12} muted bold>
            Destination
          </Text>
          <Text size={14}>{details && details.destinationAddress}</Text>

          <Text size={12} muted bold>
            Routes
          </Text>
          <Text size={14}>{details && details.routes}</Text>

          <Text size={12} muted bold>
            Departure Datetime
          </Text>
          <Text size={14}>{details && details.departureDatetime}</Text>

          <Text size={12} muted bold>
            Estimated Arrival Time
          </Text>
          <Text size={14}>{details && details.estimatedArrivalTime}</Text>

          <Text size={14} muted bold style={{ paddingTop: theme.SIZES.BASE }}>
            Vehicle
          </Text>
          <Block flex style={{ paddingLeft: theme.SIZES.BASE }}>
            <Block flex row>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Capacity
                </Text>
                <Text size={14}>{details && details.vehicleCapacity}</Text>
              </Block>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Model
                </Text>
                <Text size={14}>{details && details.vehicleModel}</Text>
              </Block>
            </Block>

            <Block flex row>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Color
                </Text>
                <Text size={14}>{details && details.vehicleColor}</Text>
              </Block>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Amenities
                </Text>
                <Text size={14}>{details && details.vehicleAmenities}</Text>
              </Block>
            </Block>
            <Text size={12} muted bold>
              LicensePlate
            </Text>
            <Text size={14}>{details && details.vehicleLicensePlate}</Text>
          </Block>

          <Text size={12} muted bold style={{ paddingTop: theme.SIZES.BASE }}>
            Driver
          </Text>
          <Text size={14}>{details && details.driverId}</Text>
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

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {render()}
          </ScrollView>
          <PrevNextButtons
            prevFunc={(): void => props.navigation.navigate('TripList')}
            nextFunc={(): void => {
              const vehicle: Vehicle = {
                vehicleId: details.vehicleId,
                vehicleName: details.vehicleName,
                vehicleRow: details.vehicleRow,
                vehicleColumn: details.vehicleColumn,
                vehicleCapacity: details.vehicleCapacity,
                vehicleColor: details.vehicleColor,
                vehicleModel: details.vehicleModel,
                vehicleLicensePlate: details.vehicleLicensePlate,
                vehicleAmenities: details.vehicleAmenities,
              };
              setVehicle(vehicle);
              const driver: Driver = {
                driverId: details.driverId,
                driverName: details.driverName,
                driverPhone: details.driverPhone,
              };
              setDriver(driver);
              const newSeats: Seats = Object.assign({}, details.bookings);
              setSeats(newSeats);
              props.navigation.navigate('PickupMap');
            }}
          />
        </>
      )}
    </Block>
  );
}

export default Page;
