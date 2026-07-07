const KEY = 0x5a;

const encodedPhone = [113, 110, 98, 111, 106, 104, 104, 99, 98, 106, 105, 106] as const;
const encodedPhoneDisplay = [111, 106, 104, 122, 104, 99, 98, 122, 106, 105, 106] as const;
const encodedEmail = [
  49, 53, 52, 46, 59, 49, 46, 26, 56, 63, 32, 42, 51, 63, 57, 32, 52, 35, 53, 62, 56, 51, 53, 40, 116,
  42, 54,
] as const;

const decode = (encoded: readonly number[]) =>
  encoded.map((code) => String.fromCharCode(code ^ KEY)).join("");

export const getPhone = () => decode(encodedPhone);
export const getPhoneDisplay = () => decode(encodedPhoneDisplay);
export const getEmail = () => decode(encodedEmail);
