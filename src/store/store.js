import { createStore, applyMiddleware, compose } from 'redux'; // Import compose
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../store/reducers';
import rootSaga from '../store/saga';

const sagaMiddleware = createSagaMiddleware();

//! Add Extensions Redux DevTools Middleware 
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;


const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga); 

export default store;