import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    /* Subscribe a listener to the store that reads the current state,
     * turns it into a normal JavaScript object and emits it as a
     * state event to the socket.io server.
    * */
    store.subscribe( () => {
       io.emit('state', store.getState().toJS())
    });

    /* In addition to sending the state whenever it changes, the should
     * be able to receive the current state whenever they connect.
     * We can listen for connection events on the socket.io server
     * and emit the state right away.
    * */
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
    });
}

