import React, { useState } from 'react';

import { useFindQuestionQuery } from '../../redux/services/question';
import { useFindSubjectQuery } from '../../redux/services/subject';
import { useFindQuery } from '../../redux/services/university';
import Loader from '../Loader';

import ListFilter from './ListFilter';

function Filter(): JSX.Element {
  const [universityId, setUniversityId] = useState<string>('');
  const [subjectId, setSubjectId] = useState<string>('');
  const { data, isLoading, error } = useFindQuery({
    refetchOnFocus: true,
  });
  const {
    data: subject,
    isLoading: isLoadingSubject,
    error: errorSubject,
  } = useFindSubjectQuery(universityId, {
    refetchOnFocus: true,
  });
  const {
    data: question,
    isLoading: isLoadingQuestion,
    error: errorQuestion,
  } = useFindQuestionQuery(subjectId, {
    refetchOnFocus: true,
  });
  const handleClickUniversity = (el) => {
    setUniversityId(el.universityId);
  };
  const handleClickSubject = (el) => {
    setSubjectId(el.subjectId);
  };

  if (isLoading || isLoadingSubject) return <Loader />;

  return (
    <section className="flex flex-col">
      <ListFilter
        onClick={handleClickUniversity}
        isLoading={isLoading}
        data={data}
        error={error}
      />
      {universityId && (
        <ListFilter
          onClick={handleClickSubject}
          isLoading={isLoadingSubject}
          data={subject}
          error={errorSubject}
          id={universityId}
        />
      )}
      {subjectId && (
        <ListFilter
          onClick={handleClickSubject}
          isLoading={isLoadingQuestion}
          data={question}
          error={errorQuestion}
          id={universityId}
        />
      )}
      {/*{universityId && (*/}
      {/*  <div className="flex flex-row flex-wrap gap-3">*/}
      {/*    {subject &&*/}
      {/*      subject.items.map((el) => (*/}
      {/*        <Button*/}
      {/*          style={'px-7 py-2 border-blue border-2 items-center'}*/}
      {/*          key={el.subjectId}*/}
      {/*        >*/}
      {/*          {el.title}*/}
      {/*        </Button>*/}
      {/*      ))}*/}
      {/*  </div>*/}
      {/*)}*/}
    </section>
  );
}

export default Filter;
