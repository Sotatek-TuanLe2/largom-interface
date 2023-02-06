import { Flex, Radio, RadioGroup, RadioGroupProps } from '@chakra-ui/react';
import React from 'react';

interface IOption {
  value: string | number;
  label: string;
}

interface IAppRadioBtn extends Omit<RadioGroupProps, 'children'> {
  options: IOption[];
}

const AppRadioBtn: React.FC<IAppRadioBtn> = ({
  onChange,
  value,
  options,
  ...rest
}) => {
  return (
    <RadioGroup onChange={onChange} value={value} {...rest}>
      <Flex direction="row">
        {options.map((option, id) => (
          <Radio value={option.value} key={`${id}-radio`}>
            {option.label}
          </Radio>
        ))}
      </Flex>
    </RadioGroup>
  );
};

export const appRadioBtnStyles = {
  baseStyle: {
    control: {
      width: '15px',
      height: '15px',
      maxHeight: '15px',
      minHeight: '15px',
      borderWidth: '1px',
      borderColor: 'line.200',
      _checked: {
        width: '15px',
        height: '15px',

        borderColor: 'main.100',
        borderWidth: '1px',
        background: 'transparent',
        color: 'main.100',
        _focus: {
          boxShadow: 'none',
        },
        _hover: {
          borderColor: 'main.100',
          background: 'transparent',
        },
        _before: {
          width: '66%',
          height: '66%',
        },
      },
    },
  },
};

export default AppRadioBtn;
