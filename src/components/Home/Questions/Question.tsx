import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

import Input from '../../../common/Input';
import List from '../../../common/List';
import Select from '../../../common/Select';
import { useFindQuestionQuery } from '../../../redux/services/question';
import { getError } from '../../../utils/formik';

import ItemQuestion from './Item';
interface sorterArray {
  value: string;
  name: string;
}
const sortOrderArray: sorterArray[] = [
  {
    value: 'createdAt',
    name: 'Created at',
  },
  {
    value: 'question',
    name: 'Question',
  },
];
const sortByArray: sorterArray[] = [
  {
    value: 'asc',
    name: 'Ascending',
  },
  {
    value: 'desc',
    name: 'Descending',
  },
];

interface ISorter {
  sortBy: string;
  order: string;
}

function Question({ subjectId }) {
  const [sorter, setSorter] = useState<ISorter>({
    sortBy: 'createdAt',
    order: 'asc',
  });
  const [question, setQuestion] = React.useState('');
  const onChange = ({ target }) => setQuestion(target.value);

  const [page, setPage] = useState({ pageIndex: 0, pageSize: 20 });

  const { data, isLoading, error } = useFindQuestionQuery(
    { ...sorter, ...page, question, subjectId },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );
  const handleSorter = ({ target }: SelectChangeEvent<typeof sorter>) => {
    const { value, name } = target;
    setSorter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {subjectId && (
        <>
          <div className={'mt-6 flex flex-row gap-6 w-full'}>
            <Select
              variant="outlined"
              label="Sort by"
              value={sorter.sortBy}
              name="sortBy"
              size="small"
              disabled={error || isLoading}
              onChange={handleSorter}
              arrayOption={sortOrderArray}
              sx={{ padding: '0px', borderRadius: '10px' }}
            />
            <Select
              variant="outlined"
              label="Order by"
              value={sorter.order}
              name="order"
              size="small"
              disabled={error || isLoading}
              onChange={handleSorter}
              arrayOption={sortByArray}
              sx={{ padding: '0px' }}
            />
            <Input
              variant="outlined"
              label="Order by"
              value={sorter.order}
              name="order"
              disabled={error || isLoading}
              onChange={handleSorter}
              arrayOption={sortByArray}
              sx={{ padding: '0px' }}
            />
          </div>
          <List
            isLoading={isLoading}
            data={data}
            error={error}
            id={subjectId}
            style={
              data?.items.length === 0
                ? 'mt-2 gap-6 py-4 flex'
                : 'mt-2 gap-6 py-4 grid grid-cols-2'
            }
          >
            {data?.items.map((item) => (
              <ItemQuestion item={item} />
            ))}
          </List>
        </>
      )}
    </>
  );
}

export default Question;
