import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {
  DefaultNavigationProps,
  Driver,
  Dropoff,
  Pickup,
  Rider,
  Trip,
  User,
  Vehicle,
} from '../../types';

type callbackFn = (doc) => void;

const config = {
  // apiKey: "AIzaSyDoi8eLFpV3uUGJqdLy8g3ve3vquAg5nfo",
  // authDomain: "totemic-audio-261312.firebaseapp.com",
  // databaseURL: "https://totemic-audio-261312.firebaseio.com",
  // projectId: "totemic-audio-261312",
  // storageBucket: "totemic-audio-261312.appspot.com",
  // messagingSenderId: "907564440193",
  // appId: "1:907564440193:web:610ee5ea4e6c7af98d0b80",
  // measurementId: "G-73PLNL4K9M",
  apiKey: 'AIzaSyCmmiyeaqjo86zIwvy0TdFFaNwlmEYkn3o',
  authDomain: 'busshuttle-48ae5.firebaseapp.com',
  databaseURL: 'https://busshuttle-48ae5.firebaseio.com',
  projectId: 'busshuttle-48ae5',
  storageBucket: 'busshuttle-48ae5.appspot.com',
  messagingSenderId: '714080369658',
  appId: '1:714080369658:web:afe9fbc951b615044a4243',
  measurementId: 'G-022VWE51NY',
};

firebase.initializeApp(config);

const auth = firebase.auth();
const drivers = firebase.firestore().collection('drivers');
const riders = firebase.firestore().collection('riders');
const trips = firebase.firestore().collection('trips');
const vehicles = firebase.firestore().collection('vehicles');
const bookings = firebase.firestore().collection('bookings');

// auth
export const loginWithEmail = (
  email: string,
  password: string,
): Promise<Response> => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const signupWithEmail = (
  email: string,
  password: string,
): Promise<Response> => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const signOut = (): Promise<Response> => {
  return auth.signOut();
};
export const checkUserAuth = (user): Promise<Response> => {
  return auth.onAuthStateChanged(user);
};
export const passwordReset = (email): Promise<Response> => {
  return auth.sendPasswordResetEmail(email);
};
export const getCurrentUserId = (): Promise<Response> => {
  return auth.currentUser.uid;
};

// /// //////////////////////////////////////////////////////////////////////////////////////////////
export const createNewRider = (doc: Rider): Promise<Response> => {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return riders.doc(`${doc.uid}`).set(doc);
};
export const getRiderDetails = (
  key: string,
  callback: callbackFn,
): Promise<Response> => {
  return riders
    .doc(key)
    .get()
    .then(callback);
};

/// /////////////////////////////////////////////////////////////////////////////////////////////
export const createNewDriver = (doc): Promise<Response> => {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return drivers.doc(doc.uid).set(doc);
};
export const getDrivers = (callback): Promise<Response> => {
  drivers.onSnapshot(callback);
};
export const getDriverDetails = (key, callback): Promise<Response> => {
  drivers
    .doc(key)
    .get()
    .then(callback);
};
export const setDriver = (
  key,
  doc,
  callback1,
  callback2,
): Promise<Response> => {
  drivers
    .doc(key)
    .set(doc)
    .then(callback1)
    .catch(callback2);
};

export const deleteDriver = (key, callback1, callback2): Promise<Response> => {
  drivers
    .doc(key)
    .delete()
    .then(callback1)
    .catch(callback2);
};

// /// /////////////////////////////////////////////////////////////////////////////////////////////

export const getTrips = (callback): Promise<Response> => {
  return trips.onSnapshot(callback);
};

export const getTripDetails = (key, callback): Promise<Response> => {
  trips
    .doc(key)
    .get()
    .then(callback);
};

export const updateSeatOfTrip = (
  tripId,
  seatId,
  seatState,
  riderId,
  riderName,
  callback,
): Promise<Response> => {
  trips
    .doc(tripId)
    .update({
      ['bookings.' + seatId + '.state']: seatState,
      ['bookings.' + seatId + '.riderId']: riderId,
      ['bookings.' + seatId + '.riderName']: riderName,
    })
    .then(callback);
};

/// ////////////////////////////////////////////////////////////////////////////////////////////
export const createNewBooking = (doc, callback): Promise<Response> => {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return bookings.add(doc).then(callback);
};

export const getBookings = (callback): Promise<Response> => {
  bookings.onSnapshot(callback);
};
