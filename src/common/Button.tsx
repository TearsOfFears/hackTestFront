import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonAppearance = {
  default: 'bg-transparent border-0',
  primary: 'rounded bg-primary-blue border-0',
};

type ButtonAppearance = keyof typeof buttonAppearance;

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  style: string;
}
function Button({
  children,
  style,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <button
      type="button"
      className={twMerge(
        'shadow-md flex transition ease-in duration-300 ' +
          'hover:bg-blue hover:text-white ' +
          'justify-center justify-items-center rounded-full py-3',
        style,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
