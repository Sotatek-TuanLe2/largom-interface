import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowDownIcon } from 'src/assets/icons';
import { SORTING } from 'src/utils/constants';
import 'src/styles/components/AppTableSorting.scss';

export interface ISorter {
  sortBy: string;
  order: string;
}

interface AppTableSortingProps {
  sortBy: string;
  activeSort: string;
  title?: string;
  className?: string;
  sortOrder?: '' | 'asc' | 'desc';
  onSort?: (sorter: ISorter) => void;
}

const AppTableSorting = (props: AppTableSortingProps) => {
  const { sortBy, activeSort, title, className = '', sortOrder } = props;
  const [sorter, setSorter] = useState<ISorter>({
    sortBy,
    order: SORTING.NONE,
  });

  const setOrder = (order: string) => {
    setSorter((prevState) => ({ ...prevState, order }));
  };

  useEffect(() => {
    if (sortOrder) {
      setOrder(sortOrder);
    }
  }, [sortOrder]);

  useEffect(() => {
    if (activeSort !== sortBy) {
      setOrder(SORTING.NONE);
    }
  }, [activeSort]);

  const _renderTitle = () => {
    if (!title) {
      return null;
    }
    return (
      <Box className={`table-sorting__title ${!!sorter.order ? 'active' : ''}`}>
        {title}
      </Box>
    );
  };

  const _renderSorters = () => {
    return (
      <Flex direction="column" className="table-sorting__sorters">
        <Box
          className={`table-sorting__top ${
            sorter.order === SORTING.ASC ? 'active' : ''
          }`}
        >
          <ArrowDownIcon />
        </Box>
        <Box
          className={`table-sorting__bottom ${
            sorter.order === SORTING.DESC ? 'active' : ''
          }`}
        >
          <ArrowDownIcon />
        </Box>
      </Flex>
    );
  };

  const onSort = () => {
    setSorter((prevState) => {
      const newState = { ...prevState };
      switch (newState.order) {
        case SORTING.ASC:
          newState.order = SORTING.DESC;
          break;
        case SORTING.DESC:
          newState.order = SORTING.NONE;
          break;
        default:
          newState.order = SORTING.ASC;
          break;
      }
      props.onSort && props.onSort(newState);
      return newState;
    });
  };

  return (
    <Flex
      alignItems="center"
      className={`table-sorting ${className}`}
      onClick={onSort}
    >
      {_renderTitle()}
      {_renderSorters()}
    </Flex>
  );
};

export default AppTableSorting;
