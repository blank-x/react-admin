import React from 'react'
import ReactDOM from 'react-dom'
import Com1 from './com1'
import Com2 from './com2'
import {Button} from "antd";

function Com3(){
  console.log('render com3');
  return <a href="sds">sdsd</a>
}
console.log(React.addons.PureRenderMinix);
class Index extends React.Component{
  constructor() {
    super();
    console.log(this);
  }
  state={
    name:1
  }
  change=()=>{
    this.setState({
      name:Math.random()
    })
  }
  refHandler=(ref)=>{
    console.log(ref);
    console.log('ref');
    console.log(ReactDOM.findDOMNode(ref));
  }
  componentDidMount(){
    console.log('m');
  }
  componentDidUpdate(){
    console.log('u');
  }
  render() {
    console.log('render');
    return (
      <div>page1
        <span ref={this.refHandler}>sdsdsd</span>
        <Button onClick={this.change} >修改state</Button>
        <Com1  name={this.state.name}  ></Com1>
        <Com2 ></Com2>
        <Com3></Com3>
      </div>
    )
  }
}

export default Index
