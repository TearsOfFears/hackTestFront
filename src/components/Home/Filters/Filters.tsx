import React, { useState } from 'react';

import List from '../../../common/List';
import { useFindQuestionQuery } from '../../../redux/services/question';
import { useFindSubjectQuery } from '../../../redux/services/subject';
import { useFindQuery } from '../../../redux/services/university';
import Loader from '../../Loader';

import ItemQuestion from './../Questions/Item';
import ItemFilter from './ItemFilter';

function Filters({ setSubjectId }): JSX.Element {
  const [universityId, setUniversityId] = useState<string>('');
  // const [subjectId, setSubjectId] = useState<string>('');
  const { data, isLoading, error } = useFindQuery({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const {
    data: subject,
    isLoading: isLoadingSubject,
    error: errorSubject,
  } = useFindSubjectQuery(universityId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleClickUniversity = (id) => {
    setUniversityId(id);
    setSubjectId('');
  };
  const handleClickSubject = (id) => setSubjectId(id);

  if (isLoading || isLoadingSubject) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col">
      <List
        isLoading={isLoading}
        data={data}
        error={error}
        style="flex flex-row gap-4 border-b-2 pb-4 border-orange flex-wrap"
      >
        {data.items.map((item) => (
          <ItemFilter
            title={item.title}
            id={item.universityId}
            handleOnClick={handleClickUniversity}
          />
        ))}
      </List>
      {universityId && (
        <List
          isLoading={isLoadingSubject}
          data={subject}
          error={errorSubject}
          id={universityId}
          style="flex flex-row gap-4 border-b-2 py-4 border-orange flex-wrap"
        >
          {subject.items.map((item) => (
            <ItemFilter
              title={item.title}
              id={item.subjectId}
              handleOnClick={handleClickSubject}
            />
          ))}
        </List>
      )}
    </section>
  );
}

export default Filters;
