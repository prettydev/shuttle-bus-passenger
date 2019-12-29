import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Block, Card, theme } from 'galio-framework';
import { DefaultNavigationProps, Trip } from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import { getTrips } from '../../apis/firebase';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');
interface TripItem {
  key: string;
  driverId: string;
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
          vehicleId,
        });
      });

      setTrips(list);
      setIsLoading(false);
    });
  });

  const renderList = (): ReactElement => {
    return (
      <Block flex>
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
              <Card
                flex
                shadow
                borderless
                title={doc.alias}
                caption={doc.departureDatetime}
                avatar="http://i.pravatar.cc/100?id=skater"
                style={{ width: width - theme.SIZES.BASE * 2 }}
              />
            </TouchableOpacity>
          ))}
      </Block>
    );
  };

  return (
    <Block flex center>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderList()}
        </ScrollView>
      )}
    </Block>
  );
}

export default Page;
