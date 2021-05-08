import React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router';
import Page2 from './pages/Page2';
import Page1 from './pages/Page1/index';
import Page3 from './pages/Page3';

const { Footer, Header, Content } = Layout;

class MyContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/page1" strict component={Page1} />
          <Route path="/page2" strict component={Page2} />
          <Route path="/page3" strict component={Page3} />
        </Switch>
      </div>
    );
  }
}

export default MyContent;
