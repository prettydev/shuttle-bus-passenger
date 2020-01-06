import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  Avatar,
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  Surface,
  Title,
} from 'react-native-paper';
import { DefaultNavigationProps, Trip } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import call from 'react-native-phone-call';
import { getTrips } from '../../apis/firebase';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');
interface TripItem {
  key: string;
  driverId: string;
  driverPhone: string;
  vehicleId: string;
  alias: string;
  departureDatetime: string;
  departureAddress: string;
  destinationAddress: string;
  estimatedArrivalTime: string;
}

function Page(props: Props): React.ReactElement {
  const { setTrip } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [trips, setTrips] = useState<TripItem[]>();

  const phoneCall = (number: string): void => {
    const args = {
      number: number,
      prompt: false,
    };

    call(args).catch(console.error);
  };

  useEffect(() => {
    getTrips((res) => {
      const list: TripItem[] = [];
      res.forEach((doc) => {
        const {
          alias,
          departureDatetime,
          departureAddress,
          destinationAddress,
          estimatedArrivalTime,
          driverId,
          driverPhone,
          vehicleId,
        } = doc.data();
        list.push({
          key: doc.id,
          alias,
          departureDatetime,
          departureAddress,
          destinationAddress,
          estimatedArrivalTime,
          driverId,
          driverPhone,
          vehicleId,
        });
      });

      setTrips(list);
      setIsLoading(false);
    });
  });

  const renderList = (): ReactElement => {
    return (
      <>
        {trips &&
          trips.map((doc, i) => (
            <TouchableOpacity
              key={i}
              onPress={(): void => {
                const trip: Trip = {
                  tripId: doc.key,
                  tripAlias: doc.alias,
                };
                setTrip(trip);

                props.navigation.navigate('TripDetails');
              }}
            >
              <Card>
                <List.Item
                  title={doc.alias}
                  description={doc.departureDatetime}
                  left={(props): ReactElement => (
                    <List.Icon
                      {...props}
                      icon="folder"
                      color={theme.colors.icon}
                    />
                  )}
                  right={(): ReactElement => (
                    <>
                      <IconButton
                        icon="phone"
                        color={theme.colors.icon}
                        size={18}
                        onPress={(): void => phoneCall(doc.driverPhone)}
                      />
                      <IconButton
                        icon="chat"
                        color={theme.colors.icon}
                        size={18}
                        onPress={(): void =>
                          props.navigation.navigate('ChatScreen')
                        }
                      />
                      <IconButton
                        icon="map-marker"
                        color={theme.colors.icon}
                        size={18}
                      />
                    </>
                  )}
                />
              </Card>
            </TouchableOpacity>
          ))}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderList()}
        </ScrollView>
      )}
    </>
  );
}

export default Page;
