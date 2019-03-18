import { Platform } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import { dishes } from './dishes';
import { comments } from './comments';
import { promotions } from './promotions';
import { leaders } from './leaders';

import rootSaga from './RootSagas';

// Use with Chrome extension
import { composeWithDevTools } from 'redux-devtools-extension';
// import devTools from 'remote-redux-devtools';




const sagaMiddleware = createSagaMiddleware();

export const ConfigureStore = () => {
    const enhancer = compose(
        composeWithDevTools(
            applyMiddleware(sagaMiddleware, thunk, logger)
        ),
        // devTools({
        //     name: Platform.OS,
        //     hostname: '192.168.0.229',
        //     port: 5678
        // })
    );

    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders
        }), enhancer);
    sagaMiddleware.run(rootSaga);

    return store;
}