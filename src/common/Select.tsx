import React from 'react';
interface ISelect {
  label: string;
  type?: string;
  name: string;
  extraClasses?: string;
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Select(props: ISelect): JSX.Element {
  const { label, type, name, value, handleChange } = props;
  return (
    <div className="flex flex-col justify-center justify-items-center relative my-3">
      <select
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        className="peer block min-h-[auto] w-full border-b-2 border-blue
        pt-1 leading-[2] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary
        motion-reduce:transition-none">
        <option defaultValue="" hidden />

        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
      </select>
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
                ? `scale-[0.8] translate-y-[-1.2rem]`
                : 'peer-data:-translate-y-[1.15rem] peer-data:peer-data:scale-[0.8]'
            }`}>
        {label}
      </label>
    </div>
  );
}

export default Select;
