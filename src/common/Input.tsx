import React from 'react';
interface IInput {
  label: string;
  type: string;
  name: string;
  error?: string;
  extraClasses?: string;
  value: string;
  disabled: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ error, value, label, ...props }: IInput): JSX.Element {
  return (
    <div className="flex flex-col justify-center justify-items-center relative my-3">
      <input
        className="peer block min-h-[auto] w-full border-b-2 border-blue
        pt-1 leading-[2] outline-none transition-all
        duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary
        motion-reduce:transition-none"
        {...props}
      />
      <label
        htmlFor="exampleFormControlInput2"
        className={`pointer-events-none
            absolute
            left-0 top-0
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
                ? `scale-[0.8] translate-y-[-1.4rem]`
                : 'peer-data:-translate-y-[1.15rem] peer-data:peer-data:scale-[0.8]'
            }`}
      >
        {label}
      </label>
      {error && <span className="text-xs text-orange">{error}</span>}
    </div>
  );
}

export default Input;
