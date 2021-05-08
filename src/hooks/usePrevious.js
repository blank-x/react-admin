import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
  const [count, setCount] = useState(0);

  // 获取更新前的值 (在上一次render中传进hook)
  const prevCount = usePrevious(count);

  // 同时展示当前值和更新前值
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
// Hook 使用hook获取props和state之前的值
function usePrevious(value) {
  // ref对象是一个通用容器其current属性为可变的，并且可以容纳任何值，类似与一个类上的实例属性。
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // 只有当值改变时重新运行

  // 返回更新前的值 (发生在useEffect更新之前)
  return ref.current;
}
