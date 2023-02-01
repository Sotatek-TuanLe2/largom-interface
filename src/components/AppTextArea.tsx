import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  StyleProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import SimpleReactValidator from 'simple-react-validator';
import { useForceUpdate } from 'src/hooks';

interface ValidatorProps {
  validator: SimpleReactValidator;
  name: string;
  rule: string | Array<string | { [key: string]: unknown }>;
  options?: { [key: string]: unknown };
}

interface AppTextareaProps extends TextareaProps {
  variant?: 'main' | 'auth' | 'authSecondary' | 'search';
  validate?: ValidatorProps;
  hiddenErrorText?: boolean;
  label?: string;
}

const AppTextarea: FC<AppTextareaProps> = ({
  variant = 'main',
  validate,
  hiddenErrorText = false,
  label,
  ...props
}) => {
  const forceRender = useForceUpdate();
  const onBlur = () => {
    validate?.validator.showMessageFor(validate.name);
    forceRender();
  };
  return (
    <FormControl isRequired={props?.isRequired}>
      {' '}
      {!!label && (
        <FormLabel mb={0} color="border.200">
          {label}
        </FormLabel>
      )}
      <Textarea variant={variant} onBlur={onBlur} {...props} />
      {!hiddenErrorText &&
        validate &&
        validate.validator.message(
          validate.name,
          props.value,
          validate.rule,
          validate.options,
        )}
    </FormControl>
  );
};

export const appTextareaStyles = {
  baseStyle: {
    fontWeight: 400,
    borderRadius: '8px',
    resize: 'none',
  },

  variants: {
    main: (props: StyleProps) => ({
      backgroundColor: mode('transparent', 'transparent')(props),
      border: '1px solid',
      color: mode('white', 'white')(props),
      borderColor: mode('line.100', 'line.100')(props),
      borderRadius: '6px',
      fontSize: '16px',
      p: '20px',
      _placeholder: {
        color: mode('secondaryGray.500', 'whiteAlpha.300')(props),
      },
      _focus: {
        borderColor: mode('border.200', 'border.200')(props),
      },
    }),
  },
};

export default AppTextarea;
