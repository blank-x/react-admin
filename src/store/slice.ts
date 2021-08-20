import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  name: string,
  age: number
}

interface IState {
  userInfo: IUser,
  loading: boolean,
  error: string,
  pageLoading: boolean,
  siderCollapsed: boolean,
}

interface IResponse<T> {
  errno: number;
  errmsg: string;
  data: T;
}

const NAMESPACE = 'global';

export const initialGlobalState: IState = {
  userInfo: {
    name: 'zsy',
    age: 18,
  },
  loading: false,
  error: '',
  pageLoading: false,
  siderCollapsed: false,
};

const services = (data: IUser) => {
  return new Promise<IResponse<object>>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        errno: 200,
        errmsg: '',
        data,
      });
    }, 2000);
  });
};

function createAsyncThunkWrap<Returned, ThunkArg = void>(typePrefix: string, asyncHandler: (args?: ThunkArg) => Promise<IResponse<Returned>>) {
  return createAsyncThunk<IResponse<Returned>, ThunkArg>(
    typePrefix,
    async (params, { rejectWithValue }) => {
      try {
        return await asyncHandler(params);
      } catch (e) {
        return rejectWithValue(e);
      }
    },
  );
}


export const getLoginUserInfo = createAsyncThunkWrap(
  `${NAMESPACE}/getLoginUserInfo`,
  async () => {
    return services({
      name: 'ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'[Math.floor(Math.random() * 44)],
      age: Math.floor(Math.random() * 45),
    });
  },
);
export const getPageInfo = createAsyncThunkWrap(
  `${NAMESPACE}/loading/getLoginUserInfo`,
  async () => {
    return services({
      name: 'ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'[Math.floor(Math.random() * 44)],
      age: Math.floor(Math.random() * 45),
    });
  },
);

const slice = createSlice({
  name: NAMESPACE,
  initialState:initialGlobalState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    init(state) {
      console.log('init');
    },
    updatePageLoading(state, action: PayloadAction<boolean>) {
      state.pageLoading = action.payload;
    },
    updateSiderCollapsed(state, action: PayloadAction<boolean>){
      state.siderCollapsed = action.payload;
    }

  },
  // 异步的成功、失败处理
  extraReducers: {
    [getLoginUserInfo.fulfilled.type]: (state, action) => {
      const data = action.payload?.data;
      const { name, age } = data || {};
      state.userInfo = {
        name,
        age,
      };
    },
  },
});

export const { actions, reducer, name } = slice;
