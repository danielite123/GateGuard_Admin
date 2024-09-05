import { Helmet } from 'react-helmet-async';

import { AdminRouteManager } from 'src/sections/routes';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> Route Manager | Num Ride</title>
      </Helmet>

      <AdminRouteManager />
    </>
  );
}
