import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './Screens';
import {Home} from '../screens';
import {Provider} from 'react-redux';
import store from '../redux/configureStore'

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Screens.HOME}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={Screens.HOME} component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default ApplicationNavigator;
