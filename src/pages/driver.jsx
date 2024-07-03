import { Helmet } from 'react-helmet-async';

import { DriverView } from 'src/sections/drivers/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Driver | GateGuard </title>
      </Helmet>

      <DriverView />
    </>
  );
}
