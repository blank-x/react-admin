import React from 'react'
import {Prompt} from 'react-router-dom'
class Page5 extends React.Component<any, any>{
  isPrompt = true
  render() {
    return (
      <>
      <div>Page5</div>
      <Prompt
        when={this.isPrompt}
        message={(location, action)=>{
          /* location中记录着要跳转到的地址 */
          console.log(location, action);
          var r = window.confirm("确定离开么!");
          return r
        }}
      />
      </>
    );
  }
}

export default Page5
