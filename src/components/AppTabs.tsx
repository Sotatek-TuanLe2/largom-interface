import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';
import 'src/styles/components/AppTabs.scss';

interface IAppTabs {
  defaultTab?: number;
  tabs: ITabs[];
  onChange?: (value: string) => void;
  rightElement?: () => ReactNode;
}
export interface ITabs {
  name: string;
  content: ReactNode;
  id: string;
}

const AppTabs: FC<IAppTabs> = ({
  defaultTab = 0,
  tabs,
  onChange,
  rightElement,
}) => {
  return (
    <Tabs
      h={'full'}
      display="flex"
      flexDirection={'column'}
      variant={'unstyled'}
      colorScheme="transparent"
      defaultIndex={defaultTab}
      className="app-tab"
      isLazy
    >
      <TabList className="tab-list">
        <Flex justifyContent={'space-between'} alignItems="center" w="100%">
          <Flex>
            {tabs.map((tab: ITabs) => {
              return (
                <Tab
                  key={tab.id}
                  className="app-tab__name-tab"
                  onClick={() => onChange && onChange(tab.id)}
                >
                  {tab.name}
                </Tab>
              );
            })}
          </Flex>
          <Box>{rightElement ? rightElement() : ''}</Box>
        </Flex>
      </TabList>

      <TabPanels flex={1}>
        {tabs.map((tab: ITabs) => {
          return (
            <TabPanel key={tab.id} h={'full'} className="app-tab__content-tab">
              {tab.content}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default AppTabs;
