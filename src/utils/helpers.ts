import Storage from './storage';

export const doesTokenExpire = () => {
  return (
    Storage.getExpireTimeToken() &&
    new Date().getTime() >= Number(Storage.getExpireTimeToken())
  );
};
