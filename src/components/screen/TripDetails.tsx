import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
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
      <>
        <Text>{details && details.alias}</Text>

        <Text>Departure</Text>
        <Text>{details && details.departureAddress}</Text>

        <Text>Destination</Text>
        <Text>{details && details.destinationAddress}</Text>

        <Text>Routes</Text>
        <Text>{details && details.routes}</Text>

        <Text>Departure Datetime</Text>
        <Text>{details && details.departureDatetime}</Text>

        <Text>Estimated Arrival Time</Text>
        <Text>{details && details.estimatedArrivalTime}</Text>

        <Text>Vehicle</Text>
        <Text>Capacity</Text>
        <Text>{details && details.vehicleCapacity}</Text>
        <Text>Model</Text>
        <Text>{details && details.vehicleModel}</Text>

        <Text>Color</Text>
        <Text>{details && details.vehicleColor}</Text>

        <Text>Amenities</Text>
        <Text>{details && details.vehicleAmenities}</Text>

        <Text>LicensePlate</Text>
        <Text>{details && details.vehicleLicensePlate}</Text>

        <Text>Driver</Text>
        <Text>{details && details.driverId}</Text>
      </>
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
