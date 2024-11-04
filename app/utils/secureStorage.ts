// app/utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';

export const savePassword = async (platform: string, username: string, password: string) => {
  const key = `${platform}/${username}`;
  await SecureStore.setItemAsync(key, password);
};

export const getPassword = async (platform: string, username: string): Promise<string | null> => {
  const key = `${platform}/${username}`;
  return await SecureStore.getItemAsync(key);
};

export const saveMasterPassword = async (password: string) => {
  await SecureStore.setItemAsync('masterPassword', password);
};

export const getMasterPassword = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('masterPassword');
};
