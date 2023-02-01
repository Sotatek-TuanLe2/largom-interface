import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  Box,
  InputLeftElement,
  FormLabel,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleProps, forwardRef } from '@chakra-ui/system';
import React, { ReactNode, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useForceUpdate } from 'src/hooks';

interface ValidatorProps {
  validator: SimpleReactValidator;
  name: string;
  rule: string | Array<string | { [key: string]: unknown }>;
  options?: { [key: string]: unknown };
}

interface AppInputProps extends InputProps {
  variant?: 'main' | 'filled';
  validate?: ValidatorProps;
  readOnly?: boolean;
  size?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  hiddenErrorText?: boolean;
  label?: string;
}

const AppInput = forwardRef(
  (
    {
      variant = 'filled',
      size = 'lg',
      readOnly,
      startAdornment,
      endAdornment,
      validate,
      isRequired = false,
      hiddenErrorText = false,
      label,
      ...props
    }: AppInputProps,
    ref,
  ) => {
    useEffect(() => {
      if (validate)
        validate.validator.element = (message: string) => (
          <Text color={'red.100'}>{message}</Text>
        );
    }, [validate]);

    const forceRender = useForceUpdate();
    const onBlur = () => {
      validate?.validator.showMessageFor(validate.name);
      forceRender();
    };

    return (
      <FormControl isRequired={isRequired}>
        {!!label && (
          <FormLabel mb={0} color="border.200">
            {label}
          </FormLabel>
        )}
        <InputGroup size={size}>
          {startAdornment && (
            <InputLeftElement
              pointerEvents="none"
              children={<>{startAdornment}</>}
            />
          )}
          <Input
            {...props}
            variant={variant}
            ref={ref}
            readOnly={readOnly}
            onBlur={onBlur}
            paddingInline={props?.paddingInline}
          />
          {endAdornment && (
            <InputRightElement right={'14px'} children={<>{endAdornment}</>} />
          )}
        </InputGroup>
        <>
          {!hiddenErrorText &&
            validate &&
            !readOnly &&
            validate.validator.message(
              validate.name,
              props.value,
              validate.rule,
              validate.options,
            )}
        </>
      </FormControl>
    );
  },
);

export default AppInput;

export const appInputStyles = {
  baseStyle: {
    field: {
      fontWeight: 400,
      borderRadius: '4px',
      '::-webkit-calendar-picker-indicator': {
        width: '20px',
        height: '20px',
      },
      fontSize: '16px',
    },
  },
  variants: {
    main: (props: StyleProps) => ({
      field: {
        bg: mode('transparent', 'transparent')(props),
        border: '1px solid',
        color: mode('white', 'white')(props),
        borderColor: mode('line.100', 'line.100')(props),
        _focus: {
          borderColor: mode('border.200', 'border.200')(props),
        },
        _placeholder: {
          color: mode('line.100', 'line.100')(props),
        },
        _disabled: {
          bg: mode('card.200', 'card.200')(props),
          border: 'none',
          color: mode('white.100', 'white.100')(props),
        },
      },
    }),
    filled: (props: StyleProps) => ({
      field: {
        bg: mode('card.200', 'card.200')(props),
        border: 'none',
        color: mode('white.100', 'white.100')(props),
        _hover: {
          bg: mode('card.200', 'card.200')(props),
        },
        _focus: {
          borderColor: mode('border.200', 'border.200')(props),
          bg: mode('card.200', 'card.200')(props),
        },
        _placeholder: {
          color: mode('white.100', 'white.100')(props),
        },
        _disabled: {
          bg: mode('card.200', 'card.200')(props),
          border: 'none',
          color: mode('white.100', 'white.100')(props),
        },
      },
    }),
  },
};
