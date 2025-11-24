import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);

export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  return `SP-${timestamp}-${nanoid()}`;
};

