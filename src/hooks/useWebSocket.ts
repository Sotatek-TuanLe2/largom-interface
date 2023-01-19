import { useMemo } from 'react';
import webSocketHook, { Options, ReadyState } from 'react-use-websocket';
import { WS_CONNECTION_STATUS } from 'src/utils/constants';

type ReturnType = {
  connectionStatus: string;
  latestMessage: any;
};

const useWebSocket = (
  url: string,
  options?: Omit<Options, 'shouldReconnect'>,
): ReturnType => {
  const { readyState, lastMessage } = webSocketHook(url, {
    ...options,
    shouldReconnect: () => true,
  });

  const connectionStatus = useMemo(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        return WS_CONNECTION_STATUS.CONNECTING;
      case ReadyState.OPEN:
        return WS_CONNECTION_STATUS.OPEN;
      case ReadyState.CLOSING:
        return WS_CONNECTION_STATUS.CLOSING;
      case ReadyState.CLOSED:
        return WS_CONNECTION_STATUS.CLOSED;
      case ReadyState.UNINSTANTIATED:
        return WS_CONNECTION_STATUS.UNINSTANTIATED;
    }
  }, [readyState]);

  const latestMessage = useMemo(() => {
    return lastMessage?.data;
  }, [lastMessage]);

  return {
    connectionStatus,
    latestMessage,
  };
};

export default useWebSocket;
