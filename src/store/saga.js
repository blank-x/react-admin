import {
  put,
  takeEvery,
  delay,
  all,
  fork,
  call,
  cps,
  cancelled,
  cancel,
  race,
  putResolve,
} from 'redux-saga/effects';

import { createAsync } from './action';
const Api = {
  authorize: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('xxxxx');
      }, 2000);
    });
  },
};

/*
 * 可以把run方法中的参数透传到rootSaga里面
 * 同时fork等方法可以把参数透传到执行方法中
 * */
export default function* rootSaga(dispatch) {
  yield all([putResolve(createAsync), putResolve(createAsync)]);
  console.log(11212);
}

