import React,{useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import Com1 from './com1'
import Com2 from './com2'
import {Button} from "antd";

function Com3(){
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    const local = latestCount
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  console.log(count);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

class Index extends React.Component{
  // constructor(props) {
  //   super();
  //   // console.log(this.props);
  // }
  // state={
  //   name:1
  // }
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
    // console.log(this);
    console.log( this.constructor);
    // console.log('m');
  }
  componentDidUpdate(){
    // console.log('u');
  }
  render() {
    // console.log('render');
    return (
      <div>page1
        <span ref={this.refHandler}>sdsdsd</span>
        <Button onClick={this.change} >修改state</Button>
        {/*<Com1  name={this.state.name}  ></Com1>*/}
        {/*<Com2 ></Com2>*/}
        <Com3 />
      </div>
    )
  }
}

export default Index


