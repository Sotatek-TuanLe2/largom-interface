import {
  BaseProvider,
  FallbackProvider,
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers';
import _ from 'lodash';
import config from 'src/config';
import { toastError } from 'src/utils/notify';

export const getNetworkConfig = (networkId: string | undefined) => {
  if (!networkId) {
    return null;
  }
  const network =
    config.networks[networkId] ||
    _.find(
      config.networks,
      (network) => network.id.toUpperCase() === networkId.toUpperCase(),
    );
  if (!network) {
    return null;
  }
  return network;
};

export const getNetworkProvider = (network = ''): FallbackProvider => {
  network = network ? network : config.defaultNetwork;
  const networkConfig = getNetworkConfig(network);
  if (!networkConfig) {
    console.error(
      `[getNetworkProvider] throw error: networkConfig ${network} not found`,
    );
  }
  const rpcUrls = _.shuffle(networkConfig?.rpcUrls);

  const providers: {
    provider: BaseProvider;
    priority: number;
    stallTimeout: number;
  }[] = [];
  rpcUrls.forEach((rpcUrl, index) => {
    const provider: BaseProvider = new StaticJsonRpcProvider(
      rpcUrl,
      networkConfig?.chainId,
    );
    const priority = index + 1;
    providers.push({
      provider,
      priority,
      stallTimeout: 4000 + 100 * priority,
    });
  });

  return new FallbackProvider(providers, 1);
};

export const switchNetwork = async (
  network: string,
  provider: JsonRpcProvider | null | undefined,
) => {
  if (!provider) {
    throw new Error('[Switch Network] No provider was found');
  }
  const chainId = getNetworkConfig(network)?.chainId;
  if (!chainId) {
    throw new Error('[Switch Network] No chainId was found');
  }
  try {
    await provider.send('wallet_switchEthereumChain', [
      {
        chainId: `0x${chainId.toString(16)}`,
      },
    ]);
  } catch (error: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    // TODO: change 4902 to constant variable
    if (error.code === 4902 || error.code === -32603) {
      toastError('Please add this network to your wallet to continue');
      return addNewNetwork(network, provider);
    }
    // 4001: User rejected to switch network
    return new Promise((_resolve, reject) => reject(error));
  }
};

const addNewNetwork = (network: string, provider: JsonRpcProvider) => {
  try {
    const networkConfig = getNetworkConfig(network);
    if (!networkConfig) {
      return;
    }
    const { chainId, name, nativeCurrency, rpcUrls, blockExplorer } =
      networkConfig;
    return provider.send('wallet_addEthereumChain', [
      {
        chainId: `0x${chainId.toString(16)}`,
        chainName: name,
        nativeCurrency,
        rpcUrls,
        blockExplorerUrls: [blockExplorer.url],
      },
    ]);
  } catch (error: any) {
    console.error(`[AddNewNetwork] throw exception: ${error.message}`, error);
    throw error;
  }
};
