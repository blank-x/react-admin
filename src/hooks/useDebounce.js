import { useEffect, useState } from 'react';

// Usage
function App() {
  // 搜索词
  const [searchTerm, setSearchTerm] = useState('');
  // API搜索结果
  const [results, setResults] = useState([]);
  // 搜索状态 (是否有正在等待的请求)
  const [isSearching, setIsSearching] = useState(false);
  // 对改变搜索词去抖动，只有当搜索词500毫秒内没有发生改变时，才会返回最新的值
  // 目标就是只有当用户停止输入时才会调用API，防止我们太过迅速频繁的调用API
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm], // 只有当去抖动后的搜索词改变时才会调用
  );

  return (
    <div>
      <input placeholder="Search Marvel Comics" onChange={(e) => setSearchTerm(e.target.value)} />

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`} />
        </div>
      ))}
    </div>
  );
}

// API search
function searchCharacters(search) {
  const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: 'GET',
    },
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

// Hook
function useDebounce(value, delay) {
  // 存储去抖动后的值
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // 在延迟delay之后更新去抖动后的值
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // 如果值改变了取消timeout (同样在delay改变或者unmount时生效)
      // 这就是我们通过延迟间隔内值没有被改变来达到防止值去抖动 清空timeout并且重新运行
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // 只有当搜索值或者delay值发生改变时才会重新调用
  );

  return debouncedValue;
}
