import { Box, Flex } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { ArrowDownIcon } from 'src/assets/icons';
import useWallet from 'src/hooks/useWallet';
import { formatWeiNumber } from 'src/utils/format';
import { getLogoNetwork, getNetworkConfig } from 'src/utils/network';
import { shortenWalletAddress } from 'src/utils/wallet';
import AppButton, { AppButtonProps } from './AppButton';
import ModalConnectWallet from './Modals/ModalConnectWallet';
import { WalletIcon, ArrowLightIcon } from 'src/assets/icons';
import 'src/styles/components/AppConnectWalletButton.scss';

interface IAppConnectWalletButton extends AppButtonProps {
  onConnectSuccess?: () => void;
}

const AppConnectWalletButton = forwardRef<
  HTMLButtonElement,
  IAppConnectWalletButton
>((props, ref) => {
  const { wallet, isOpenModalConnectWallet, toggleModalConnectWallet } =
    useWallet();

  const onOpenModalConnectWallet = () => toggleModalConnectWallet(true);

  const onCloseModalConnectWallet = () => {
    toggleModalConnectWallet(false);
    props.onConnectSuccess && props.onConnectSuccess();
  };

  const _renderUnconnectedWallet = () => (
    <AppButton
      ref={ref}
      size="md"
      onClick={onOpenModalConnectWallet}
      {...props}
    >
      {props.children}
    </AppButton>
  );

  const _renderConnectedWallet = () => {
    const networkConfig = getNetworkConfig(wallet?.getNework());
    const chainCurrency = networkConfig?.currency || '';

    return (
      <Flex className="wallet__info-account">
        <Flex className="wallet__balance">
          <Box className={getLogoNetwork(wallet?.getNework())} />
          <Box mx={2}>
            {`${formatWeiNumber(
              wallet?.getBalance() || '',
              networkConfig?.nativeCurrency.decimals,
            )} ${chainCurrency}`}
          </Box>

          <ArrowLightIcon />
        </Flex>

        <Flex className="wallet__address">
          <Box className="wallet__icon-wallet">
            <WalletIcon />
          </Box>
          <Box mr={3.5}>
            {wallet?.address ? shortenWalletAddress(wallet?.address) : null}
          </Box>
          <ArrowLightIcon />
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      {wallet ? _renderConnectedWallet() : _renderUnconnectedWallet()}
      <ModalConnectWallet
        open={isOpenModalConnectWallet}
        onClose={onCloseModalConnectWallet}
      />
    </>
  );
});

export default AppConnectWalletButton;
