import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';
import 'src/styles/components/AppTabs.scss';

interface IAppTabs {
  defaultTab?: number;
  tabs: ITabs[];
  rightElement?: ReactNode;
}

interface ITabs {
  name: ReactNode;
  content: ReactNode;
}

const AppTabs: FC<IAppTabs> = ({ defaultTab = 0, tabs, rightElement }) => {
  return (
    <Tabs
      variant={'unstyled'}
      colorScheme="transparent"
      defaultIndex={defaultTab}
      className="app-tab"
    >
      <TabList>
        <Flex justifyContent={'space-between'} alignItems="center" w="100%">
          <Flex>
            {tabs.map((tab: ITabs, id: number) => {
              return (
                <Tab className="app-tab__name-tab" key={`${id}_tab-name`}>
                  {tab.name}
                </Tab>
              );
            })}
          </Flex>
          <Box>{rightElement ? rightElement : ''}</Box>
        </Flex>
      </TabList>

      <TabPanels>
        {tabs.map((tab: ITabs, id: number) => {
          return (
            <TabPanel className="app-tab__content-tab" key={`${id}_tab-panels`}>
              {tab.content}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default AppTabs;
