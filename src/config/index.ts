/* eslint-disable @typescript-eslint/no-explicit-any */
import prod from './prod.json';
import dev from './dev.json';

const env = process.env.REACT_APP_ENV || 'prod';
const configs: any = {
  prod,
  dev,
};
const config: Config = configs[env];

interface Connector {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  mobile: boolean;
  deepLink: string;
  options: {
    [key: string]: any;
  };
  extensionLink?: {
    chrome: string;
    firefox: string;
    brave: string;
    edge: string;
  };
}


export interface Config {
  auth: {
    domain: string;
    message: string;
    secretKey: string;
  };
  api: {
    baseUrlApi: string;
  };
  defaultNetwork: string;
  defaultChainId: number;
  connectors: {
    [key: string]: Connector;
  };
}

export default config;
