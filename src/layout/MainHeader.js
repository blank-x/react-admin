import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;
const { Item, SubMenu } = Menu;
function MainHeader() {
  return (
    <Header style={{ height: 40 }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '40px' }}
      >
        <SubMenu title="nav 0">
          <Item key="1">
            <Link to="/page1">nav 1</Link>
          </Item>
          <Item key="2">
            <Link to="/page2">nav 2</Link>
          </Item>
          <Item key="3">
            <Link to="/page3">nav 3</Link>
          </Item>
          <Item key="4">Option 4</Item>
        </SubMenu>
      </Menu>
    </Header>
  );
}

export default MainHeader;
