import {createStore} from 'redux';
import reducer from './reducer';

/* Creates a Redux store with a reducer consisting of three actions
* */
export default function makeStore() {
    return createStore(reducer);
}