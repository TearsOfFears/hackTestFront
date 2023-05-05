import { Transition } from '@headlessui/react';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import UserProfile from '../components/UserProfile';
import { selectAuth } from '../redux/slices/userSlice';
import { Routes } from '../routes.config';

type TMainLayout = {
  children?: string | JSX.Element | JSX.Element[];
};

export interface IRoutes {
  label: string;
  route: string;
}
const routes: IRoutes[] = [
  { label: Routes.LOGIN.label, route: Routes.LOGIN.route },
];

function MainLayout({ children }: TMainLayout): JSX.Element {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const user = useSelector(selectAuth);
  // const { nodeRef } =
  //   routes.find((route) => route.path === location.pathname) ?? {};
  // console.log('nodeRef', nodeRef);
  return (
    <section className="container mx-auto mt-8">
      <nav className="bg-white shadow-2xl mb-11 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="hidden md:flex items-center">
              <Link to={Routes.HOME.route}>Hack your test</Link>
            </div>
            <div className="flex space-x-7 mb-2 mt-2">
              <div className="hidden md:flex items-center space-x-2">
                {routes.map(({ label, route }, inx) => {
                  // if (user) {
                  //   return (
                  //     <Link
                  //       to={`/account/${user.userId}`}
                  //       key={inx}
                  //       className={`p-2
                  //     transition ease-in-out
                  //     duration-300
                  //     hover:border-b-2
                  //     hover:border-blue
                  //     cursor-pointer select-none
                  //     text-black font-bold ${
                  //       location.pathname === route
                  //         ? 'border-b-2 border-blue'
                  //         : 'border-b-2 border-transparent'
                  //     }`}
                  //     >
                  //       {user.name}
                  //     </Link>
                  //   );
                  // }\
                  if (user) {
                    return <UserProfile user={user} route={route} key={inx} />;
                  }
                  return (
                    <Link
                      to={route}
                      key={inx}
                      className={`p-2           
                      transition ease-in-out
                      duration-300
                      hover:border-b-2
                      hover:border-blue
                      cursor-pointer select-none
                      text-black font-bold ${
                        location.pathname === route
                          ? 'border-b-2 border-blue'
                          : 'border-b-2 border-transparent'
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          timeout={100}
          classNames={{
            enter: 'ease-in opacity-0',
            enterDone: 'ease-in opacity-100 duration-300',
            exitActive: 'opacity-100 duration-300',
            exit: 'opacity-0 duration-1000',
          }}
          unmountOnExit
        >
          {() => <div>{currentOutlet}</div>}
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
}

export default memo(MainLayout);
