// app/screens/SetupMasterPassword.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { saveMasterPassword } from '../utils/secureStorage';

const SetupMasterPassword: React.FC = ({ navigation }: any) => {
  const [password, setPassword] = useState('');

  const handleSetPassword = async () => {
    if (password.length >= 4) {
      await saveMasterPassword(password);
      navigation.replace('PasswordVault');
    } else {
      alert("Password must be at least 4 characters long.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Set a Master Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Master Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Set Password" onPress={handleSetPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default SetupMasterPassword;
