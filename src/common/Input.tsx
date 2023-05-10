import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Input } from '@material-tailwind/react';
import React, { memo } from 'react';
interface IInput {
  label: string;
  type: string;
  name: string;
  error?: string;
  extraClasses?: string;
  value: string;
  disabled: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: () => void;
  isPassword?: boolean;
  isShow?: boolean;
}
function InputCommon({
  error,
  value,
  showPassword,
  isPassword = false,
  isShow,
  type,
  ...props
}: IInput): JSX.Element {
  return (
    <div className="flex flex-col justify-center justify-items-center relative my-2">
      <Input
        type={isShow ? 'password' : 'text'}
        icon={
          isPassword &&
          (isShow ? (
            <EyeIcon
              className="position absolute right-2 top-2px text-blue w-5 cursor-pointer select-none"
              onClick={showPassword}
            />
          ) : (
            <EyeSlashIcon
              className="position absolute right-2 text-blue top-2px w-5 cursor-pointer select-none"
              onClick={showPassword}
            />
          ))
        }
        labelProps={{
          className:
            '!text-blue before:!border-blue before:!mt-[6px] after:!border-blue after:!mt-[6px] ',
        }}
        className="pr-20 !border-blue !border-t-transparent !text-xl"
        {...props}
      />
      {error && <span className="text-xs text-orange">{error}</span>}
    </div>
  );
}

export default memo(InputCommon);
