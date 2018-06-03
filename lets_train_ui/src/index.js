import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { Provider } from 'react-redux'; 
import { createStore } from 'redux';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Routes from './router';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
	    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
