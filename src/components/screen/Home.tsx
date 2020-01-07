import {
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  Surface,
  Text,
  Title,
} from 'react-native-paper';
import { DefaultNavigationProps, Trip } from '../../types';
import { Dimensions, ScrollView, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import { getCurrentBookings, getUpcomingBookings } from '../../apis/firebase';
import Loader from '../shared/Loader';
import { phone } from '../../apis/phone';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');
interface BookingItem {
  key: string;

  tripId: string;
  tripAlias: string;

  driverId: string;
  driverPhone: string;

  vehicleId: string;
  vehicleName: string;
  vehicleLicensePlate: string;

  pickupAddress: string;
  pickupLatitude: string;
  pickupLongitude: string;

  dropoffAddress: string;
  dropoffLatitude: string;
  dropoffLongitude: string;

  seatId: string;
  createdAt: object;

  state: number;
}

function Page(props: Props): React.ReactElement {
  const { setTrip } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentBookings, setCurrentBookings] = useState<BookingItem[]>();
  const [upcomingBookings, setUpcomingBookings] = useState<BookingItem[]>();

  const fetchUpcomingBookings = (): any => {
    getUpcomingBookings((res) => {
      const list: BookingItem[] = [];
      res.forEach((doc) => {
        const {
          tripId,
          tripAlias,

          driverId,
          driverPhone,

          vehicleId,
          vehicleName,
          vehicleLicensePlate,

          pickupAddress,
          pickupLatitude,
          pickupLongitude,

          dropoffAddress,
          dropoffLatitude,
          dropoffLongitude,

          seatId,
          createdAt,

          state,
        } = doc.data();
        list.push({
          key: doc.id,
          tripId,
          tripAlias,

          driverId,
          driverPhone,

          vehicleId,
          vehicleName,
          vehicleLicensePlate,

          pickupAddress,
          pickupLatitude,
          pickupLongitude,

          dropoffAddress,
          dropoffLatitude,
          dropoffLongitude,

          seatId,
          createdAt,

          state,
        });
      });

      setUpcomingBookings(list);
      setIsLoading(false);
    });
  };

  const fetchCurrentBookings = (): any => {
    getCurrentBookings((res) => {
      const list: BookingItem[] = [];
      res.forEach((doc) => {
        const {
          tripId,
          tripAlias,

          driverId,
          driverPhone,

          vehicleId,
          vehicleName,
          vehicleLicensePlate,

          pickupAddress,
          pickupLatitude,
          pickupLongitude,

          dropoffAddress,
          dropoffLatitude,
          dropoffLongitude,

          seatId,
          createdAt,

          state,
        } = doc.data();
        list.push({
          key: doc.id,
          tripId,
          tripAlias,

          driverId,
          driverPhone,

          vehicleId,
          vehicleName,
          vehicleLicensePlate,

          pickupAddress,
          pickupLatitude,
          pickupLongitude,

          dropoffAddress,
          dropoffLatitude,
          dropoffLongitude,

          seatId,
          createdAt,

          state,
        });
      });

      setCurrentBookings(list);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchCurrentBookings();
    fetchUpcomingBookings();
  }, []);

  const renderUpcomingList = (): ReactElement => {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        {upcomingBookings &&
          upcomingBookings.map((doc, i) => (
            <Card
              key={i}
              style={{
                padding: 5,
                margin: 5,
                justifyContent: 'center',
              }}
            >
              <List.Item
                title={doc.tripAlias}
                // description={doc.createdAt}
                description={'Upcoming'}
                left={(props): ReactElement => (
                  <List.Icon
                    {...props}
                    icon={'ticket'}
                    color={theme.colors.icon}
                  />
                )}
                right={(): ReactElement => (
                  <>
                    <IconButton
                      icon="phone"
                      color={theme.colors.icon}
                      size={18}
                      onPress={(): void => phone(doc.driverPhone)}
                    />
                    <IconButton
                      icon="chat"
                      color={theme.colors.icon}
                      size={18}
                      onPress={(): void =>
                        props.navigation.navigate('ChatScreen', {
                          driverId: doc.driverId,
                          tripId: doc.tripId,
                        })
                      }
                    />
                    <IconButton
                      icon="map-marker"
                      color={theme.colors.icon}
                      size={18}
                      onPress={(): void =>
                        props.navigation.navigate('TrackingScreen', {
                          driverId: doc.driverId,
                        })
                      }
                    />
                  </>
                )}
              />
            </Card>
          ))}
      </View>
    );
  };

  const renderCurrentList = (): ReactElement => {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        {currentBookings &&
          currentBookings.map((doc, i) => (
            <Card
              key={i}
              style={{
                padding: 5,
                margin: 5,
                justifyContent: 'center',
              }}
            >
              <List.Item
                title={doc.tripAlias}
                // description={doc.createdAt}
                description={'Traveling'}
                left={(props): ReactElement => (
                  <List.Icon
                    {...props}
                    icon={'ticket-confirmation'}
                    color={theme.colors.icon}
                  />
                )}
                right={(): ReactElement => (
                  <>
                    <IconButton
                      icon="cash"
                      color={theme.colors.icon}
                      size={18}
                      onPress={(): void =>
                        props.navigation.navigate('Payment', {
                          driverId: doc.driverId,
                          tripId: doc.tripId,
                          vehicleId: doc.vehicleId,
                        })
                      }
                    />
                    <IconButton
                      icon="star-outline"
                      color={theme.colors.icon}
                      size={18}
                      onPress={(): void =>
                        props.navigation.navigate('Review', {
                          driverId: doc.driverId,
                          tripId: doc.tripId,
                          vehicleId: doc.vehicleId,
                        })
                      }
                    />
                  </>
                )}
              />
            </Card>
          ))}
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderCurrentList()}
          {renderUpcomingList()}
        </ScrollView>
      )}
    </>
  );
}

export default Page;
