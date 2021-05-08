// 使用这个hook可以轻易的监测当用户在他们的键盘上输入特殊的键值时。这个小窍门非常的简单，并且我想给你们看这只需要很少的代码，但我挑战任何读者看谁能创建一个更高级的版本。监测当多个键同时被按住会是一个很好的补充。加分项：还能检测是否在按照指定顺序输入键值。
function App() {
  const happyPress = useKeyPress('h');
  const sadPress = useKeyPress('s');
  const robotPress = useKeyPress('r');
  const foxPress = useKeyPress('f');

  return (
    <div>
      <div>h, s, r, f</div>
      <div>
        {happyPress && '😊'}
        {sadPress && '😢'}
        {robotPress && '🤖'}
        {foxPress && '🦊'}
      </div>
    </div>
  );
}

// Hook
function useKeyPress(targetKey) {
  // 用来储存持续追踪是否有键被按下
  const [keyPressed, setKeyPressed] = useState(false);

  // 如果按下的键值是我们的目标值，将其设置为true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // 如果松开的键值是我们的目标值，将其设置为false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // 添加事件监听
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // 在cleanup中清除回调
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // 空数组意味着只有在mount和unmout的时候才会运行

  return keyPressed;
}
