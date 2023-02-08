import 'src/styles/pages/TradingPage.scss';
import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AppInput, AppTableSorting } from 'src/components';
import { SearchIcon, StarIcon, ChangeIcon } from 'src/assets/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { ICurrencyPair } from 'src/store/metadata';
import { ISorter } from 'src/components/AppTableSorting';

const CATEGORY_IDS = {
  FAVORITES: 'favorites',
  MARGIN: 'margin',
};

const categories: ICategory[] = [
  {
    name: 'Favorites',
    id: CATEGORY_IDS.FAVORITES,
  },
  {
    name: 'Margin',
    id: CATEGORY_IDS.MARGIN,
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

interface ICategory {
  name: string;
  id: string;
}

const PartCurrencies = () => {
  const [search, setSearch] = useState<string>('');
  const [sorter, setSorter] = useState<ISorter>({ sortBy: '', order: '' });
  const [category, setCategory] = useState<string>('');
  const [isShowVolume, setIsShowVolume] = useState<boolean>(true);
  const [favoriteTokens, setFavoriteTokens] = useState<any>([]);
  const [dataShow, setDataShow] = useState<ICurrencyPair[]>([]);

  const {
    trading: { currencyPairs },
  } = useSelector((state: RootState) => state.metadata);

  const getDataShow = () => {
    let dataFilter = currencyPairs;

    if (category) {
      if (category === CATEGORY_IDS.FAVORITES) {
        dataFilter = dataFilter.filter((item) => item.quote === category);
      } else if (category === CATEGORY_IDS.MARGIN) {
        dataFilter = dataFilter.filter((item) => item.isMarginTrade);
      } else {
        dataFilter = dataFilter.filter((item) => item.quote === category);
      }
    }

    if (search) {
      dataFilter = dataFilter.filter(
        (item) =>
          item.quote.toLowerCase().includes(search.toLowerCase()) ||
          item.base.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setDataShow(dataFilter);
  };

  useEffect(() => {
    getDataShow();
  }, [category, currencyPairs, search]);

  const onSort = (sorter: ISorter) => setSorter(sorter);

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
            <AppTableSorting
              sortBy="pair"
              activeSort={sorter.sortBy}
              title="Pair"
              onSort={onSort}
            />
          </Box>
          <Flex textAlign="right" justifyContent="flex-end">
            <AppTableSorting
              sortBy="price"
              activeSort={sorter.sortBy}
              title="Price"
              onSort={onSort}
            />
          </Flex>
          <Flex textAlign="right" alignItems="center" justifyContent="flex-end">
            <AppTableSorting
              sortBy={isShowVolume ? 'volume' : 'change'}
              activeSort={sorter.sortBy}
              title={isShowVolume ? 'Volume' : 'Change'}
              onSort={onSort}
            />
            <Box
              className="icon-change"
              onClick={() => setIsShowVolume(!isShowVolume)}
            >
              <ChangeIcon />
            </Box>
          </Flex>
        </Box>

        <Box className="table-currencies__list">
          {!!dataShow.length &&
            dataShow?.map((item: ICurrencyPair, index: number) => {
              return (
                <Box className="table-currencies__content" key={index}>
                  <Flex textAlign="left" alignItems="center">
                    <Box>
                      <StarIcon />
                    </Box>

                    <Flex mx={1.5}>
                      <Box className="name-token">{item.base}</Box>/
                      <Box>{item.quote}</Box>
                    </Flex>

                    <Box className="scope">3x</Box>
                  </Flex>

                  <Box textAlign="right">--</Box>

                  {isShowVolume ? (
                    <Box textAlign="right">--</Box>
                  ) : (
                    <Box textAlign="right" className="change up">
                      +--%
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
