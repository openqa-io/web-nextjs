import { applyMiddleware, compose, createStore, Store } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'

import { isServer } from '../helpers/dom'
import rootReducer from '../reducers/root.reducers'
import rootSaga from '../sagas/root.sagas'

type TStore = Store & {
  sagaTask?: Task
  runSagaTask?: () => void
}

export default (initialState = { "foo": { foo: "nice" } }) => {
  // Environment
  // const hasMaps =
  //   !isServer() &&
  //   typeof window.google !== 'undefined' &&
  //   typeof window.google.maps !== 'undefined'
  const isDev = process.env.NODE_ENV === 'development'

  // Middleware
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  // Redux devtools
  let composeEnhancers = compose

  if (
    !isServer() &&
    isDev &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

  // Redux store
  // const offlineStorage = createOfflineStorage()
  const store: TStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga, store.dispatch)
  }
  store.runSagaTask()


  return store
}
