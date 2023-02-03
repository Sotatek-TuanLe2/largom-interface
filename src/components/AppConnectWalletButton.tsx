import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { ArrowDownIcon } from 'src/assets/icons';
import useWallet from 'src/hooks/useWallet';
import { formatWeiNumber } from 'src/utils/format';
import { getLogoNetwork, getNetworkConfig } from 'src/utils/network';
import { shortenWalletAddress } from 'src/utils/wallet';
import AppButton, { AppButtonProps } from './AppButton';
import ModalConnectWallet from './Modals/ModalConnectWallet';

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
      size="lg"
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
      <div>
        <Box className={getLogoNetwork(wallet?.getNework())} />
        <span>
          {`${formatWeiNumber(
            wallet?.getBalance() || '',
            networkConfig?.nativeCurrency.decimals,
          )} ${chainCurrency}`}
        </span>
        <span>
          {wallet?.address ? shortenWalletAddress(wallet?.address) : null}
        </span>
        <ArrowDownIcon width={7} onClick={onOpenModalConnectWallet} />
      </div>
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
