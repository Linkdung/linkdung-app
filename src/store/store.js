import { createStore, applyMiddleware, compose } from 'redux'; // Import compose
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/linkReducer';
import rootSaga from '../sagas/linkSaga';

const sagaMiddleware = createSagaMiddleware();

//! Add Extensions Redux DevTools Middleware 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga); 

export default store;