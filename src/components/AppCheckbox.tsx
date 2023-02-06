import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

export interface IAppCheckbox extends CheckboxProps {
  label: string;
}

const AppCheckbox = forwardRef<HTMLInputElement, IAppCheckbox>((props, ref) => {
  return <Checkbox ref={ref}>{props.label}</Checkbox>;
});

export default AppCheckbox;

export const appCheckboxStyles = {
  baseStyle: {
    control: {
      _checked: {
        background: 'main.100',
        borderColor: 'main.100',
        _hover: {
          background: 'main.100',
          borderColor: 'main.100',
        },
      },
      _focus: {
        boxShadow: 'none',
      },
      borderWidth: '1px',
      borderRadius: '4px',
      borderColor: 'line.200',
    },
  },
  variants: {
    main: {
      //   colorScheme: 'whiteAlpha',
      control: {},
    },
  },
};
