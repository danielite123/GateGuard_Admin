import { Helmet } from 'react-helmet-async';

import { OrderView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Order | Num Ride </title>
      </Helmet>

      <OrderView />
    </>
  );
}
