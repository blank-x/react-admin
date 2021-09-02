import React from 'react'
/* React Router v5.1.0 开始有了这些hooks*/
import {useHistory, useParams, useLocation, withRouter } from 'react-router-dom'

class Page1 extends React.Component<any, any> {
  render() {
    /* 使用Route渲染出来的组件，props上会有history对象  类似于vue-router的this.$router 有跳转 监听等方法 */
    console.log(this.props.history)
    /* 同时还有location match对象， 这两个对象是纯js对象，记录着当前路由的一些信息，类似于vue-router的this.$routes */
    console.log(this.props)

    return (
      <>
        <div>Page1</div>
        <Test/>
        <WithRouterTest2 />
      </>
    );
  }
}

const Test = function () {
  const params = useParams<Record<string, any>>()
  const history = useHistory()
  const { search, pathname } = useLocation();

  function handleClick() {
    history.push("/home");
    // history.replace({
    //   pathname: 'path',
    // });
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>Go home</button>
      <div> params.id : {params.id}</div>
      <div> search : {search}</div>
      <div> pathname : {pathname}</div>
    </div>)
}
const Test2 = function (props: any) {

  /* 这个props和 使用Route渲染出来的组件上带的参数完全一致  */
  console.log(props)

  function handleClick() {
    props.history.push("/home");
    // history.replace({
    //   pathname: 'path',
    // });
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>Go home</button>
      {/*<div> params.id : {params.id}</div>*/}
      {/*<div> search : {search}</div>*/}
      {/*<div> pathname : {pathname}</div>*/}
    </div>)
}
const WithRouterTest2 = withRouter(Test2)
export default Page1
