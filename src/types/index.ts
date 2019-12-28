import { StyleProp, TextStyle } from 'react-native';

import { AbortController } from 'abort-controller';
import { SFC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

export interface RequestInitCustom extends RequestInit {
  signal?: AbortController['signal'] | null;
}
export interface User {
  userId: string;
  name: string;
}

export interface Trip {
  tripId: string;
  tripAlias: string;
}

export interface Rider {
  riderId: string;
  riderName: string;
  riderEmail: string;
  riderPhone: string;
}

export interface Vehicle {
  vehicleId: string;
  vehicleName: string;
  vehicleRow: string;
  vehicleColumn: number;
  vehicleCapacity: number;
  vehicleColor: string;
  vehicleModel: string;
  vehicleLicensePlate: string;
  vehicleAmenities: string;
}

export interface Driver {
  driverId: string;
  driverName: string;
  driverPhone: string;
}

export interface Pickup {
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
}

export interface Dropoff {
  dropoffAddress: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
}

export interface Seat {
  seatId: string;
  seatState: number;
  active: boolean;
}

export interface Booking {
  trip: Trip;
  rider: Rider;
  driver: Driver;
  vehicle: Vehicle;
  pickup: Pickup;
  dropoff: Dropoff;
  seat: Seat;
}

export interface Seats {
  A1: Seat;
  A2: Seat;
  A3: Seat;
  A4: Seat;
  B1: Seat;
  B2: Seat;
  B3: Seat;
  B4: Seat;
  C1: Seat;
  C2: Seat;
  C3: Seat;
  C4: Seat;
  D1: Seat;
  D2: Seat;
  D3: Seat;
  D4: Seat;
  E1: Seat;
  E2: Seat;
  E3: Seat;
  E4: Seat;
  F1: Seat;
  F2: Seat;
  F3: Seat;
  F4: Seat;
  G1: Seat;
  G2: Seat;
  G3: Seat;
  G4: Seat;
  H1: Seat;
  H2: Seat;
  H3: Seat;
  H4: Seat;
  I1: Seat;
  I2: Seat;
  I3: Seat;
  I4: Seat;
  J1: Seat;
  J2: Seat;
  J3: Seat;
  J4: Seat;
  K1: Seat;
  K2: Seat;
  K3: Seat;
  K4: Seat;
  L1: Seat;
  L2: Seat;
  L3: Seat;
  L4: Seat;
  M1: Seat;
  M2: Seat;
  M3: Seat;
  M4: Seat;
  N1: Seat;
  N2: Seat;
  N3: Seat;
  N4: Seat;
}

type StackParamList = {
  default: undefined;
  Home: { userId: string };
  Login: undefined;
  TripList: undefined;
  BookingList: undefined;
};

type StackRootParamList = {
  App: undefined;
  Auth: undefined;
};

export type DefaultNavigationProps<
  T extends keyof StackParamList
> = StackNavigationProp<StackParamList, T>;

export type DefaultRootNavigationProps<
  T extends keyof StackRootParamList
> = StackNavigationProp<StackRootParamList, T>;

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = SFC<IconProps>;
