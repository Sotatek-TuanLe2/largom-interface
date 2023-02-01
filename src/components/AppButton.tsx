import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleProps } from '@chakra-ui/system';
import 'src/styles/components/AppButton.scss';

export interface AppButtonProps extends ButtonProps {
  variant?: 'main' | 'outline' | 'transparent';
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (props, ref) => {
    const { variant = 'main', children, ...rest } = props;
    return (
      <Button {...rest} variant={variant} ref={ref}>
        {children}
      </Button>
    );
  },
);

export default AppButton;

export const appButtonStyles = {
  baseStyle: {
    borderRadius: '6px',

    boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
    transition: '.25s all ease',
    boxSizing: 'border-box',
    fontWeight: 500,
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      boxShadow: 'none',
    },
  },
  sizes: {
    sm: {
      px: '16px',
      py: '8px',
      minHeight: '32px',
    },
    md: {
      px: '20px',
      py: '12px',
      minHeight: '40px',
    },
    lg: {
      px: '24px',
      py: '16px',
      minHeight: '48px',
    },
  },
  variants: {
    outline: (props: StyleProps) => ({
      borderRadius: '6px',
      bg: 'none',
      color: 'white.100',
      borderWidth: '1px',
      borderColor: 'line.200',
      _hover: {
        color: 'white.800',
        bg: 'none',
        borderColor: 'line.200',
        borderWidth: '1px',
        _disabled: {},
      },
      _disabled: {
        bg: mode('line.100', 'line.100')(props),
        color: 'paragraph.200',
        borderWidth: '0px',
      },
    }),
    main: (props: StyleProps) => ({
      bg: mode('main.100', 'main.100')(props),
      color: 'white.100',
      fontSize: '16px',
      _hover: {
        bg: mode('pressed.100', 'pressed.100')(props),
        _disabled: {},
      },
      _disabled: {
        bg: mode('line.100', 'line.100')(props),
        color: 'paragraph.200',
      },
    }),
    transparent: (props: StyleProps) => ({
      bg: 'transparent',
      color: 'main.100',
      fontSize: '16px',
      _hover: {
        color: 'main.800',
        _disabled: {
          bg: mode('line.100', 'line.100')(props),
        },
      },
      _disabled: {
        bg: mode('line.100', 'line.100')(props),
        color: 'paragraph.200',
        borderWidth: '0px',
      },
    }),
  },
};
