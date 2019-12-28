import {
  Booking,
  Driver,
  Dropoff,
  Pickup,
  Rider,
  Seat,
  Seats,
  Trip,
  User,
  Vehicle,
} from '../types';

import React, { useReducer } from 'react';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setUser: (user: User) => void;
  resetUser: () => void;
  callDefault: () => void;

  setTrip: (trip: Trip) => void;
  setRider: (rider: Rider) => void;
  setDriver: (driver: Driver) => void;
  setVehicle: (vehicle: Vehicle) => void;
  setPickup: (pickup: Pickup) => void;
  setDropoff: (dropoff: Dropoff) => void;
  setSeat: (seat: Seat) => void;
  setSeats: (seats: Seats) => void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ResetUser = 'reset-user',
  SetUser = 'set-user',

  SetTrip = 'set-trip',
  SetRider = 'set-rider',
  SetDriver = 'set-driver',
  SetVehicle = 'set-vehicle',
  SetPickup = 'set-pickup',
  SetDropoff = 'set-dropoff',
  SetSeat = 'set-seat',

  SetSeats = 'set-seats',

  CallDefault = 'call-default',
}

export interface State {
  user: User;
  booking: Booking;
  seats: Seats;
}

const initSeat = {
  seatId: '',
  seatState: 0,
  active: true,
};

const initialState: State = {
  user: { userId: 'ccccc', name: 'dddd' },
  booking: {
    trip: {
      tripId: 'ffffffffffffffffff',
      tripAlias: '',
    },
    rider: {
      riderId: '',
      riderName: '',
      riderEmail: '',
      riderPhone: '',
    },
    driver: {
      driverId: '',
      driverName: '',
      driverPhone: '',
    },
    vehicle: {
      vehicleId: '',
      vehicleName: '',
      vehicleRow: '',
      vehicleColumn: 0,
      vehicleCapacity: 0,
      vehicleColor: '',
      vehicleModel: '',
      vehicleLicensePlate: '',
      vehicleAmenities: '',
    },
    pickup: {
      pickupAddress: '',
      pickupLatitude: 0,
      pickupLongitude: 0,
    },
    dropoff: {
      dropoffAddress: '',
      dropoffLatitude: 0,
      dropoffLongitude: 0,
    },
    seat: {
      seatId: '',
      seatState: 0,
      active: true,
    },
  },
  seats: {
    A1: initSeat,
    A2: initSeat,
    A3: initSeat,
    A4: initSeat,
    B1: initSeat,
    B2: initSeat,
    B3: initSeat,
    B4: initSeat,
    C1: initSeat,
    C2: initSeat,
    C3: initSeat,
    C4: initSeat,
    D1: initSeat,
    D2: initSeat,
    D3: initSeat,
    D4: initSeat,
    E1: initSeat,
    E2: initSeat,
    E3: initSeat,
    E4: initSeat,
    F1: initSeat,
    F2: initSeat,
    F3: initSeat,
    F4: initSeat,
    G1: initSeat,
    G2: initSeat,
    G3: initSeat,
    G4: initSeat,
    H1: initSeat,
    H2: initSeat,
    H3: initSeat,
    H4: initSeat,
    I1: initSeat,
    I2: initSeat,
    I3: initSeat,
    I4: initSeat,
    J1: initSeat,
    J2: initSeat,
    J3: initSeat,
    J4: initSeat,
    K1: initSeat,
    K2: initSeat,
    K3: initSeat,
    K4: initSeat,
    L1: initSeat,
    L2: initSeat,
    L3: initSeat,
    L4: initSeat,
    M1: initSeat,
    M2: initSeat,
    M3: initSeat,
    M4: initSeat,
    N1: initSeat,
    N2: initSeat,
    N3: initSeat,
    N4: initSeat,
  },
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: User;
}

interface ResetUserAction {
  type: ActionType.ResetUser;
}

interface GetStateAction {
  type: ActionType.CallDefault;
}

interface SetTripAction {
  type: ActionType.SetTrip;
  payload: Trip;
}

interface SetDriverAction {
  type: ActionType.SetDriver;
  payload: Driver;
}

interface SetRiderAction {
  type: ActionType.SetRider;
  payload: Rider;
}

interface SetVehicleAction {
  type: ActionType.SetVehicle;
  payload: Vehicle;
}

interface SetPickupAction {
  type: ActionType.SetPickup;
  payload: Pickup;
}

interface SetDropoffAction {
  type: ActionType.SetDropoff;
  payload: Dropoff;
}

interface SetSeatAction {
  type: ActionType.SetSeat;
  payload: Seat;
}

interface SetSeatsAction {
  type: ActionType.SetSeats;
  payload: Seats;
}

type userAction = SetUserAction | ResetUserAction | GetStateAction;
type bookingAction =
  | SetTripAction
  | SetRiderAction
  | SetDriverAction
  | SetDriverAction
  | SetPickupAction
  | SetDropoffAction
  | SetVehicleAction
  | SetSeatAction;
type seatsAction = SetSeatsAction;
type Action = {
  userAction: userAction;
  bookingAction: bookingAction;
  seatsAction: seatsAction;
};

interface Props {
  children?: React.ReactElement;
}

type UserReducer = (state: User, action: userAction) => User;
type BookingReducer = (state: Booking, action: bookingAction) => Booking;
type SeatsReducer = (state: Seats, action: seatsAction) => Seats;

type Reducer = (state: State, action: Action) => State;

const callDefault = (dispatch: React.Dispatch<GetStateAction>) => (): void => {
  dispatch({
    type: ActionType.CallDefault,
  });
};

const setUser = (dispatch: React.Dispatch<SetUserAction>) => (
  user: User,
): void => {
  dispatch({
    type: ActionType.SetUser,
    payload: user,
  });
};

const resetUser = (dispatch: React.Dispatch<ResetUserAction>) => (): void => {
  dispatch({
    type: ActionType.ResetUser,
  });
};

const setTrip = (dispatch: React.Dispatch<SetTripAction>) => (
  trip: Trip,
): void => {
  dispatch({
    type: ActionType.SetTrip,
    payload: trip,
  });
};

const setRider = (dispatch: React.Dispatch<SetRiderAction>) => (
  rider: Rider,
): void => {
  dispatch({
    type: ActionType.SetRider,
    payload: rider,
  });
};

const setDriver = (dispatch: React.Dispatch<SetDriverAction>) => (
  driver: Driver,
): void => {
  dispatch({
    type: ActionType.SetDriver,
    payload: driver,
  });
};

const setVehicle = (dispatch: React.Dispatch<SetVehicleAction>) => (
  vehicle: Vehicle,
): void => {
  dispatch({
    type: ActionType.SetVehicle,
    payload: vehicle,
  });
};

const setPickup = (dispatch: React.Dispatch<SetPickupAction>) => (
  pickup: Pickup,
): void => {
  dispatch({
    type: ActionType.SetPickup,
    payload: pickup,
  });
};

const setDropoff = (dispatch: React.Dispatch<SetDropoffAction>) => (
  dropoff: Dropoff,
): void => {
  dispatch({
    type: ActionType.SetDropoff,
    payload: dropoff,
  });
};

const setSeat = (dispatch: React.Dispatch<SetSeatAction>) => (
  seat: Seat,
): void => {
  dispatch({
    type: ActionType.SetSeat,
    payload: seat,
  });
};

const setSeats = (dispatch: React.Dispatch<SetSeatsAction>) => (
  seats: Seats,
): void => {
  dispatch({
    type: ActionType.SetSeats,
    payload: seats,
  });
};

const userReducer: UserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'reset-user':
      return initialState.user;
    case 'set-user':
      return action.payload;
    default:
      return state;
  }
};

const bookingReducer: BookingReducer = (
  state = initialState.booking,
  action,
) => {
  switch (action.type) {
    case 'set-trip':
      return { ...state, booking: action.payload };
    case 'set-rider':
      return { ...state, rider: action.payload };
    case 'set-driver':
      return { ...state, driver: action.payload };
    case 'set-vehicle':
      return { ...state, vehicle: action.payload };
    case 'set-pickup':
      return { ...state, pickup: action.payload };
    case 'set-dropoff':
      return { ...state, dropoff: action.payload };
    case 'set-seat':
      return { ...state, seat: action.payload };
    default:
      return state;
  }
};

const seatsReducer: SeatsReducer = (state = initialState.seats, action) => {
  switch (action.type) {
    case 'set-seats':
      return { ...state, seats: action.payload };
    default:
      return state;
  }
};

function AppProvider(props: Props): React.ReactElement {
  const [user, userDispatch] = useReducer<UserReducer>(
    userReducer,
    initialState.user,
  );
  const [booking, bookingDispatch] = useReducer<BookingReducer>(
    bookingReducer,
    initialState.booking,
  );
  const [seats, seatsDispatch] = useReducer<SeatsReducer>(
    seatsReducer,
    initialState.seats,
  );

  const actions = {
    setUser: setUser(userDispatch),
    resetUser: resetUser(userDispatch),
    callDefault: callDefault(userDispatch),

    setTrip: setTrip(bookingDispatch),
    setRider: setRider(bookingDispatch),
    setDriver: setDriver(bookingDispatch),
    setVehicle: setVehicle(bookingDispatch),
    setPickup: setPickup(bookingDispatch),
    setDropoff: setDropoff(bookingDispatch),
    setSeat: setSeat(bookingDispatch),

    setSeats: setSeats(seatsDispatch),
  };

  const state = {
    user,
    booking,
    seats,
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

export { useCtx as useAppContext, AppProvider };
