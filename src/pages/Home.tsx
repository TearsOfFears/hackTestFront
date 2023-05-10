import { useState } from 'react';

import Filters from '../components/Home/Filters/Filters';
import Question from '../components/Home/Questions/Question';
import { useFindQuestionQuery } from '../redux/services/question';

function Home(): JSX.Element {
  const [subjectId, setSubjectId] = useState<string>('');

  return (
    <div className="container mx-auto flex flex-col">
      <Filters setSubjectId={setSubjectId} />
      <Question subjectId={subjectId} />
    </div>
  );
}

export default Home;
