import React, { ChangeEvent, useEffect, useState } from 'react';
import { AppButton, AppInput, AppTableOrderBook } from 'src/components';
import { useWebSocket } from 'src/hooks';
import 'src/styles/pages/HomePage.scss';
import useLanguage from 'src/hooks/useLanguage';
import { Box } from '@chakra-ui/react';

const HomePage = () => {
  const [input, setInput] = useState<string>('');
  const [webSocketURL, setWebSocketURL] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const { connectionStatus, latestMessage } = useWebSocket(webSocketURL);

  useEffect(() => {
    if (latestMessage) {
      setMessages((prevState) => [...prevState, latestMessage]);
    }
  }, [latestMessage]);

  const onChangeWebSocketURL = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { formatMessage, changeLanguage } = useLanguage();

  return (
    <>
      {formatMessage('welcome.title', { name: 'Largom' })}
      Home Page
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
      <AppInput value={input} onChange={onChangeWebSocketURL} />
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
        <AppTableOrderBook type='BUY' />
      </Box>
    </>
  );
};

export default HomePage;
