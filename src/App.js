// import './App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import MyContent from 'src/MyContent';
import MainHeader from 'src/layout/MainHeader';
import MainBreadcrumb from 'src/layout/Breadcrumb';
const { Footer, Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <MainHeader></MainHeader>
      <Content style={{ padding: '0 50px' }}>
        <MainBreadcrumb />
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <MyContent></MyContent>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>welcome to here</Footer>
    </Layout>
  );
}

export default App;
