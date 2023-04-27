import React from 'react';
interface IButton {
  children: string | JSX.Element | JSX.Element[];
  handleClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void | null;
}
function Button(props: IButton): JSX.Element {
  const { children, handleClick } = props;
  return (
    <button
      className="shadow-md flex transition ease-in
                      duration-300 hover:bg-blue hover:text-white justify-center justify-items-center rounded-full py-3"
      onClick={(e) => handleClick(e)}>
      {children}
    </button>
  );
}

export default Button;
