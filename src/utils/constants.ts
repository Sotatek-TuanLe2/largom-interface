export const TIME_EXPIRE_TOKEN_CLIENT = 20 * 60 * 1000; // miliseconds

export const NOT_AVAILABLE_TEXT = '--';

export const TO_BE_ANNOUCED_TEXT = 'TBA';

export enum WS_CONNECTION_STATUS {
  CONNECTING = 'Connecting',
  OPEN = 'Open',
  CLOSING = 'Closing',
  CLOSED = 'Closed',
  UNINSTANTIATED = 'Uninstantiated',
}

export const I18_NAMESPACE = 'common'; // 'common' is our custom namespace

export const MOCK_API_PORT = 9000;

export const TYPE_TRADE = {
  SELL: 'SELL',
  BUY: 'BUY',
};
