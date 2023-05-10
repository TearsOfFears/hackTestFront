import {
  UserIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronDownIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import React, { useEffect, useState, createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, Ripple, initTE } from 'tw-elements';

// import Button from '../common/Button';
// import Modal from '../common/Modal';
import { useLogoutMutation } from '../redux/services/user';
import { logout, IUser, selectAuth } from '../redux/slices/userSlice';

interface IUserProfile {
  user: IUser;
  route: string;
}

function UserProfile({ user, route, ...props }: IUserProfile): JSX.Element {
  const [logoutApi, { isSuccess, isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const userData = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    handleOpen();
    if (open) {
      dispatch(logout());
      logoutApi({ userId: userData?.userId });
    }
  };
  const profileMenuItems = [
    {
      label: 'Account',
      icon: UserCircleIcon,
      func: () => navigate(`/account/${userData.userId}`),
    },
    {
      label: 'Edit Profile',
      icon: Cog6ToothIcon,
      func: () => {},
    },
    {
      label: 'Message Bot',
      icon: ChatBubbleBottomCenterIcon,
      func: () => {},
    },
    {
      label: 'Sign Out',
      icon: PowerIcon,
      func: handleLogout,
    },
  ];
  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        allowHover={true}
      >
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full
            py-0 pr-0 pl-0 lg:ml-auto bg-gray-600
            hover:text-white hover:bg-blue transition duration-300 ease-in"
          >
            <div
              className="border border-blue border-2 p-1
            rounded-full px-3 py-2 items-center justify-center flex"
            >
              <UserCircleIcon className="w-5 mr-2" />
              <p className="mr-2">{user.name}</p>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </Button>
        </MenuHandler>
        <MenuList className="p-1 rounded-2xl min-w-[150px] w-4">
          {profileMenuItems.map(({ label, icon, func }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={func}
                className={`flex items-center justify-end gap-2 rounded-2xl transition ease-in-out duration-300 ${
                  isLastItem
                    ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                    : ''
                }`}
              >
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? 'red' : 'inherit'}
                >
                  {label}
                </Typography>
                {createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                  strokeWidth: 2,
                })}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Dialog open={open} handler={handleOpen} className={'rounded-3xl'}>
        <DialogHeader className="text-3xl flex justify-center">
          Are you sure about logout ?
        </DialogHeader>
        <DialogBody className="text-3xl flex gap-4 justify-center">
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 border-2 text-orange"
          >
            Cancel
          </Button>
          <Button
            variant="text"
            className="border-2 text-blue"
            color="blue"
            onClick={handleLogout}
          >
            Confirm
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default UserProfile;
