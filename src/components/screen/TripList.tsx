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
import { Dimensions, ScrollView, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import { getTrips } from '../../apis/firebase';
import { phone } from '../../apis/phone';
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
      <View style={{ flex: 1, padding: 5 }}>
        {trips &&
          trips.map((doc, i) => (
            <Card
              key={i}
              style={{
                padding: 5,
                margin: 5,
                justifyContent: 'center',
              }}
              onPress={(): void => {
                const trip: Trip = {
                  tripId: doc.key,
                  tripAlias: doc.alias,
                };
                setTrip(trip);

                props.navigation.navigate('TripDetails');
              }}
            >
              <List.Item
                title={doc.alias}
                description={doc.departureDatetime}
                left={(props): ReactElement => (
                  <List.Icon {...props} icon="bus" color={theme.colors.icon} />
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
