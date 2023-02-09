import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
// import { NoticeIcon } from 'src/assets/icons';
import AppCheckbox from '../AppCheckbox';
import BaseModal from './BaseModal';

interface IModalConnectWallet {
  open: boolean;
  onClose: () => void;
}

interface IStep {
  id: number;
  title: string;
  content: string;
}

const STEPS: IStep[] = [
  {
    id: 1,
    title: 'Verify ownership',
    content: 'Confirm you are the owner of this wallet',
  },
  {
    id: 2,
    title: 'Enable trading',
    content: 'Enable secure access to our API for lightning quick trading',
  },
];

const ModalLinkWallet: React.FC<IModalConnectWallet> = ({ open, onClose }) => {
  return (
    <BaseModal
      size="xl"
      title="Link Wallet"
      isOpen={open}
      onClose={onClose}
      className="modal-link-wallet"
    >
      <Box>
        <div className="modal-link-wallet--des">
          You will receive two signature requests. Signing is free and will not
          send a transaction.
        </div>
        <Flex direction={'column'} className="modal-link-wallet--content">
          {STEPS.map((step: IStep) => {
            return (
              <Flex className="content-step" alignItems={'center'}>
                <div className="content-step--id">{step.id}</div>
                <div>
                  <Text className="content-step--title">{step.title}</Text>
                  <Text className="content-step--content">{step.content}</Text>
                </div>
              </Flex>
            );
          })}

          <Flex alignItems={'center'}>
            <AppCheckbox label="Remember me" pr={'8px'} />
            {/* <NoticeIcon /> */}
          </Flex>
        </Flex>
      </Box>
    </BaseModal>
  );
};

export default ModalLinkWallet;
