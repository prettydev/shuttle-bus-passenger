import {
  Caption,
  Card,
  Colors,
  FAB,
  Portal,
  Subheading,
  Text,
  Theme,
  Title,
  withTheme,
} from 'react-native-paper';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { theme } from '../core/theme';

const HelpScreen = (): ReactElement => {
  const [view, setView] = useState('about');
  return (
    <Card
      style={{
        padding: 20,
        margin: 10,
        justifyContent: 'center',
        height: '97%',
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {view === 'about' && (
          <View>
            <Title>About the company</Title>
            <Subheading>1. Our services </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Image
              source={{
                uri: 'https://source.unsplash.com/random',
              }}
              style={{
                height: 200,
              }}
            />
            <Subheading>2. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>3. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>4. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>5. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
          </View>
        )}
        {view === 'terms' && (
          <View>
            <Title>Terms and Conditions</Title>
            <Subheading>1. Our services </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>2. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>3. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>4. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Subheading>5. Service areas </Subheading>
            <Text>Our company is the shuttle bus service company. </Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Text>We have modern buses, and excellent drivers.</Text>
            <Text>We have modern buses, and excellent drivers.</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'space-around',
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <FAB
          small
          icon="home-outline"
          color={theme.colors.icon}
          onPress={() => {
            setView('about');
          }}
          style={{ marginBottom: 15 }}
        />
        <FAB
          small
          icon="shield-check-outline"
          color={theme.colors.icon}
          onPress={() => {
            setView('terms');
          }}
        />
      </View>
    </Card>
  );
};

export default HelpScreen;
