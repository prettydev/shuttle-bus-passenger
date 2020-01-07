import { Card, Text } from 'react-native-paper';
import { DefaultNavigationProps, User } from '../../types';
import React, { useState } from 'react';
import ReviewModal from 'react-native-review-modal';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  const {
    state: { user, booking },
  } = useAppContext();

  const [starCount, setStarCount] = useState(3.6);

  return (
    <View>
      <ReviewModal
        starRating={starCount}
        onStarRatingPress={(rating) => {
          setStarCount(rating);
        }}
      />
    </View>
  );
}

export default Page;
