import { useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring'; // 展示一行卡片
// Usage of hook is within <Card> component below
function App() {
  const cards = [{ title: 'a', description: 'b', image: 'c' }];
  return (
    <div className="container">
      <div className="row">
        {cards.map((card, i) => (
          <div className="column">
            <Card>
              <div className="card-title">{card.title}</div>
              <div className="card-body">{card.description}</div>
              <img className="card-image" src={card.image} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ children }) {
  // 我们使用这个ref来储存从onMouseMove事件中获取的元素偏移值和大小
  const ref = useRef();

  // 持续跟踪这个卡片是否hover状态，这样我们可以确保这个卡片的层级在其他动画上面
  const [isHovered, setHovered] = useState(false);

  // The useSpring hook
  const [animatedProps, setAnimatedProps] = useSpring({
    // 用来储存这些值 [rotateX, rotateY, and scale] 的数组
    // 我们使用一个组合的key（xys）来代替分开的key，这样我们可以在使用animatedProps.xys.interpolate()去更新css transform的值
    xys: [0, 0, 1],
    // Setup physics
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
  });

  return (
    <animated.div
      ref={ref}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // 获取鼠标X坐标相对卡片的位置
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // 获取鼠标Y相对卡片的位置
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // 根据鼠标的位置和卡片的大小设置动画的值
        const dampen = 50; // 数字越小，旋转的角度越小
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07, // Scale
        ];

        // 更新动画的值
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // 还原xys的值
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // 当卡片被hover时我们希望它的层级在其他卡片之上
        zIndex: isHovered ? 2 : 1,
        // 处理css变化的函数
        transform: animatedProps.xys.interpolate(
          (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`,
        ),
      }}
    >
      {children}
    </animated.div>
  );
}
