import React, { memo } from 'react';

import { Item } from '../redux/services/university';

interface ISelect {
  children: React.ReactNode;
  label: string;
  name: string;
  extraClasses?: string;
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
function Select({
  label,
  error,
  value,
  children,
  ...props
}: ISelect): JSX.Element {
  // items?.shift({ universityId: '' });
  return (
    <div className="flex flex-col justify-center justify-items-center relative my-3">
      <select
        className="peer block min-h-[auto] w-full border-b-2 border-blue
        pt-1 leading-[2] outline-none transition-all
        duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary
        motion-reduce:transition-none"
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-orange">{error}</span>}
      <label
        htmlFor="exampleFormControlInput2"
        className={`pointer-events-none
            absolute
            left-0 bottom-0
            mb-0 max-w-[90%]
            origin-[0_0] truncate pt-[0.37rem]
            leading-[2]
            text-neutral-500
            transition-all
            duration-200
            ease-out
            peer-focus:text-primary
            motion-reduce:transition-none
            dark:text-neutral-200
            dark:peer-focus:text-primary ${
              value
                ? `scale-[0.8] translate-y-[-1rem]`
                : 'peer-data:-translate-y-[1.15rem] peer-data:peer-data:scale-[0.8]'
            } ${error && 'bottom-3'}`}
      >
        {label}
      </label>
    </div>
  );
}

export default memo(Select);
