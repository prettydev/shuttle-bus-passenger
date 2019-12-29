import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
import { DefaultNavigationProps, Trip } from '../../types';
import React, { useEffect, useState } from 'react';
import { getTrips } from '../../apis/firebase';
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
    setTrip,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips((res) => {
      const list = [];
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
          doc, // DocumentSnapshot
          driverId,
          vehicleId,
          alias,
          departureDatetime,
          departureAddress,
          destinationAddress,
          estimatedArrivalTime,
        });
      });

      setTrips(list);
      setIsLoading(false);
    });
  });

  const renderList = (): void => {
    return (
      <Block flex>
        {trips.map((doc, i) => (
          <TouchableOpacity
            key={i}
            onPress={(): void => {
              const trip: Trip = {
                tripId: doc.key,
                tripAlias: doc.alias,
              };
              setTrip(trip);

              console.log(
                'feeeeeeeeeeeeee==',
                booking.trip.tripId,
                booking.trip.tripAlias,
              );

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
