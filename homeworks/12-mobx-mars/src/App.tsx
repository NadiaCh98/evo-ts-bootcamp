import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Loading } from './app/components/Loading/Loading';
import { Navbar } from './app/components/Navbar/Navbar';
import { SOLS_ROUTE, FAVORITES_ROUTE } from './app/routes';
import Favorites from './features/pages/favorites/Favorites';
import Sols from './features/pages/sols/Sols';

function App() {
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
