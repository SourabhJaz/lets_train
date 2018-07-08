import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { Provider } from 'react-redux'; 
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import Routes from './router';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
	    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
