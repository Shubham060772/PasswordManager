// app/utils/crypto.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = '3b9ac6d9a7b2f76c4d5f1a9b3c8e7f0e';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
