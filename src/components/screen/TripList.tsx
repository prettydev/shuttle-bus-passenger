import Button from '../shared/Button';
import { DefaultNavigationProps } from '../../types';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useAppContext } from '../../providers/AppProvider';

const Container = styled.View`
  flex: 1;
  background-color: ${(props): string => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: DefaultNavigationProps<'Home'>;
}

function Page(props: Props): React.ReactElement {
  const {
    state: { user, booking },
    setUser,
    setTrip,
  } = useAppContext();

  return (
    <Container>
      <Text>{user ? user.userId : ''}</Text>
      <Button
        testID="btn"
        onClick={(): void => props.navigation.goBack()}
        text="Go Back"
        style={{
          backgroundColor: '#333333',
        }}
      />
    </Container>
  );
}

export default Page;
