import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import saga from './saga';
import createSagaMiddleware from 'redux-saga';
import { reducer as globalReducer } from './slice';

export const storeCreator = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga: sagaMiddleware.run,
    }),
  ];
  const [thunk, immutableStateInvariant] = getDefaultMiddleware();

  const store:any = configureStore({
    reducer: createReducer(),
    middleware: [thunk, immutableStateInvariant, ...middlewares].filter(i => !!i),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {
    // 注入saga
    initSaga: { task: store.runSaga(saga) },
  };
  if ((module as any).hot) {
    (module as any).hot.accept('./slice', () => {
      forceReducerReload(store);
    });
  }
  return store
};


const createReducer = (injectedReducers={}) => {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
};



