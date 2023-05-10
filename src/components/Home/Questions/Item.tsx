import { Button } from '@material-tailwind/react';
import React from 'react';

import { IItemQuestion } from '../../../types/question';

function Item({ item }) {
  return (
    <div
      className="px-5 py-5 border-blue border-2 items-center font-bold
    text-sm rounded-lg shadow-xl flex flex-col justify-between items-start"
      key={item.questionId}
    >
      <p className="text-orange text-lg pb-2">{item.question}</p>
      <ul>
        {item.variants.map((variant: string, inx: number) => (
          <li className="text-bl py-1" key={inx}>{`${inx + 1}. ${variant}`}</li>
        ))}
      </ul>
      <Button
        ripple={true}
        variant="filled"
        className={
          'text-blue b-2 border-blue rounded-2xl ' +
          'transition ease-in-out duration-300'
        }
      >
        View answers:
      </Button>
    </div>
  );
}

export default Item;
