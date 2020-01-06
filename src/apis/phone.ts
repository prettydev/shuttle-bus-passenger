import call from 'react-native-phone-call';

export const phone = (number: string): void => {
  const args = {
    number: number,
    prompt: false,
  };

  call(args).catch(console.error);
};
