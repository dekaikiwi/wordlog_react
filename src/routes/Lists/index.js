import { injectReducer } from '../../store/reducers'
import Routes from './routes';

export default (store) => ({
  path: 'lists',
  childRoutes: [
    Routes(store)
  ],
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Container = require('./containers/ListsContainer').default
      const actions = require('./modules/lists').actions
      const reducer = require('./modules/lists').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'lists', reducer })

      store.dispatch(actions.fetchLists())

      /*  Return getComponent   */
      cb(null, Container)

    /* Webpack named bundle   */
  }, 'lists')
  }
})
