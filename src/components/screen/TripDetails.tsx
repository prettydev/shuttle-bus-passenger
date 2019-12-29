import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
import { DefaultNavigationProps, Driver, Seats, Vehicle } from '../../types';
import React, { useEffect, useState } from 'react';
import PrevNextButtons from '../shared/PrevNextButtons';
import { getTripDetails } from '../../apis/firebase';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

function Page(props: Props): React.ReactElement {
  const {
    state: { booking },
    setVehicle,
    setDriver,
    setSeats,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    getTripDetails(booking.trip.tripId, (res) => {
      if (res.exists) {
        setDetails(res.data());
        setIsLoading(false);
      } else {
        console.log('No such document!');
      }
    });
  });

  const render = (): void => {
    return (
      <Block flex card shadow style={{ width: width - theme.SIZES.BASE * 2 }}>
        <Block flex space="between" style={{ padding: theme.SIZES.BASE }}>
          <Text size={18} center>
            {details.alias}
          </Text>

          <Text size={12} muted bold>
            Departure
          </Text>
          <Text size={14}>{details.departureAddress}</Text>

          <Text size={12} muted bold>
            Destination
          </Text>
          <Text size={14}>{details.destinationAddress}</Text>

          <Text size={12} muted bold>
            Routes
          </Text>
          <Text size={14}>{details.routes}</Text>

          <Text size={12} muted bold>
            Departure Datetime
          </Text>
          <Text size={14}>{details.departureDatetime}</Text>

          <Text size={12} muted bold>
            Estimated Arrival Time
          </Text>
          <Text size={14}>{details.estimatedArrivalTime}</Text>

          <Text size={14} muted bold style={{ paddingTop: theme.SIZES.BASE }}>
            Vehicle
          </Text>
          <Block flex style={{ paddingLeft: theme.SIZES.BASE }}>
            <Block flex row>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Capacity
                </Text>
                <Text size={14}>{details.vehicleCapacity}</Text>
              </Block>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Model
                </Text>
                <Text size={14}>{details.vehicleModel}</Text>
              </Block>
            </Block>

            <Block flex row>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Color
                </Text>
                <Text size={14}>{details.vehicleColor}</Text>
              </Block>
              <Block flex style={{ width: '50%' }}>
                <Text size={12} muted bold>
                  Amenities
                </Text>
                <Text size={14}>{details.vehicleAmenities}</Text>
              </Block>
            </Block>
            <Text size={12} muted bold>
              LicensePlate
            </Text>
            <Text size={14}>{details.vehicleLicensePlate}</Text>
          </Block>

          <Text size={12} muted bold style={{ paddingTop: theme.SIZES.BASE }}>
            Driver
          </Text>
          <Text size={14}>{details.driverId}</Text>
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
              const seats: Seats = details.bookings;
              setSeats(seats);
              props.navigation.navigate('PickupMap');
            }}
          />
        </>
      )}
    </Block>
  );
}

export default Page;
