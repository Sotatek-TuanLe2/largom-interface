import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppButton } from 'src/components';
import { RootState } from 'src/store';
import { setOpenModalSignatureRequired } from 'src/store/wallet';
import { toastError } from 'src/utils/notify';
import BaseModal from './BaseModal';
import { getErrorMessage } from 'src/utils/helpers';
import React from 'react';

const ModalSignatureRequired = () => {
  const { openModalSignatureRequired } = useSelector(
    (state: RootState) => state.wallet,
  );
  const dispatch = useDispatch();
  const { connector, address } = useSelector(
    (state: RootState) => state.wallet,
  );

  const onLinkWallet = async () => {
    try {
      if (!connector || !address) {
        return;
      }
      dispatch(setOpenModalSignatureRequired(false));
    } catch (error) {
      toastError(getErrorMessage(error));
    }
  };

  return (
    <BaseModal
      size="xl"
      title="Signature Required"
      isOpen={openModalSignatureRequired}
      isHideCloseIcon
      onClose={() => dispatch(setOpenModalSignatureRequired(false))}
    >
      <Box textAlign={'center'}>
        <Box marginBottom={5}>Please sign on your wallet to link account.</Box>
        <AppButton onClick={onLinkWallet}>Sign in the wallet</AppButton>
      </Box>
    </BaseModal>
  );
};

export default ModalSignatureRequired;
