import config from 'src/config';

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

export const NETWORKS: {
  logo: string;
  name: string;
  id: string;
}[] = [
  {
    logo: 'icon-bsc',
    name: 'BNB Chain',
    id:
      process.env.REACT_APP_ENV === 'dev'
        ? config.networks.BSC_TESTNET.id
        : config.networks.BSC_MAINNET.id,
  },
  {
    logo: 'icon-ethereum',
    name: 'Ethereum',
    id:
      process.env.REACT_APP_ENV === 'dev'
        ? config.networks.GOERLI_TESTNET.id
        : config.networks.ETH_MAINNET.id,
  },
  {
    logo: 'icon-avax',
    name: 'Avalanche',
    id:
      process.env.REACT_APP_ENV === 'dev'
        ? config.networks.AVAX_TESTNET.id
        : config.networks.AVAX_MAINNET.id,
  },
  {
    logo: 'icon-polygon',
    name: 'Polygon',
    id:
      process.env.REACT_APP_ENV === 'dev'
        ? config.networks.POLYGON_TESTNET.id
        : config.networks.POLYGON_MAINNET.id,
  },
  {
    logo: 'icon-solana',
    name: 'Solana',
    id:
      process.env.REACT_APP_ENV === 'dev'
        ? config.networks.SOLANA_DEVNET.id
        : config.networks.SOLANA_MAINNET.id,
  },
];
