import makeStore from './src/store';
import startServer from './src/server';

/* Give startServer the REDUX store so the socket.io can
 * subscribe and emit state changes
* */
export const store = makeStore();
startServer(store);

