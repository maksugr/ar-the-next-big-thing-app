import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from 'redux';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { IRootState } from './interfaces/root-state.interface';

declare global {
    interface Window {
        store?: Store<IRootState>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
