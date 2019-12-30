import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Block, Button, Card, Text, theme } from 'galio-framework';
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
    <Block flex center>
      <Text>{booking.trip.tripId}</Text>
      <Text>{booking.trip.tripAlias}</Text>
      <Text>{booking.rider.riderId}</Text>
      <Text>{booking.rider.riderName}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block
          flex
          card
          shadow
          style={[{ width: width - theme.SIZES.BASE * 2 }]}
        >
          {rowArr.map((row, i) => (
            <Block key={i} flex row>
              {colArr.map((column, j) => (
                <Block
                  key={i * colCnt + j + 1}
                  flex
                  card
                  shadow
                  style={[{ width: '20%' }]}
                >
                  <TouchableOpacity
                    onPress={(): void => {
                      selectSeat(i, j);
                    }}
                  >
                    <Card
                      titleColor={
                        seats[String.fromCharCode(i + 65) + (j + 1)]
                          .seatState === 0
                          ? 'pink'
                          : seats[String.fromCharCode(i + 65) + (j + 1)]
                              .seatState === 1
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
                </Block>
              ))}
            </Block>
          ))}
        </Block>
      </ScrollView>
      <PrevNextButtons
        prevFunc={(): void => props.navigation.navigate('DropoffMap')}
        nextFunc={(): void => props.navigation.navigate('Preview')}
      />
    </Block>
  );
}

export default Page;