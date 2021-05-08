// 阻止滑动页面
import { useLayoutEffect, useState } from 'react';

// 使用
function App() {
  // modal框的state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function Modal({ title, content, onClose }) {
  // 调用hook锁定body滚动
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Hook
function useLockBodyScroll() {
  useLayoutEffect(() => {
    // 获取原始body的overflow值
    const originalStyle = window.getComputedStyle(document.body).overflow;
    //防止在mount的过程中滚动
    document.body.style.overflow = 'hidden';
    // 当组件unmount的时候解锁滚动
    return () => (document.body.style.overflow = originalStyle);
  }, []);
  // 空数组保证了effect函数只会在mount和unmount的时候运行
}
