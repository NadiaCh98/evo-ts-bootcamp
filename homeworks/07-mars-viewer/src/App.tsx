import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Loading } from './app/components/Loading/Loading';
import { Navbar } from './app/components/Navbar/Navbar';
import { FAVORITES_ROUTE, SOLS_ROUTE } from './app/route';

const Sols = React.lazy(() => import('./features/pages/sols/Sols'));
const Favorites = React.lazy(
  () => import('./features/pages/favorites/Favorites')
);

function App(): React.ReactElement {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={SOLS_ROUTE} component={Sols} />
            <Route path={FAVORITES_ROUTE} component={Favorites} />
            <Redirect from="/" to={SOLS_ROUTE} />
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
