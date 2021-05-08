// 使用媒体查询
import { useEffect, useState } from 'react';

function App() {
  const columnCount = useMedia(
    // 媒体查询
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // 列数 （跟上方的媒体查询数组根据下标相关）
    [5, 4, 3],
    // 默认列数
    2,
  );

  // 创建一个默认的列高度数组，以0填充
  let columnHeights = new Array(columnCount).fill(0);

  // 创建一个数组用来储存每列的元素，数组的每一项为一个数组
  let columns = new Array(columnCount).fill().map(() => []);

  data.forEach((item) => {
    // 获取高度最矮的那一项
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // 添加item
    columns[shortColumnIndex].push(item);
    // 更新高度
    columnHeights[shortColumnIndex] += item.height;
  });

  // 渲染每一列和其中的元素
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map((column) => (
          <div className="column">
            {column.map((item) => (
              <div
                className="image-container"
                style={{
                  // 根据图片的长宽比例调整图片容器
                  paddingTop: (item.height / item.width) * 100 + '%',
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook
function useMedia(queries, values, defaultValue) {
  // 一个包含了是否匹配每一个媒体查询的数组
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  // 根据匹配的媒体查询取值的方法
  const getValue = () => {
    // 获取第一个匹配的媒体查询的下标
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // 返回相对应的值或者默认值
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };

  // 匹配值的state和setter
  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      // 回调方法
      // 注意：通过在useEffect外定义getValue ...
      // ... 我们可以确定它又从hook的参数传入的最新的值（在这个hook的回调第一次在mount的时候被创建）
      const handler = () => setValue(getValue);
      // 为上面每一个媒体查询设置一个监听作为一个回调
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // 在cleanup中清除监听
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [], // 空数组保证了effect只会在mount和unmount时运行
  );

  return value;
}
