import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown, Ripple, initTE } from 'tw-elements';

import Button from '../common/Button';
import { useLogoutMutation } from '../redux/services/user';
import { logout, IUser, selectAuth } from '../redux/slices/userSlice';

interface IUserProfile {
  user: IUser;
  route: string;
}
function UserProfile({ user, route, ...props }: IUserProfile): JSX.Element {
  const [logoutApi] = useLogoutMutation();
  const userData = useSelector(selectAuth);
  useEffect(() => {
    initTE({ Dropdown, Ripple });
  }, [userData]);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    dispatch(logout());
    logoutApi({ userId: userData?.userId });
  };
  return (
    <div className="relative" {...props} data-te-dropdown-ref>
      <button
        className="flex
        w-32
        items-center
        justify-center
        whitespace-nowrap
        rounded-lg
        shadow-xl
        text-dark
        font-black
        px-6 pb-2
        border-blue
        border-2
        hover:border-b-2
        hover:border-blue
        hover:text-white
        hover:bg-blue
        cursor-pointer select-none
        pt-2.5 text-xs
        font-medium uppercase
        leading-normal text-white
        transition duration-300
        ease-in-out hover:bg-blue-700
        focus:bg-blue
        focus:outline-none
        focus:text-white
        focus:ring-0
        active:bg-blue
        active:text-white
        active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
        motion-reduce:transition-none
        dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        type="button"
        id="dropdownMenuButton1"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex items-center">
          <UserIcon className="w-4 mr-1" />
          {user.name}
        </div>
        <span className="ml-2 w-2">
          <ChevronDownIcon className="w-4 mr-1" />
        </span>
      </button>
      <ul
        className="absolute z-[1000] shadow-xl float-right left-6 m-0 hidden w-32 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton1"
        data-te-dropdown-menu-ref
      >
        <li>
          <Link
            className="block w-32
            text-center
            transition ease-in-out
            duration-300
            whitespace-nowrap
            bg-transparent px-3 py-3
            text-sm font-normal text-neutral-700  hover:bg-blue hover:text-white"
            to={`account/${user.userId}`}
            data-te-dropdown-item-ref
          >
            Account
          </Link>
          <Link
            className="block w-32
            text-center
            transition ease-in-out
            duration-200
            whitespace-nowrap
            bg-transparent px-3 py-3
            text-sm font-normal text-neutral-700
            hover:bg-blue hover:text-white"
            to={`/`}
            onClick={() => handleLogout()}
            data-te-dropdown-item-ref
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
