import 'src/styles/pages/TradingPage.scss';
import React, { useState, FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AppInput, AppTabs } from 'src/components';
import {
  SearchIcon,
  StarIcon,
  ChangeIcon,
  ArrowDownIcon,
} from 'src/assets/icons';

const data = [
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
  {
    token: {
      symbol: 'BTC',
    },
    currency: {
      symbol: 'USDT',
    },
    price: 333,
    change: 4.3,
    volume: 334343,
  },
];

interface IFilter {
  value: string;
  isActive: boolean;
}

interface IToken {
  symbol: string;
}

interface ICurrency {
  symbol: string;
}

interface ICurrencies {
  token: IToken;
  currency: ICurrency;
  price: number;
  change: number;
  volume: number;
}

const SortTable: FC<IFilter> = ({ value, isActive }) => {
  return (
    <Flex className="filter-table">
      <Box
        className={`filter-table__top ${
          isActive && value === 'asc' ? 'active' : ''
        }`}
      >
        <ArrowDownIcon />
      </Box>
      <Box
        className={`filter-table__bottom ${
          isActive && value === 'desc' ? 'active' : ''
        }`}
      >
        <ArrowDownIcon />
      </Box>
    </Flex>
  );
};

const PartCurrencies = () => {
  const [search, setSearch] = useState<string>('');
  const [sortType, setSortType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [isShowVolumn, setIsShowVolumn] = useState<boolean>(true);
  const [favoriteTokens, setFavoriteTokens] = useState<any>([]);

  const onSort = () => {
    if (sortType === 'asc') {
      setSortType('desc');
      return;
    }

    if (sortType === 'desc') {
      setSortType('');
      return;
    }

    setSortType('asc');
    return;
  };
  return (
    <Box className="currencies">
      <Box className="currencies__box-filter">
        <AppInput
          placeholder={'Search'}
          size="sm"
          startAdornment={
            <>
              <SearchIcon />
            </>
          }
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.trim());
          }}
        />
      </Box>

      <Box className="table-currencies">
        <Box className="table-currencies__header">
          <Box textAlign="left">
            <Flex
              onClick={() => {
                onSort();
                setSortBy('pair');
              }}
            >
              Pair
              <SortTable value={sortType} isActive={sortBy === 'pair'} />
            </Flex>
          </Box>
          <Box textAlign="right">
            <Flex
              justifyContent={'flex-end'}
              onClick={() => {
                onSort();
                setSortBy('price');
              }}
            >
              Price
              <SortTable value={sortType} isActive={sortBy === 'price'} />
            </Flex>
          </Box>
          <Box textAlign="right">
            <Flex
              alignItems={'center'}
              justifyContent={'flex-end'}
              onClick={() => {
                onSort();
                setSortBy(isShowVolumn ? 'volume' : 'change');
              }}
            >
              <Box>{isShowVolumn ? 'Volume' : 'Change'}</Box>

              <SortTable
                value={sortType}
                isActive={
                  isShowVolumn ? sortBy === 'volume' : sortBy === 'change'
                }
              />
              <Box
                className="icon-change"
                onClick={() => setIsShowVolumn(!isShowVolumn)}
              >
                <ChangeIcon />
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box className="table-currencies__list">
          {data.map((item: ICurrencies, index: number) => {
            return (
              <Box className="table-currencies__content" key={index}>
                <Flex textAlign="left" alignItems="center">
                  <StarIcon />
                  <Flex mx={1.5}>
                    <Box className="name-token">{item?.token?.symbol}</Box>/
                    <Box>{item?.currency?.symbol}</Box>
                  </Flex>

                  <Box className="scope">3x</Box>
                </Flex>

                <Box textAlign="right">{item.price}</Box>

                {isShowVolumn ? (
                  <Box textAlign="right">{item.volume}</Box>
                ) : (
                  <Box textAlign="right" className="change up">
                    +{item.change}%
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PartCurrencies;
