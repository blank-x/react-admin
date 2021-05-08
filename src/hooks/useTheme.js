import { useLayoutEffect } from 'react';
// Usage
const theme = {
  'button-padding': '16px',
  'button-font-size': '14px',
  'button-border-radius': '4px',
  'button-border': 'none',
  'button-color': '#FFF',
  'button-background': '#6772e5',
  'button-hover-border': 'none',
  'button-hover-color': '#FFF',
};

function App() {
  useTheme(theme);

  return (
    <div>
      <button className="button">Button</button>
    </div>
  );
}

// Hook
function useTheme(theme) {
  useLayoutEffect(
    () => {
      // 循环这个主题对象
      for (const key in theme) {
        // 更新文档根元素的css变量
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme], // 只要当主题对象发行改变时才会再次运行
  );
}
