// app/screens/PasswordVault.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { savePassword, getPassword } from '../utils/secureStorage';
import { encryptData, decryptData } from '../utils/crypto';

interface PasswordItem {
  platform: string;
  username: string;
  encryptedPassword: string;
}

const PasswordVault: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const loadPassword = async (platform: string, username: string) => {
    const encryptedPassword = await getPassword(platform, username);
    if (encryptedPassword) {
      const decryptedPassword = decryptData(encryptedPassword);
      alert(`Password for ${platform}/${username}: ${decryptedPassword}`);
    } else {
      alert("No password found for this platform and username.");
    }
  };

  const addPassword = async () => {
    const encryptedPassword = encryptData(newPassword);
    const newEntry: PasswordItem = { platform: newPlatform, username: newUsername, encryptedPassword };
    const updatedPasswords = [...passwords, newEntry];
    setPasswords(updatedPasswords);
    
    // Store the encrypted password with a key structure: platform/username
    await savePassword(newPlatform, newUsername, encryptedPassword);

    // Clear the input fields
    setNewPlatform('');
    setNewUsername('');
    setNewPassword('');
  };

  return (
    <View style={styles.container}>
      <Text>Password Vault</Text>

      <FlatList
        data={passwords}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.platform}/{item.username}
            </Text>
            <Button title="View Password" onPress={() => loadPassword(item.platform, item.username)} />
          </View>
        )}
        keyExtractor={(item) => `${item.platform}/${item.username}`}
      />

      <TextInput
        style={styles.input}
        placeholder="Platform"
        value={newPlatform}
        onChangeText={setNewPlatform}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter a new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Add Password" onPress={addPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 },
});

export default PasswordVault;
