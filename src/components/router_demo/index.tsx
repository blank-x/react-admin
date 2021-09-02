import React, { Suspense, lazy } from 'react'
import {HashRouter as Router, Link, Route, Switch, Redirect, NavLink} from 'react-router-dom';
import Page1 from "@/components/router_demo/page1";
import Page2 from "@/components/router_demo/page2";
import Page3 from "@/components/router_demo/page3";
import Page4 from "@/components/router_demo/page4";
import Page5 from "@/components/router_demo/page5";
import Home from "@/components/router_demo/home";

const Page6 = lazy(() => import('@/components/router_demo/lazyPage6'));

class RouterDemo extends React.Component {
  render() {
    return (
      <>
        <div style={{margin: 50}}>
          router1
          <Router>
            <div>
              <div><Link to="/page1">to page1</Link></div>
              <div><Link to="/page1/100?a=12">to page1/100</Link></div>
              <div><Link to="/page2/">to page2</Link></div>
              <div><Link to="/">to home</Link></div>
              <div><Link to="/page3">to page3</Link></div>
              <div><Link to="/page5">to page5</Link></div>
              {/*  /order 被重定向到了/page1 */}
              <div><Link to="/order">to order redirect to page1</Link></div>
              {/* 当匹配到这个地址的时候，会自动增加属性 比如设置样式 添加class;   isActive={()=>{return true}} 设置匹配规则  */}
              <div><NavLink to='/page1' activeStyle={{color:'green'}} activeClassName="xxxx">NavLink  to page1</NavLink></div>
              <div><Link to="/page6">to page6  异步加载</Link></div>

            </div>
            <div>
              <Suspense fallback={<div>Loading...</div>}>

                <Switch>
                  <Route exact path='/page1/' component={Page1} />
                  <Route exact path='/page1/:id' component={Page1} />
                  {/* 下面的page2使用了strict，然后无法匹配/page2/ ,显示不出来Page2 */}
                  <Route exact strict path='/page2' component={Page2} />
                  {/* 可以使用render属性自定于渲染 */}
                  <Route exact  path='/page5' render={ props => <Page5 />}  />
                  <Route exact  path='/page6'  component={Page6} />
                  {/* Redirect 重定向 */}
                  <Redirect exact from="/order" to="/page1"/>
                  <Route path='/' component={Home} />
                  {/* 上面的path="/" 没使用exact，导致下面的page3永远匹配不到 */}
                  <Route path='/page3' component={Page3} />
                  {/*  一个托底的路由设置 */}
                  <Route path="*" strict  component={()=><div>404 not found</div>}/>

                </Switch>
              </Suspense>

              <div style={{height: 100}}></div>
              <div>
                <div><Link to="/page4">to page4</Link></div>
                {/* 如果没有使用switch 下面两个会同时匹配page4 并同时渲染出来 */}
                <Route path='/page4' component={Page4} />
                <Route path='/page4' component={Page4} />

              </div>
            </div>
          </Router>
        </div>
{/*        <div style={{margin: 50}}>
          router2  为了测试同时有两个router的情况
          <Router>
            <div>
              <div><Link to="/page1">to page1</Link></div>
              <div><Link to="/page2">to page2</Link></div>
            </div>

            <Switch>
              <Route path='/page1' component={Page1} />
              <Route path='/page2' component={Page2} />
            </Switch>
          </Router>
        </div>*/}
      </>

    )
  }
}

class App extends React.Component<any, any> {
  render() {
    return (
      <>
        <RouterDemo/>
      </>
    );
  }
}

export default App
