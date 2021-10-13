import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Movies from './../screens/Movies';
import MoviesDetails from './../screens/MoviesDetails';


export default Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Movies">
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{
          header: () => {},
          headerStyle: {
            height: 0,
          },
        }}
      />
        <Stack.Screen
        name="MoviesDetails"
        component={MoviesDetails}
        options={{
          header: () => {},
          headerStyle: {
            height: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
