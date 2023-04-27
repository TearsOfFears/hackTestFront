import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../routes.config';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

type TMainLayout = {
  children: string | JSX.Element | JSX.Element[];
};
export interface IRoutes {
  label: string;
  route: string;
}
const routes: IRoutes[] = [
  { label: Routes.LOGIN.label, route: Routes.LOGIN.route },
  { label: Routes.REGISTER.label, route: Routes.REGISTER.route }
];

function MainLayout({ children }: TMainLayout): JSX.Element {
  const { pathname } = useLocation();
  const nodeRef = useRef(null);
  return (
    <section className="container mx-auto mt-8">
      <nav className="bg-white shadow-2xl mb-11 rounded-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="hidden md:flex items-center">
              <Link to={Routes.HOME.route}> Hack your test</Link>
            </div>
            <div className="flex space-x-7 mb-2 mt-2">
              <div className="hidden md:flex items-center space-x-2">
                {routes.map(({ label, route }, inx) => (
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
                        pathname === route
                          ? 'border-b-2 border-blue'
                          : 'border-b-2 border-transparent'
                      }`}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CSSTransition
        nodeRef={nodeRef}
        in={pathname}
        timeout={200}
        classNames={{
          appear: 'my-appear',
          appearActive: 'my-active-appear',
          appearDone: 'my-done-appear',
          enter: 'my-enter',
          enterActive: 'my-active-enter',
          enterDone: 'my-done-enter',
          exit: 'my-exit',
          exitActive: 'my-active-exit',
          exitDone: 'my-done-exit'
        }}>
        <div ref={nodeRef}> {children}</div>
      </CSSTransition>
    </section>
  );
}

export default MainLayout;
