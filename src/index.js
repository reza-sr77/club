import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import { Provider } from "react-redux";
import { store } from './redux/store/store'
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);

serviceWorker.register();
