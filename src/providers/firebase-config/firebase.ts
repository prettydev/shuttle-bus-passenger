import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const drivers = firebase.firestore().collection('drivers');
const riders = firebase.firestore().collection('riders');
const trips = firebase.firestore().collection('trips');
const vehicles = firebase.firestore().collection('vehicles');
const bookings = firebase.firestore().collection('bookings');

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    console.log(
      'login with email ======================================',
      email,
      password,
    );

    return auth.signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return auth.signOut();
  },
  checkUserAuth: (user) => {
    return auth.onAuthStateChanged(user);
  },
  passwordReset: (email) => {
    return auth.sendPasswordResetEmail(email);
  },
  getCurrentUserId: () => {
    return auth.currentUser.uid;
  },

  /// //////////////////////////////////////////////////////////////////////////////////////////////
  createNewRider: (doc) => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return riders.doc(`${doc.uid}`).set(doc);
  },
  getRiderDetails: (key, callback) => {
    riders
      .doc(key)
      .get()
      .then(callback);
  },

  /// /////////////////////////////////////////////////////////////////////////////////////////////
  createNewDriver: (doc) => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return drivers.doc(`${doc.uid}`).set(doc);
  },
  getDrivers: (callback) => {
    drivers.onSnapshot(callback);
  },
  getDriverDetails: (key, callback) => {
    drivers
      .doc(key)
      .get()
      .then(callback);
  },
  setDriver: (key, doc, callback1, callback2) => {
    drivers
      .doc(key)
      .set(doc)
      .then(callback1)
      .catch(callback2);
  },
  deleteDriver: (key, callback1, callback2) => {
    drivers
      .doc(key)
      .delete()
      .then(callback1)
      .catch(callback2);
  },

  /// /////////////////////////////////////////////////////////////////////////////////////////////

  getTrips: (callback) => {
    trips.onSnapshot(callback);
  },
  getTripDetails: (key, callback) => {
    trips
      .doc(key)
      .get()
      .then(callback);
  },
  updateSeatOfTrip: (
    tripId,
    seatId,
    seatState,
    riderId,
    riderName,
    callback,
  ) => {
    trips
      .doc(tripId)
      .update({
        ['bookings.' + seatId + '.state']: seatState,
        ['bookings.' + seatId + '.riderId']: riderId,
        ['bookings.' + seatId + '.riderName']: riderName,
      })
      .then(callback);
  },

  /// ////////////////////////////////////////////////////////////////////////////////////////////
  createNewBooking: (doc, callback) => {
    doc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    doc.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return bookings.add(doc).then(callback);
  },
  getBookings: (callback) => {
    bookings.onSnapshot(callback);
  },
};

export default Firebase;
