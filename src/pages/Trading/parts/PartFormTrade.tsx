import 'src/styles/pages/TradingPage.scss';
import React, { useState, FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import {
  AppTabs,
  AppInput,
  AppSelect,
  AppInputRange,
  AppButton,
} from 'src/components';
import { TYPE_TRADE, TRADE_OPTIONS } from 'src/utils/constants';
import { ITabs } from 'src/components/AppTabs';

interface IDataFormTrade {
  stop: string;
  limit: string;
  price?: string;
  amount?: string;
  network: string;
}

interface IToken {
  symbol: string;
}

interface IFromTrade {
  type: string;
  tokenOut?: IToken;
  tokenIn?: IToken;
  typeTrade: string;
}

const networks: {
  label: string;
  value: string;
  icon: string;
}[] = [
  {
    label: 'Ethereum',
    value: 'Ethereum',
    icon: 'icon-rounded-ethereum',
  },
  {
    label: 'Bsc',
    value: 'Bsc',
    icon: 'icon-rounded-bsc',
  },
  {
    label: 'Polygon',
    value: 'Polygon',
    icon: 'icon-rounded-polygon',
  },
];

const FromTrade: FC<IFromTrade> = ({ type, tokenOut, tokenIn, typeTrade }) => {
  const initialForm = {
    stop: '',
    limit: '',
    price: '',
    amount: '',
    network: networks[0].value,
  };

  const [dataForm, setDataForm] = useState<IDataFormTrade>(initialForm);

  const _renderField = () => {
    if (typeTrade === TRADE_OPTIONS.LIMIT) {
      return (
        <Box>
          <Box className="form-trade__field">
            <AppInput
              value={dataForm.price}
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  price: e.target.value,
                });
              }}
              size={'md'}
              label={'Price'}
              endAdornment={
                <Box className="form-trade__currency">{tokenIn?.symbol}</Box>
              }
            />
          </Box>
        </Box>
      );
    }

    if (typeTrade === TRADE_OPTIONS.MARKET) {
      return (
        <Box>
          <Box className="form-trade__field">
            <AppInput
              value={'Market'}
              size={'md'}
              isDisabled
              label={'Price'}
              endAdornment={
                <Box className="form-trade__currency">{tokenIn?.symbol}</Box>
              }
            />
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <Box className="form-trade__field">
          <AppInput
            value={dataForm.stop}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                stop: e.target.value,
              });
            }}
            size={'md'}
            label={'Stop'}
            endAdornment={
              <Box className="form-trade__currency">{tokenIn?.symbol}</Box>
            }
          />
        </Box>

        <Box className="form-trade__field">
          <AppInput
            value={dataForm.limit}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                limit: e.target.value,
              });
            }}
            size={'md'}
            label={'Limit'}
            endAdornment={
              <Box className="form-trade__currency">{tokenIn?.symbol}</Box>
            }
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {_renderField()}
      <Box className="form-trade__field">
        <AppInput
          value={dataForm.amount}
          onChange={(e) => {
            setDataForm({
              ...dataForm,
              amount: e.target.value,
            });
          }}
          size={'md'}
          label={'Amount'}
          endAdornment={
            <Box className="form-trade__currency">{tokenOut?.symbol}</Box>
          }
        />
      </Box>

      <Box className="form-trade__field" zIndex={999}>
        <Box className="label">Network</Box>
        <AppSelect
          size="medium"
          options={networks}
          value={dataForm.network}
          onChange={(network: string) => {
            setDataForm({
              ...dataForm,
              network,
            });
          }}
        />
      </Box>

      <AppInputRange />

      <AppButton
        width="100%"
        className={`form-trade__btn-${
          type === TYPE_TRADE.BUY ? 'buy' : 'sell'
        }`}
      >
        {type === TYPE_TRADE.BUY ? 'Buy ' : 'Sell '}
        {tokenOut?.symbol}
      </AppButton>
    </Box>
  );
};

const PartFormTrade = () => {
  const [type, setType] = useState<string>('limit');

  const tokenIn = {
    symbol: 'USDT',
  };
  const tokenOut = {
    symbol: 'BTC',
  };

  const _renderFrom = () => {
    return (
      <Flex direction={'row'} justifyContent="space-between" wrap={'wrap'}>
        <Box width="49%">
          <Flex className={'form-trade__current-value'}>
            <Box className="label">Avbl</Box>
            <Box className="value">-- {tokenIn.symbol}</Box>
          </Flex>
          <FromTrade
            type={TYPE_TRADE.BUY}
            tokenOut={tokenOut}
            tokenIn={tokenIn}
            typeTrade={type}
          />
        </Box>

        <Box width="49%">
          <Flex className={'form-trade__current-value'}>
            <Box className="label">Avbl</Box>
            <Box className="value">-- {tokenOut.symbol}</Box>
          </Flex>
          <FromTrade
            type={TYPE_TRADE.SELL}
            tokenOut={tokenOut}
            tokenIn={tokenIn}
            typeTrade={type}
          />
        </Box>
      </Flex>
    );
  };
  const tabs: ITabs[] = [
    {
      id: TRADE_OPTIONS.LIMIT,
      name: 'Limit',
      content: <Box>{_renderFrom()}</Box>,
    },
    {
      id: TRADE_OPTIONS.MARKET,
      name: 'Market',
      content: <Box>{_renderFrom()}</Box>,
    },
    {
      id: TRADE_OPTIONS.STOP_LIMIT,
      name: 'Stop-limit',
      content: <Box>{_renderFrom()}</Box>,
    },
  ];

  return (
    <Box className="form-trade">
      <AppTabs tabs={tabs} onChange={setType} />
    </Box>
  );
};

export default PartFormTrade;
