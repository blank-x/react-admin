import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
  // 创建一个ref，储存我们要监测外部点击的元素
  const ref = useRef();
  // modal框的逻辑
  const [isModalOpen, setModalOpen] = useState(false);
  // 调用hook，并传入ref和外部点击时要触发的函数
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>👋 Hey, I'm a modal. Click anywhere outside of me to close.</div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
}

// Hook 监测是否在一个特定元素外点击
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // 元素内点击不做任何事
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // 将ref和处理函数添加到effect的依赖数组中
    // 值得注意的一点是，因为在每一次render中被传入的处理方法是一个新函数，这将会导致effect的callback和cleanup每次render时被1调用。
    // 这个问题也不大，你可以将处理函数通过useCallback包裹起来然后再传入hook中。
    [ref, handler],
  );
}
