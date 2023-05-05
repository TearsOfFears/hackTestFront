import React from 'react';

import Button from '../../common/Button';
import Loader from '../Loader';
interface Props {
  error: string;
  isLoading: boolean;
  onClick: () => void;
}
function ListFilter({ onClick, data, isLoading, error, ...props }: Props) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    // <Transition nodeRef={nodeRef} in={props} timeout={duration}>
    //   {(state) => (
    <div
      className="flex flex-row gap-3 mb-5 border-b-2 pb-3 border-orange flex-wrap transition ease-in duration-300"
      // ref={nodeRef}
    >
      {data.items.length > 0 ? (
        data.items.map((el) => (
          <Button
            style={
              'px-7 py-2 border-blue border-2 items-center font-bold text-lg'
            }
            key={el.title + el.createdAt}
            onClick={() => onClick(el)}
            {...props}
          >
            {el.title}
          </Button>
        ))
      ) : (
        <div className="text-center w-full text-blue font-bold text-3xl ">
          No items
        </div>
      )}
    </div>
    //   )}
    // </Transition>
  );
}

export default ListFilter;
