import { useCallback, useReducer } from 'react';

// Usage
function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});

  return (
    <div className="container">
      <div className="controls">
        <div className="title">👩‍🎨 Click squares to draw</div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className="grid">
        {((blocks, i, len) => {
          // 生成一个网格块
          while (++i <= len) {
            const index = i;
            blocks.push(
              <div
                // 如果state中的状态为true则给这个块添加active类名
                className={'block' + (state[index] ? ' active' : '')}
                // 根据点击改变块的状态并合并到最新的state
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={i}
              />,
            );
          }
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}

// 初始化useReducer中的state
const initialGlobalState = {
  // 当我们每次添加新state时，用来储存更新前状态的数组
  past: [],
  // 当前的state值
  present: null,
  // 让我们可以用使用重做功能的，future数组
  future: [],
};
// 根据action处理state的改变
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case 'SET':
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case 'CLEAR':
      const { initialPresent } = action;

      return {
        ...initialGlobalState,
        present: initialPresent,
      };
  }
};
// Hook
const useHistory = (initialPresent) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialGlobalState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 设置我们的回调函数
  // 使用useCallback来避免不必要的重新渲染

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo, dispatch]);

  const set = useCallback((newPresent) => dispatch({ type: 'SET', newPresent }), [dispatch]);

  const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [dispatch]);

  // 如果需要，同样可以到处过去和未来的state
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};
