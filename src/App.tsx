import React, { FunctionComponent } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import { configureStore } from './store';

import history from './utils/history';

import { GlobalStylesApp } from './App.styles';

import Main from './components/Main';
import Page404 from './components/404';

const App: FunctionComponent = () => {
    const store = configureStore();

    return (
        <Provider store={store}>
            <GlobalStylesApp />
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path={`/presentations/ar-the-next-big-thing`}
                        component={Main}
                    />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
