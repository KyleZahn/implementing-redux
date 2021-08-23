import Dedux from './dedux.js'
const { createStore } = Dedux

const countElement = document.getElementById('count');

const reducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREASE':
            return { count: state.count + action.payload.count }
        case 'DECREASE':
            return { count: state.count - action.payload.count }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
};

const store = createStore(reducer);

store.subscribe(() => {
    countElement.innerHTML = store.getState().count;
});

document.getElementById('up').addEventListener('click', function () {
    store.dispatch({
        type: 'INCREASE',
        payload: { count: 1 }
    });
});
document.getElementById('down').addEventListener('click', function () {
    store.dispatch({
        type: 'DECREASE',
        payload: { count: 1}
    });
});
document.getElementById('reset').addEventListener('click', function () {
    store.dispatch({
        type: 'RESET',
        payload: { count: 1 },
    });
});

store.dispatch({ type: 'INIT' });