import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { isLoggedIn } from 'src/utils/auth';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const DriverPage = lazy(() => import('src/pages/driver'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const loggedIn = isLoggedIn();
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: loggedIn ? <IndexPage /> : <Navigate to="/login" replace />, index: true },
        { path: 'user', element: loggedIn ? <UserPage /> : <Navigate to="/login" replace /> },
        { path: 'drivers', element: loggedIn ? <DriverPage /> : <Navigate to="/login" replace /> },
        { path: 'orders', element: loggedIn ? <OrderPage /> : <Navigate to="/login" replace /> },
      ],
    },
    {
      path: 'login',
      element: loggedIn ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
