import { Box, Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import useWallet from 'src/hooks/useWallet';
import config from 'src/config';
import { METAMASK_WALLET } from 'src/connectors';
import { isMobile } from 'react-device-detect';
import { NETWORKS } from 'src/utils/constants';
import { getErrorMessage } from 'src/utils/chart';
import Storage from 'src/utils/storage';
import { switchNetwork } from 'src/utils/network';
import { toastError } from 'src/utils/notify';

interface IModalConnectWallet {
  open: boolean;
  onClose: () => void;
}

const ModalConnectWallet: FC<IModalConnectWallet> = ({ open, onClose }) => {
  const { wallet, connectWallet } = useWallet();
  const defaultNetwork = wallet ? wallet.getNework() : Storage.getNetwork();
  const [selectedNetwork, setSelectedNetwork] =
    useState<string>(defaultNetwork);

  useEffect(() => {
    if (wallet?.getNework()) {
      setSelectedNetwork(wallet.getNework());
    }
  }, [wallet?.getNework()]);

  const onClickNetwork = (networkId: string) => {
    setSelectedNetwork(networkId);
  };

  const onClickWallet = async (walletId: string) => {
    try {
      if ([METAMASK_WALLET].includes(walletId)) {
        const provider = (window as any).ethereum;
        await switchNetwork(defaultNetwork, provider);
      }
      await connectWallet(walletId, defaultNetwork);
      onClose();
    } catch (error) {
      toastError(getErrorMessage(error));
    }
  };

  const _renderNetworks = () => {
    return NETWORKS.map((network) => {
      const { id, logo, name } = network;
      return (
        <Box
          key={id}
          className={'box-wallet'}
          onClick={() => onClickNetwork(id)}
        >
          <Box className={logo} />
          <Box className={'name-wallet'}>{name}</Box>
        </Box>
      );
    });
  };

  const _renderWallets = () => {
    const selectedNetworkConfig = config.networks[selectedNetwork];
    const availableConnectorKeys = Object.keys(
      selectedNetworkConfig.connectors,
    );

    return availableConnectorKeys.map((connectorKey) => {
      const connectorInfo = selectedNetworkConfig.connectors[connectorKey];
      const { id, icon, name } = connectorInfo;
      return (
        <Box
          key={id}
          className={'box-wallet'}
          onClick={() => onClickWallet(id)}
        >
          <Box className={icon} />
          <Box className={'name-wallet'}>{name}</Box>
        </Box>
      );
    });
  };

  return (
    <BaseModal size="xl" title="Choose Wallet" isOpen={open} onClose={onClose}>
      <Flex justifyContent={'center'}>{_renderNetworks()}</Flex>
      <Flex justifyContent={'center'}>{_renderWallets()}</Flex>
    </BaseModal>
  );
};

export default ModalConnectWallet;
