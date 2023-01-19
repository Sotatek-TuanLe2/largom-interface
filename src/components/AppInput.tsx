import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleProps, forwardRef } from '@chakra-ui/system';
import React, { ReactNode } from 'react';

interface AppInputProps extends InputProps {
  variant?: 'main';
  readOnly?: boolean;
  size?: string;
  endAdornment?: ReactNode;
  hiddenErrorText?: boolean;
}

const AppInput = forwardRef(
  (
    {
      variant = 'main',
      size = 'lg',
      readOnly,
      endAdornment,
      ...props
    }: AppInputProps,
    ref,
  ) => {
    return (
      <>
        <InputGroup size={size}>
          <Input {...props} variant={variant} ref={ref} readOnly={readOnly} />
          {endAdornment && <InputRightElement children={<>{endAdornment}</>} />}
        </InputGroup>
      </>
    );
  },
);

export default AppInput;

export const appInputStyles = {
  baseStyle: {
    field: {
      fontWeight: 400,
      borderRadius: '8px',
      '::-webkit-calendar-picker-indicator': {
        width: '20px',
        height: '20px',
      },
    },
  },
  variants: {
    main: (props: StyleProps) => ({
      field: {
        bg: mode('card.100', 'card.100')(props),
        border: '1px solid',
        color: mode('white', 'white')(props),
        borderColor: mode('line.100', 'line.300')(props),
        borderRadius: '6px',
        fontSize: '16px',
        p: '20px',
        _focus: {
          borderColor: mode('pressed.100', 'pressed.100')(props),
        },
        _placeholder: {
          color: mode('line.100', 'line.100')(props),
        },
        _disabled: {
          bg: mode('bg.200', 'bg.200')(props),
          borderColor: mode('bg.200', 'bg.200')(props),
          color: mode('paragraph.100', 'paragraph.100')(props),
        },
      },
    }),
  },
};
