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
import { DefaultHistoryNavigationProps, Trip } from '../../types';
import { Dimensions, ScrollView, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import { getCompletedBookings } from '../../apis/firebase';
import { phone } from '../../apis/phone';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultHistoryNavigationProps<'History'>;
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

  const [bookings, setBookings] = useState<BookingItem[]>();

  useEffect(() => {
    getCompletedBookings((res) => {
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

      setBookings(list);
      setIsLoading(false);
    });
  });

  const renderList = (): ReactElement => {
    return (
      <View style={{ flex: 1, padding: 5 }}>
        {bookings === undefined ||
          (bookings.length === 0 && (
            <Card
              style={{
                padding: 25,
                margin: 5,
                justifyContent: 'center',
              }}
            >
              <Text>No rides.</Text>
            </Card>
          ))}

        {bookings &&
          bookings.map((doc, i) => (
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
                description={
                  doc.state === 0
                    ? 'Upcoming'
                    : doc.state === 1
                    ? 'Traveling now'
                    : 'Completed'
                }
                left={(props): ReactElement => (
                  <List.Icon
                    {...props}
                    icon={
                      doc.state === 0
                        ? 'ticket'
                        : doc.state === 1
                        ? 'ticket-confirmation'
                        : 'ticket-outline'
                    }
                    color={theme.colors.icon}
                  />
                )}
                right={(): ReactElement =>
                  doc.state === 0 ? (
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
                  ) : (
                    <></>
                  )
                }
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
          {renderList()}
        </ScrollView>
      )}
    </>
  );
}

export default Page;
