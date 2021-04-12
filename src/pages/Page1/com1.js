import React from 'react'
import {Button} from "antd";

class Com1 extends React.Component{
  constructor() {
    super();
  }
  state = {
    color: '#000000',
    count:0
  }
  static d = 1
  componentDidMount() {
    Promise.resolve().then(()=>{
      document.querySelector('button').style.backgroundColor = 'red'

    })

  }




  change=()=>{
    console.log(this.state.count);
    this.setState({count:this.state.count+1})


  }
  render() {

    return (
      <div>Com1
        <Button onClick={this.change}> Com1 内部state修改</Button>
        {this.state.count}
      </div>
    )
  }
}

export default Com1
