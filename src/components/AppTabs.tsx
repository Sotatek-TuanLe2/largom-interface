import {
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
}

interface ITabs {
  name: ReactNode;
  content: ReactNode;
}

const AppTabs: FC<IAppTabs> = ({ defaultTab = 0, tabs }) => {
  return (
    <Tabs
      h={'full'}
      display="flex"
      flexDirection={'column'}
      variant={'unstyled'}
      colorScheme="transparent"
      defaultIndex={defaultTab}
      className="app-tab"
    >
      <TabList>
        <Flex>
          {tabs.map((tab: ITabs) => {
            return <Tab className="app-tab__name-tab">{tab.name}</Tab>;
          })}
        </Flex>
      </TabList>

      <TabPanels flex={1}>
        {tabs.map((tab: ITabs) => {
          return (
            <TabPanel h={'full'} className="app-tab__content-tab">
              {tab.content}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default AppTabs;
