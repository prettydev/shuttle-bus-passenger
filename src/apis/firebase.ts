import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {
  Booking,
  DefaultNavigationProps,
  Driver,
  Dropoff,
  Pickup,
  Rider,
  Trip,
  User,
  UserCredential,
  Vehicle,
} from '../types';

import fbauth from '@react-native-firebase/auth';
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
const messages = firebase.firestore().collection('messages');
const tripReviews = firebase.firestore().collection('trip_reviews');

// auth
export const loginWithEmail = (email: string, password: string): any => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const signupWithEmail = (email: string, password: string): any => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const signOut = (): Promise<void> => {
  return auth.signOut();
};
export async function loginWithPhone(phone: string): Promise<any> {
  const confirmation = await fbauth().signInWithPhoneNumber(phone); // '+1 650-555-3434'
  return confirmation;
}
export const checkUserAuth = (user): any => {
  return auth.onAuthStateChanged(user);
};
export const passwordReset = (email): any => {
  return auth.sendPasswordResetEmail(email);
};
export const getCurrentUserId = (): any => {
  return auth.currentUser && auth.currentUser.uid;
};

// /// //////////////////////////////////////////////////////////////////////////////////////////////
export const createNewRider = (doc: any): Promise<void | Response> => {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return riders.doc(`${doc.id}`).set(doc);
};
export const getRiderDetails = (
  key: string,
  callback: callbackFn,
): Promise<void | Response> => {
  return riders
    .doc(key)
    .get()
    .then(callback);
};

/// /////////////////////////////////////////////////////////////////////////////////////////////
export const createNewDriver = (doc): Promise<void | Response> => {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return drivers.doc(doc.uid).set(doc);
};
export const getDrivers = (callback): any => {
  return drivers.onSnapshot(callback);
};
export const getDriverDetails = (key, callback): Promise<void | Response> => {
  return drivers
    .doc(key)
    .get()
    .then(callback);
};
export const setDriver = (
  key,
  doc,
  callback1,
  callback2,
): Promise<void | Response> => {
  return drivers
    .doc(key)
    .set(doc)
    .then(callback1)
    .catch(callback2);
};

export const deleteDriver = (key, callback1, callback2): any => {
  drivers
    .doc(key)
    .delete()
    .then(callback1)
    .catch(callback2);
};

// /// /////////////////////////////////////////////////////////////////////////////////////////////

export const getTrips = (callback): any => {
  return trips.onSnapshot(callback);
};

export const getTripDetails = (key, callback): Promise<void | Response> => {
  return trips
    .doc(key)
    .get()
    .then(callback);
};

export const updateSeatOfTrip = (tripId, currentSeat, callback): any => {
  trips
    .doc(tripId)
    .update({
      ['bookings.' + currentSeat.seatId + '.seatState']: currentSeat.seatState,
      // ['bookings.' + seatId + '.active']: active,
    })
    .then(callback);
};

/// ////////////////////////////////////////////////////////////////////
export const createNewBooking = (doc, callback): Promise<Response> => {
  doc.updateInfo = {
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  return bookings
    .add({
      ...doc.trip,
      ...doc.rider,
      ...doc.driver,
      ...doc.vehicle,
      ...doc.pickup,
      ...doc.dropoff,
      ...doc.seat,
      ...doc.updateInfo,
      state: 0, // 0:booked, 1:traveling, 2: completed
    })
    .then(callback);
};

export const getBookings = (callback): any => {
  return bookings.onSnapshot(callback);
};

export const getUpcomingBookings = (callback): any => {
  return bookings.where('state', '==', 0).onSnapshot(callback);
};

export const getCurrentBookings = (callback): any => {
  return bookings.where('state', '==', 1).onSnapshot(callback);
};

/// ////////////////////////////////////////////////////////////

export async function fetchMessages(): Promise<any> {
  const results = await messages
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get();

  return results.docs;
}

export async function getMessage(callback): Promise<any> {
  await messages.orderBy('createdAt', 'desc').onSnapshot(function(snapshot) {
    callback(snapshot);
  });
}

export async function createMessage(doc): Promise<any> {
  try {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await messages.add(doc);
  } catch (e) {
    console.log('wwwww', e);
  }
}

export async function createTripReview(doc): Promise<any> {
  doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  await tripReviews.add(doc);
}
/// ////////////////////////////////////////////////////////////
