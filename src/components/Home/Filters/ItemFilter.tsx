import React from 'react';

import Button from '../../../common/Button';
interface IItemFilter {
  title: string;
  id: string;
  handleOnClick?: (id: string) => void;
  style?: string;
}
function ItemFilter({ title, id, handleOnClick }: IItemFilter) {
  return (
    <Button
      style={'px-7 my-2  border-blue border-2 items-center font-bold text-lg'}
      key={id}
      onClick={() => handleOnClick(id)}
    >
      {title}
    </Button>
  );
}

export default ItemFilter;
