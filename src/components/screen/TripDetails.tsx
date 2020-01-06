import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
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
  DefaultNavigationProps,
  Driver,
  Seats,
  Vehicle,
  initSeats,
} from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import PrevNextButtons from '../shared/PrevNextButtons';
import { getTripDetails } from '../../apis/firebase';
import { phone } from '../../apis/phone';
import { theme } from '../core/theme';
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Title>{details && details.alias}</Title>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              icon="phone"
              color={theme.colors.icon}
              size={18}
              onPress={(): void => phone(details.driverPhone)}
            />
            <IconButton
              icon="chat"
              color={theme.colors.icon}
              size={18}
              onPress={(): void =>
                props.navigation.navigate('ChatScreen', {
                  driverId: details.driverId,
                })
              }
            />
            <IconButton
              icon="map-marker"
              color={theme.colors.icon}
              size={18}
              onPress={(): void =>
                props.navigation.navigate('TrackingScreen', {
                  driverId: details.driverId,
                })
              }
            />
          </View>
        </View>
        <Caption>Departure</Caption>
        <Text>{details && details.departureAddress}</Text>

        <Caption>Destination</Caption>
        <Text>{details && details.destinationAddress}</Text>

        <Caption>Routes</Caption>
        <Text>{details && details.routes}</Text>

        <Caption>Departure Datetime</Caption>
        <Text>{details && details.departureDatetime}</Text>

        <Caption>Estimated Arrival Time</Caption>
        <Text>{details && details.estimatedArrivalTime}</Text>
        <Divider />
        <Subheading>Vehicle</Subheading>
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: 'space-around',
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Caption>Capacity</Caption>
                <Text>{details && details.vehicleCapacity}</Text>
              </View>
              <View>
                <Caption>Model</Caption>
                <Text>{details && details.vehicleModel}</Text>
              </View>
              <View>
                <Caption>Color</Caption>
                <Text>{details && details.vehicleColor}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Caption>Amenities</Caption>
                <Text>{details && details.vehicleAmenities}</Text>
              </View>
              <View>
                <Caption>License plate</Caption>
                <Text>{details && details.vehicleLicensePlate}</Text>
              </View>
            </View>
          </View>
        </View>
        <Divider />
        <Subheading>Driver</Subheading>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Caption>Driver name</Caption>
            <Text>{details && details.driverName}</Text>
          </View>
          <View>
            <Caption>Driver phone</Caption>
            <Text>{details && details.driverPhone}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Card
            style={{
              padding: 20,
              margin: 5,
              justifyContent: 'center',
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {render()}
              <Divider />
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
            </ScrollView>
          </Card>
        </>
      )}
    </View>
  );
}

export default Page;
