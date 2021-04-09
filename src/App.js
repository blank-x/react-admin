// import './App.css';
import { Layout, Menu, Breadcrumb } from "antd";
import {Link} from 'react-router-dom'
import MyContent from './MyContent'
const { Footer, Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1"><Link to="/page1">nav 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/page2">nav 2</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/page3">nav 3</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {" "}
           <MyContent></MyContent>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        welcome to here
      </Footer>
    </Layout>
  );
}

export default App;
