import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PhoneIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { AppButton, AppInput, AppTableOrderBook } from 'src/components';
import { useTranslate, useWebSocket } from 'src/hooks';
import rf from 'src/services/RequestFactory';
import 'src/styles/pages/HomePage.scss';
import { createValidator } from 'src/utils/validator';

const HomePage = () => {
  const [input, setInput] = useState<string>('socket.io');
  const [webSocketURL, setWebSocketURL] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const { connectionStatus, latestMessage } = useWebSocket(webSocketURL);

  const validator = useRef(createValidator());

  useEffect(() => {
    if (latestMessage) {
      setMessages((prevState) => [...prevState, latestMessage]);
    }
  }, [latestMessage]);

  const onChangeWebSocketURL = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { t, changeLanguage } = useTranslate();

  const getMockAPI = async () => {
    const res = await rf.getRequest('TradingRequest').getCandleChartData();
    console.log('getMockAPI-res', res);
  };

  useEffect(() => {
    getMockAPI();
  }, []);

  return (
    <>
      {t('welcome.title', { name: 'Largom' })}
      <AppButton
        variant="main"
        onClick={() => {
          changeLanguage('en');
        }}
      >
        EN
      </AppButton>
      <AppButton
        variant="main"
        onClick={() => {
          changeLanguage('vn');
        }}
      >
        VN
      </AppButton>
      <p>
        WebSocket URL Example:
        <br />
        +
        wss://sotadex-be.sotatek.works/socket.io/?authorization=null&EIO=3&transport=websocket
        <br />+
        wss://bstream.binance.com:9443/stream?streams=abnormaltradingnotices
      </p>
      <AppInput
        value={input}
        onChange={onChangeWebSocketURL}
        validate={{
          name: `webSocket`,
          validator: validator.current,
          rule: 'required',
        }}
        startAdornment={<PhoneIcon color="gray.300" />}
        endAdornment={<Box>USDT</Box>}
        label="Input"
      />
      <AppButton variant="main" onClick={() => setWebSocketURL(input)}>
        Run
      </AppButton>
      <p>Web Socket: {webSocketURL}</p>
      <p>Connection status: {connectionStatus}</p>
      <p>Last Message: {latestMessage}</p>
      <p>All Messages:</p>
      {messages.map((message, index) => (
        <>
          <p key={index}>{message}</p>
          <br />
        </>
      ))}
      <Box width={'340px'}>
        <AppTableOrderBook type="BUY" />
        <AppTableOrderBook type="SELL" showHeader={false} />
      </Box>
    </>
  );
};

export default HomePage;
