// 观察到是哪一个prop的改变导致了一个组件的重新渲染
import { useEffect, useRef, useState } from 'react';
// 让我们装作这个<Counter>组件的重新渲染成本很高...// ... 我们使用React.memo将它包裹起来，但是我们仍然需要寻找性能问题 :/// 因此我们添加useWhyDidYouUpdate并在控制台查看将会发生什么
const Counter = React.memo((props) => {
  useWhyDidYouUpdate('Counter', props);
  return <div style={props.style}>{props.count}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);

  // 我们的控制台告诉了我们 <Counter> 的样式prop...
  // ... 在每一次重新渲染中的改变，即使我们只通过按钮改变了userId的状态 ...
  // ... 这是因为每一次重新渲染中counterStyle都被重新创建了一遍
  // 感谢我们的hook让我们发现了这个问题，并且提醒我们或许应该把这个对象移到component的外部
  const counterStyle = {
    fontSize: '3rem',
    color: 'red',
  };

  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}

// Hook
function useWhyDidYouUpdate(name, props) {
  // 获得一个可变的kef对象，我们可以用来存储props并且在下一次hook运行的时候进行比较
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // 获取改变前后所有的props的key值
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // 使用这个对象去跟踪改变的props
      const changesObj = {};
      // 通过key值进行循环
      allKeys.forEach((key) => {
        // 判断改变前的值是否和当前的一致
        if (previousProps.current[key] !== props[key]) {
          // 将prop添加到用来追踪的对象中
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // 如果改变的props不为空，则输出到控制台
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // 最后将当前的props值保存在previousProps中，以供下一次hook进行的时候使用
    previousProps.current = props;
  });
}
