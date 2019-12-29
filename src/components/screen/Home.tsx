import { DefaultNavigationProps, User } from '../../types';

import Button from '../shared/Button';
import { IC_MASK } from '../../utils/Icons';
import React from 'react';
import { View } from 'react-native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({ theme }): string => theme.background};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ContentWrapper = styled.View`
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40;
  width: 85%;
  align-self: center;
`;

const StyledText = styled.Text`
  font-size: 18;
  line-height: 27;
  color: ${({ theme }): string => theme.fontColor};
`;

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  let timer: number;
  const {
    state: { user, booking },
  } = useAppContext();

  const { changeThemeType } = useThemeContext();

  return (
    <Container>
      <ContentWrapper>
        <StyledText
          style={{
            marginTop: 100,
          }}
        >
          {user ? user.userId : ''}
        </StyledText>
        <StyledText>{user ? user.name : ''}</StyledText>
        <StyledText>{booking?.rider ? booking.rider.riderName : ''}</StyledText>
        <StyledText>
          {booking?.rider ? booking.rider.riderEmail : ''}
        </StyledText>
        <StyledText>
          {booking?.rider ? booking.rider.riderPhone : ''}
        </StyledText>
      </ContentWrapper>
      <ButtonWrapper>
        <Button
          testID="btn2"
          onClick={(): void => props.navigation.navigate('TripList')}
          text={getString('NAVIGATE', {})}
        />
        <View style={{ marginTop: 8 }} />
        <Button
          testID="btn3"
          onClick={(): void => props.navigation.navigate('BookingList')}
          text={getString('NAVIGATE', {})}
        />
        <View style={{ marginTop: 8 }} />
        <Button
          testID="btn3"
          onClick={(): void => changeThemeType()}
          text={getString('CHANGE_THEME')}
        />
      </ButtonWrapper>
    </Container>
  );
}

export default Page;
