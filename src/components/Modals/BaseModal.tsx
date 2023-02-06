import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
} from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import { ModalProps, ModalHeaderProps } from '@chakra-ui/modal/src/modal';
import 'src/styles/components/BaseModal.scss';
import { CloseIcon } from '@chakra-ui/icons';

export interface BaseModalProps extends ModalProps {
  title?: string;
  description?: string;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | 'full';
  isCentered?: boolean;
  isHideCloseIcon?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  isLoadingButtonRight?: boolean;
  styleHeader?: ModalHeaderProps;
  icon?: string;
  isBack?: boolean;
}

const BaseModal: FC<BaseModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  size = 'md',
  isCentered = true,
  isHideCloseIcon = false,
  children,
  closeOnOverlayClick = false,
  className,
  styleHeader,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        isCentered={isCentered}
        closeOnOverlayClick={closeOnOverlayClick}
        autoFocus={false}
      >
        <ModalOverlay bg="blackAlpha.300" />
        <ModalContent className={`${className} modal`}>
          {!isHideCloseIcon && (
            <Box className={'modal__btn-close'} onClick={onClose}>
              <CloseIcon />
            </Box>
          )}

          <Flex flexDirection={'column'} className={'content-modal'}>
            {title && (
              <Box className={`modal__title`} {...styleHeader}>
                {title}
              </Box>
            )}

            {description && (
              <Box className={'modal__description'}>{description}</Box>
            )}

            <ModalBody>{children}</ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
