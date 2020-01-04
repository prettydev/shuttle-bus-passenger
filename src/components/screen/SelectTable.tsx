import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Text } from 'react-native-elements';
import {
  CurrentSeat,
  DefaultNavigationProps,
  Driver,
  Seat,
  Seats,
  Vehicle,
} from '../../types';
import React, { ReactElement, useEffect, useState } from 'react';
import PrevNextButtons from '../shared/PrevNextButtons';
import { updateSeatOfTrip } from '../../apis/firebase';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

const { width } = Dimensions.get('screen');

function Page(props: Props): React.ReactElement {
  const {
    state: { booking, seats },
    setSeat,
    setSeats,
  } = useAppContext();

  const rowCnt = booking.vehicle.vehicleRow.charCodeAt(0) - 64;
  const colCnt = booking.vehicle.vehicleColumn;

  const rowArr = [...Array(rowCnt).keys()];
  const colArr = [...Array(colCnt).keys()];

  const selectSeat = (r: number, c: number): void => {
    const seatId = String.fromCharCode(r + 65) + (c + 1);
    const s = seats[seatId].seatState;

    console.log('r, c, s, seatId', r, c, s, seatId);

    if (s === 1) {
      console.log('Someone selected this seat!');
    } else if (s === 2) {
      console.log('Someone booked this seat!');
    } else {
      const currentSeat: CurrentSeat = {
        seatId: seatId,
        seatState: 1,
      };
      setSeat(currentSeat);
      const currentSeats: Seats = Object.assign({}, seats);
      currentSeats[seatId].seatState = 1;
      setSeats(currentSeats);

      updateSeatOfTrip(booking.trip.tripId, currentSeat, () => {
        console.log('You selected this seat!');
      });
    }
  };

  return (
    <>
      <Text>{booking.trip.tripId}</Text>
      <Text>{booking.trip.tripAlias}</Text>
      <Text>{booking.rider.riderId}</Text>
      <Text>{booking.rider.riderName}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {rowArr.map((row, i) => {
          colArr.map((column, j) => (
            <TouchableOpacity
              key={i * colCnt + j + 1}
              onPress={(): void => {
                selectSeat(i, j);
              }}
            >
              <Card
                titleColor={
                  seats[String.fromCharCode(i + 65) + (j + 1)].seatState === 0
                    ? 'pink'
                    : seats[String.fromCharCode(i + 65) + (j + 1)].seatState ===
                      1
                    ? 'blue'
                    : 'green'
                }
                title={
                  String.fromCharCode(i + 65) +
                  (j + 1) +
                  '(' +
                  (i * colCnt + j + 1) +
                  ')' +
                  seats[String.fromCharCode(i + 65) + (j + 1)].seatState
                }
                containerStyle={{
                  borderBottomWidth: 0,
                }}
              />
            </TouchableOpacity>
          ));
        })}
      </ScrollView>
      <PrevNextButtons
        prevFunc={(): void => props.navigation.navigate('DropoffMap')}
        nextFunc={(): void => props.navigation.navigate('Preview')}
      />
    </>
  );
}

export default Page;
