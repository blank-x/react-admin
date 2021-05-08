import { useState, useMemo } from 'react';
// Usage
function App() {
  // 计数器的state
  const [count, setCount] = useState(0);
  // 追踪我们在数组中想要展示的当前单词
  const [wordIndex, setWordIndex] = useState(0);

  // 我们可以浏览单词和查看字母个数
  const words = ['hey', 'this', 'is', 'cool'];
  const word = words[wordIndex];

  // 返回一个单词的字母数量
  // 人为的使它运行缓慢
  const computeLetterCount = (word) => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  // 缓存computeLetterCount，当输入数组的值和上一次运行一样的话，就会返回缓存的值
  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  // 这个方法会是我们增加计数变得延迟，因为我们不得不等开销巨大的方法重新运行。
  //const letterCount = computeLetterCount(word);

  return (
    <div style={{ padding: '15px' }}>
      <h2>Compute number of letters (slow 🐌)</h2>
      <p>
        "{word}" has {letterCount} letters
      </p>
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        Next word
      </button>

      <h2>Increment a counter (fast ⚡️)</h2>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
