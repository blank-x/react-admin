export const onDecrement = (payload) => ({
  type: 'DECREMENT',
});

export const onIncrement = (payload) => ({
  type: 'INCREMENT',
});

export const onIncrementAsync = (payload) => {
  return {
    type: 'INCREMENT_ASYNC',
  };
};
export const createAsync = (dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' });
      console.log('121212');
      resolve();
    }, 3000);
  });
};
