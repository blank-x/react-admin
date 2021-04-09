import React from 'react'
import {Button} from "antd";

class Com1 extends React.Component{
  constructor(props) {
    super(props);
  }
  state = {
    color: '#000000'
  }
  static getDerivedStateFromProps(props, state){
    if (props.color !== state.color) {
      return {
        color: props.color
      }
    }
    return null
  }
  change=()=>{
    // this.setState({
    //   color:Math.random()
    // })
    this.forceUpdate()
  }
  render() {
    return (
      <div>Com1
        <Button onClick={this.change}> Com1 内部state修改</Button>
      </div>
    )
  }
}

export default Com1
