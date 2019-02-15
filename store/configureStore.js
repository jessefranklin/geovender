import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux'
import reducers from '../redux/reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    
    const middleware = composeEnhancers(applyMiddleware(thunkMiddleware))
    const store = createStore(reducers, middleware)
    
    store.subscribe(() => {
        console.log(store.getState());
    });

    return store;

};
