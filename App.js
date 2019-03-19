import React from 'react';
import Main from './components/MainComponent';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

// const store = ConfigureStore();

import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading title="persist" />}
          persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}