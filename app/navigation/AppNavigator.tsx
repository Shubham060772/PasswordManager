// app/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SetupMasterPassword from '../screens/SetupMasterPassword';
import PasswordVault from '../screens/PasswordVault';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SetupMasterPassword">
      <Stack.Screen name="SetupMasterPassword" component={SetupMasterPassword} />
      <Stack.Screen name="PasswordVault" component={PasswordVault} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
