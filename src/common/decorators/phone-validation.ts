import { Matches } from 'class-validator';

export const isPhoneNumber = () => {
  // eslint-disable-next-line
  return Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'Phone number must be a valid',
  });
};
