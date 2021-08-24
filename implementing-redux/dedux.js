export default {
  createStore,
  applyMiddleware,
}

// validates dispatched actions, throws errors where necessary
const checkAction = (action) => {
  if (!action || typeof action !== 'object' || !action.type) throw new Error('All actions must be valid');
};

// initializes and returns the store
function createStore(reducer) {
  const store = {};
  // using an array in case more subscriptions are desired in the future
  store.subs = [];

  store.getState = () => store.state;
  store.subscribe = sub => {
    store.subs.push(sub);
    // optional unsub function, removes latest subscription
    // could be altered to remove by sub id
    return () => store.subs.pop();
  };

  store.dispatch = action => {
    // check if action is valid
    checkAction(action);

    // if valid, return new state
    const localCount = localStorage.getItem('count');
    store.state = reducer({ count: localCount ? parseInt(localCount) : 0 }, action);

    // pass updated store to subscriptions
    store.subs.forEach(sub => sub(store.state));

    // update localStorage with new value
    localStorage.setItem('count', store.getState() ? store.getState().count : '');
  }

  store.dispatch({ type: 'INIT' });

  return store;
}

function applyMiddleware() { }

