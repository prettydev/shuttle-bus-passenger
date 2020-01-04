export const emailValidator = (email: string): string => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string): string => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const cpasswordValidator = (
  password: string,
  cpassword: string,
): string => {
  if (password !== cpassword) return 'Passwords not equal.';

  return '';
};

export const nameValidator = (name: string): string => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const phoneValidator = (phone: string): string => {
  const re = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;

  if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';
  if (!re.test(phone)) return 'Ooops! We need a valid phone number.';

  return '';
};
