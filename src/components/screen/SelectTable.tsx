import {
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import {
  CurrentSeat,
  DefaultNavigationProps,
  Driver,
  Seat,
  Seats,
  Vehicle,
} from '../../types';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import PrevNextButtons from '../shared/PrevNextButtons';
import { theme } from '../core/theme';
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

  const [currentSeats, setCurrentSeats] = useState(seats);

  useEffect(() => {
    setCurrentSeats(seats);
  }, [seats]);

  let rowCnt = booking.vehicle.vehicleRow.charCodeAt(0) - 64;
  let colCnt = booking.vehicle.vehicleColumn;

  if (isNaN(rowCnt) || rowCnt === 0) {
    rowCnt = 10;
  }
  if (isNaN(colCnt) || colCnt === 0) {
    colCnt = 4;
  }

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
      const currentSeatsTmp: Seats = Object.assign({}, seats);
      currentSeatsTmp[seatId].seatState = 1;
      setSeats(currentSeatsTmp);

      updateSeatOfTrip(booking.trip.tripId, currentSeat, () => {
        console.log('You selected this seat!');
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '52%',
            paddingLeft: 40,
          }}
        >
          {colArr.map((col, j) => (
            <Badge size={25}>{j + 1}</Badge>
          ))}
        </View>
        {rowArr.map((row, i) => {
          return (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Badge size={25} style={{ marginBottom: 10, marginRight: 20 }}>
                {String.fromCharCode(i + 65)}
              </Badge>
              {colArr.map((col, j) => {
                return (
                  <IconButton
                    key={i * colCnt + j + 1}
                    icon="seat-outline"
                    color={
                      seats[String.fromCharCode(i + 65) + (j + 1)].seatState ===
                      0
                        ? theme.colors.icon
                        : seats[String.fromCharCode(i + 65) + (j + 1)]
                            .seatState === 1
                        ? theme.colors.selected
                        : theme.colors.booked
                    }
                    size={25}
                    onPress={(): void => selectSeat(i, j)}
                  >
                    {String.fromCharCode(i + 65)}
                  </IconButton>
                );
              })}
            </View>
          );
        })}
      </View>
      <Divider />
      <PrevNextButtons
        prevFunc={(): void => props.navigation.navigate('DropoffMap')}
        nextFunc={(): void => props.navigation.navigate('Preview')}
      />
    </ScrollView>
  );
}

export default Page;
