import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import Loader from '../components/Loader';

interface Props {
  data: Array;
  error: string;
  isLoading: boolean;
  id?: string;
}
function List({
  data,
  id,
  isLoading,
  error,
  children,
  style,
  ...props
}: Props) {
  const nodeRef = useRef(null);
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <div
        className="flex flex-row gap-4 mb-4 border-b-2 pb-3 border-orange flex-wrap mt-5"
        ref={nodeRef}
      >
        {error && (
          <div className="text-lg text-center w-full text-orange">
            Some error : {error.data.message}
          </div>
        )}
      </div>
    );
  }
  return (
    <SwitchTransition>
      <CSSTransition
        unmountOnExit
        appear
        nodeRef={nodeRef}
        key={id ? id : null}
        timeout={20}
        classNames={
          id && {
            enter: 'ease-in opacity-0',
            enterDone: 'ease-in opacity-100 duration-300',
            exitActive: 'opacity-100 duration-300',
            exit: 'opacity-0 duration-1000',
          }
        }
      >
        <div className={style} ref={nodeRef}>
          {data.items.length > 0 ? (
            <>{children}</>
          ) : (
            <div className="text-center w-full text-blue font-bold text-3xl my-4 ">
              No items
            </div>
          )}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default List;
