import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { combinedReducer } from './reducer';

function store(preloadedState) {
  // Make exception for redux dev tools
  /* eslint-disable no-underscore-dangle */
  /* eslint-disable no-undef */
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  /* eslint-enable */
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(combinedReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default store;
