import { Button, ButtonProps } from '@mui/material';
import React, { memo } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ButtonProps;
function ButtonCommon({
  children,
  style,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <Button
      type="button"
      // className={twMerge(
      //   'shadow-md flex transition ease-in duration-300 ' +
      //     'hover:bg-blue hover:text-white ' +
      //     'justify-center justify-items-center rounded-full py-3',
      //   style,
      // )}
      {...props}
    >
      {children}
    </Button>
  );
}

export default memo(ButtonCommon);
