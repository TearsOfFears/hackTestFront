import { Select, Option } from '@material-tailwind/react';
import React, { memo } from 'react';

import { Item } from '../redux/services/university';

interface ItemOption {
  value: string;
  text: string;
}
interface ISelect {
  children: React.ReactNode;
  label: string;
  name: string;
  extraClasses?: string;
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  arrayOption: ItemOption[];
  isLoading: boolean;
}
function SelectCommon({ error, arrayOption, ...props }: ISelect): JSX.Element {
  return (
    <div className="flex flex-col justify-center justify-items-center relative">
      <Select
        labelProps={{
          className:
            '!text-orange before:!border-blue before:!mt-[6px] after:!border-blue after:!mt-[6px]',
        }}
        className="pr-20 !border-blue !border-t-transparent !text-xl"
        {...props}
      >
        {arrayOption.map(({ value, text }) => (
          <Option
            value={value}
            className="my-2 hover:!text-blue focus:!bg-blue focus:!text-white"
          >
            {text}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default memo(SelectCommon);
