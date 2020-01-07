import React, { ReactElement, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import TextArea from '@freakycoder/react-native-text-area';
import { createTripReview } from '../../apis/firebase';
import { theme } from '../core/theme';
import { useAppContext } from '../../providers/AppProvider';

const Page = (props): ReactElement => {
  const {
    state: { user, booking },
  } = useAppContext();

  const driverId = props.navigation.getParam('driverId');
  const tripId = props.navigation.getParam('tripId');
  const vehicleId = props.navigation.getParam('vehicleId');

  const [star, setStar] = useState(0);
  const [review, setReview] = useState('');

  return (
    <Modal isVisible={true}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,

          height: 325,
          width: '90%',
          borderRadius: 16,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>
            How was your experience?
          </Text>
          <View style={{ marginRight: 8 }}>
            <StarRating
              maxStars={5}
              starSize={30}
              disabled={false}
              animation="jello"
              rating={star}
              fullStarColor={theme.colors.icon}
              emptyStarColor={theme.colors.icon}
              starStyle={{ marginLeft: 8 }}
              selectedStar={(rating): void => setStar(rating)}
            />
          </View>
          <TextArea
            maxCharLimit={50}
            placeholderTextColor="black"
            exceedCharCountColor="red"
            placeholder={'Write your review...'}
            style={{ height: 150, borderRadius: 16 }}
            onChangeText={(text): void => setReview(text)}
          />

          <Button
            icon="content-save-outline"
            mode="contained"
            color={theme.colors.icon}
            onPress={(): void => {
              createTripReview({
                star,
                review,
                userId: user.userId,
                tripId,
                driverId,
                vehicleId,
              });
              props.navigation.navigate('Home');
            }}
          >
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default Page;
