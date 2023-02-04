import Storage from './storage';

export const COMMON_ERROR_MESSAGE = 'Something went wrong!';

export const doesTokenExpire = () => {
  return (
    Storage.getExpireTimeToken() &&
    new Date().getTime() >= Number(Storage.getExpireTimeToken())
  );
};

export const isString = (value: unknown) => {
  return typeof value === 'string';
};

export const getErrorMessage = (err: any) => {
  const REGEX_GET_MESSAGE = /execution reverted:([^"]*)/gm;
  if (err.message?.includes('execution reverted:')) {
    const match = REGEX_GET_MESSAGE.exec(err.message);
    return match ? match[1] : COMMON_ERROR_MESSAGE;
  }
  if (isString(err)) {
    return err;
  }
  if (err.message && isString(err.message)) {
    return err.message;
  }
  return COMMON_ERROR_MESSAGE;
};
