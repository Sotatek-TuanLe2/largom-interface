import React, { ChangeEvent, useEffect, useState } from 'react';
import { AppButton, AppInput } from 'src/components';
import { useWebSocket } from 'src/hooks';
import 'src/styles/pages/HomePage.scss';
import { useTranslation } from 'react-i18next';
import Storage from 'src/utils/storage';

const HomePage = () => {
  const [input, setInput] = useState<string>('');
  const [webSocketURL, setWebSocketURL] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const { connectionStatus, latestMessage } = useWebSocket(webSocketURL);

  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (latestMessage) {
      setMessages((prevState) => [...prevState, latestMessage]);
    }
  }, [latestMessage]);

  const onChangeWebSocketURL = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      {t('welcome.title', { name: 'Largom' })}
      Home Page
      <AppButton
        variant="main"
        onClick={() => {
          Storage.setLanguage('en');
          i18n.changeLanguage('en');
        }}
      >
        EN
      </AppButton>
      <AppButton
        variant="main"
        onClick={() => {
          Storage.setLanguage('vn');
          i18n.changeLanguage('vn');
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
    </div>
  );
};

export default HomePage;
