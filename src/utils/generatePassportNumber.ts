// src/utils/generatePassportNumber.ts

export const generatePassportNumber = (code: string): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let serial = "";

  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    serial += chars[randomIndex];
  }

  return `${code}${serial}`;
};
