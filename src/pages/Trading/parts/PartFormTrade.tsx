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
import useWallet from 'src/hooks/useWallet';
import AppConnectWalletButton from '../../../components/AppConnectWalletButton';
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
  const { wallet } = useWallet();

  const [dataForm, setDataForm] = useState<IDataFormTrade>(initialForm);

  const onChangeDataForm = (field: string, value: string) => {
    setDataForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const _renderFields = () => {
    switch (typeTrade) {
      case TRADE_OPTIONS.LIMIT:
        return (
          <Box>
            <Box className="trading-page__form__field">
              <AppInput
                value={dataForm.price}
                onChange={(e) => onChangeDataForm('price', e.target.value)}
                size={'md'}
                label={'Price'}
                endAdornment={
                  <Box className="trading-page__form__currency">
                    {tokenIn?.symbol}
                  </Box>
                }
              />
            </Box>
          </Box>
        );
      case TRADE_OPTIONS.MARKET:
        return (
          <Box>
            <Box className="trading-page__form__field">
              <AppInput
                value={'Market'}
                size={'md'}
                isDisabled
                label={'Price'}
                endAdornment={
                  <Box className="trading-page__form__currency">
                    {tokenIn?.symbol}
                  </Box>
                }
              />
            </Box>
          </Box>
        );
      default:
        return (
          <Box>
            <Box className="trading-page__form__field">
              <AppInput
                value={dataForm.stop}
                onChange={(e) => onChangeDataForm('stop', e.target.value)}
                size={'md'}
                label={'Stop'}
                endAdornment={
                  <Box className="trading-page__form__currency">
                    {tokenIn?.symbol}
                  </Box>
                }
              />
            </Box>
            <Box className="trading-page__form__field">
              <AppInput
                value={dataForm.limit}
                onChange={(e) => onChangeDataForm('limit', e.target.value)}
                size={'md'}
                label={'Limit'}
                endAdornment={
                  <Box className="trading-page__form__currency">
                    {tokenIn?.symbol}
                  </Box>
                }
              />
            </Box>
          </Box>
        );
    }
  };

  const _renderAmountField = () => (
    <Box className="trading-page__form__field">
      <AppInput
        value={dataForm.amount}
        onChange={(e) => onChangeDataForm('amount', e.target.value)}
        size={'md'}
        label={'Amount'}
        endAdornment={
          <Box className="trading-page__form__currency">{tokenOut?.symbol}</Box>
        }
      />
    </Box>
  );

  const _renderNetworkSelect = () => {
    if (!wallet) {
      return null;
    }
    return (
      <Box className="trading-page__form__field" zIndex={999}>
        <Box className="label">Network</Box>
        <AppSelect
          size="medium"
          options={networks}
          value={dataForm.network}
          onChange={(network: string) => onChangeDataForm('network', network)}
        />
      </Box>
    );
  };

  const _renderButton = () => {
    if (!wallet) {
      return (
        <AppConnectWalletButton width="100%" variant={'outline'}>
          Connect Wallet
        </AppConnectWalletButton>
      );
    }

    return (
      <AppButton
        width="100%"
        className={`trading-page__form__btn-${
          type === TYPE_TRADE.BUY ? 'buy' : 'sell'
        }`}
      >
        {type === TYPE_TRADE.BUY ? 'Buy ' : 'Sell '}
        {tokenOut?.symbol}
      </AppButton>
    );
  };

  return (
    <Box>
      {_renderFields()}
      {_renderAmountField()}
      {_renderNetworkSelect()}
      <AppInputRange />
      {_renderButton()}
    </Box>
  );
};

const PartFormTrade = () => {
  const [type, setType] = useState<string>(TRADE_OPTIONS.LIMIT);

  const tokenIn = {
    symbol: 'USDT',
  };
  const tokenOut = {
    symbol: 'BTC',
  };

  const _renderForm = () => {
    return (
      <Flex direction={'row'} justifyContent="space-between" wrap={'wrap'}>
        <Box width="49%">
          <Flex className={'trading-page__form__current-value'}>
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
          <Flex className={'trading-page__form__current-value'}>
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
      content: <Box>{_renderForm()}</Box>,
    },
    {
      id: TRADE_OPTIONS.MARKET,
      name: 'Market',
      content: <Box>{_renderForm()}</Box>,
    },
    {
      id: TRADE_OPTIONS.STOP_LIMIT,
      name: 'Stop-limit',
      content: <Box>{_renderForm()}</Box>,
    },
  ];

  return <AppTabs tabs={tabs} onChange={setType} />;
};

export default PartFormTrade;
