// App.tsx
import React, { useEffect, useState } from 'react';
import "react-native-get-random-values";
import "react-native-crypto";
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { getMasterPassword } from './app/utils/secureStorage';

const App: React.FC = () => {
  const [isMasterPasswordSet, setIsMasterPasswordSet] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMasterPassword = async () => {
      const password = await getMasterPassword();
      setIsMasterPasswordSet(!!password);
    };
    checkMasterPassword();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
