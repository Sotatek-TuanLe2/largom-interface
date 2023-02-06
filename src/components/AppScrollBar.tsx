import { Scrollbars } from 'react-custom-scrollbars-2';
import React, { FC, ReactNode } from 'react';

interface IAppScrollBar {
  children: ReactNode;
  height: number;
}

const AppScrollBar: FC<IAppScrollBar> = ({ children, height }) => {
  return (
    <Scrollbars
      autoHide
      style={{ height }}
      renderThumbVertical={({ style, ...props }: any) => (
        <div
          style={{
            ...style,
            backgroundColor: '#282A38',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          {...props}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default AppScrollBar;
