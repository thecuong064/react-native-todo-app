import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export const Home = ({navigation}) => {
  return <SafeAreaView style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7CC15',
  },
});
