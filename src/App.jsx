import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <input type="text" placeholder="some text" />
      </Provider>
    </>
  );
};

export default App;
