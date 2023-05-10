import { Input, Button } from '@material-tailwind/react';
import React, { useState } from 'react';

import List from '../../../common/List';
import Select from '../../../common/Select';
import { useFindQuestionQuery } from '../../../redux/services/question';
import { getError } from '../../../utils/formik';

import ItemQuestion from './Item';
interface sorterArray {
  value: string;
  text: string;
}
const sortOrderArray: sorterArray[] = [
  {
    value: 'createdAt',
    text: 'Created at',
  },
  {
    value: 'question',
    text: 'Question',
  },
];
const sortByArray: sorterArray[] = [
  {
    value: 'asc',
    text: 'Ascending',
  },
  {
    value: 'desc',
    text: 'Descending',
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
  return (
    <>
      {subjectId && (
        <>
          <div className={'mt-6 flex flex-row gap-5 w-10'}>
            <Select
              variant="outlined"
              label="Sort by"
              value={sorter.sortBy}
              disabled={error || isLoading}
              labelProps={{
                className:
                  '!text-orange before:!border-blue before:!mt-[6px] after:!border-blue  after:!mt-[6px]',
              }}
              className="pr-20 !border-blue !border-t-transparent "
              disabled={error || isLoading}
              onChange={(sortBy) => setSorter((prev) => ({ ...prev, sortBy }))}
              arrayOption={sortOrderArray}
            />
            <Select
              variant="outlined"
              label="Order"
              labelProps={{
                className:
                  '!text-orange before:!border-blue before:!mt-[6px] after:!border-blue  after:!mt-[6px]',
              }}
              disabled={error || isLoading}
              value={sorter.order}
              onChange={(order) => setSorter((prev) => ({ ...prev, order }))}
              className="pr-20 !border-blue !border-t-transparent"
              arrayOption={sortByArray}
            />

            <Input
              type="text"
              label="Question"
              labelProps={{
                className:
                  '!text-orange before:!border-blue before:!mt-[6px] after:!border-blue after:!mt-[6px]',
              }}
              value={question}
              onChange={onChange}
              className={
                question
                  ? 'pr-20 !border-blue !border-t-transparent'
                  : '!border-blue focus:!border-t-transparent'
              }
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
