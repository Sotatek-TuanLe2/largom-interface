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

const categories: ICategory[] = [
  {
    name: 'Favorites',
    id: 'favorites',
  },
  {
    name: 'Margin',
    id: 'margin',
  },
  {
    name: 'BUSD',
    id: 'BUSD',
  },
  {
    name: 'USDT',
    id: 'USDT',
  },
  {
    name: 'BNB',
    id: 'BNB',
  },
  {
    name: 'BTC',
    id: 'BTC',
  },
];

interface ISortTable {
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

interface ICategory {
  name: string;
  id: string;
}

const SortTable: FC<ISortTable> = ({ value, isActive }) => {
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
  const [category, setCategory] = useState<string>('');
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

        <Flex className="currencies__categories">
          {categories.map((item: ICategory) => {
            return (
              <Box
                onClick={() => setCategory(item.id)}
                key={item.id}
                className={category === item.id ? 'active' : ''}
              >
                {item.name}
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box className="table-currencies">
        <Box className="table-currencies__header">
          <Box textAlign="left">
            <Flex>
              <Flex
                onClick={() => {
                  onSort();
                  setSortBy('pair');
                }}
              >
                Pair
                <SortTable value={sortType} isActive={sortBy === 'pair'} />
              </Flex>
            </Flex>
          </Box>
          <Box textAlign="right">
            <Flex justifyContent={'flex-end'}>
              <Flex
                onClick={() => {
                  onSort();
                  setSortBy('price');
                }}
              >
                Price
                <SortTable value={sortType} isActive={sortBy === 'price'} />
              </Flex>
            </Flex>
          </Box>
          <Box textAlign="right">
            <Flex justifyContent={'flex-end'}>
              <Flex
                alignItems={'center'}
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
