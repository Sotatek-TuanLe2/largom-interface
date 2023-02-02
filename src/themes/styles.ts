import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    main: {
      100: '#5367FE',
      800: '#5367fecc',
    },
    paragraph: {
      100: '#8D91A5',
      200: '#6C7080',
    },
    line: {
      100: '#465065',
      200: '#414558',
    },
    bg: {
      100: '#000224',
      200: '#1A203B',
    },
    pressed: {
      100: '#3346D4',
    },
    border: {
      100: '#272D52',
      200: '#9295A6',
    },
    yellow: {
      100: '#FFB547',
    },

    brand: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#11047A',
    },
    brandScheme: {
      100: '#E9E3FF',
      200: '#7551FF',
      300: '#7551FF',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A',
    },
    brandTabs: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#422AFB',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A',
    },
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559',
    },
    red: {
      100: '#EE5D50',
    },
    blue: {
      50: '#EFF4FB',
      100: '#4C84FF',
      200: '#2E5BFF',
      500: '#3965FF',
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547',
    },
    green: {
      100: '#28C76F',
    },
    navy: {
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111c44',
      900: '#0b1437',
    },
    gray: {
      100: '#FAFCFE',
    },
    white: {
      100: '#FFFFFF',
      800: '#ffffffcc',
    },
    card: {
      100: '#101530',
      200: '#21232F',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('black', 'black')(props),
        fontFamily: 'Inter',
        letterSpacing: '0.2px',
        fontWeight: 500,
        color: 'white',
      },
      input: {
        color: 'gray.700',
      },
      html: {
        fontFamily: 'Inter',
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
      '.table-temaplate': {
        table: {
          fontVariantNumeric: 'lining-nums tabular-nums',
          borderCollapse: 'collapse',
          w: 'full',
          th: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            textAlign: 'start',
            paddingInlineStart: 6,
            paddingInlineEnd: 6,
            pt: 3,
            pb: 3,
            lineHeight: '4',
            fontSize: 'xs',
            borderBottom: '1px',
            borderColor: mode('gray.100', 'gray.700')(props),
          },
          td: {
            paddingInlineStart: 6,
            paddingInlineEnd: 6,
            paddingTop: 4,
            paddingBottom: 4,
            lineHeight: 5,
            borderBottom: '1px',
            borderColor: mode('gray.100', 'gray.700')(props),
          },
        },
      },
    }),
  },
};
