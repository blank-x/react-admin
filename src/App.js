import { Layout, Menu, Breadcrumb } from 'antd';
// import MainLaylout from 'src/layout/Main';
import styled from 'styled-components';
import { renderRoutes } from 'react-router-config';
import MainHeader from 'src/layout/MainHeader';
import MainBreadcrumb from 'src/layout/Breadcrumb';
import { Switch, Route} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {selectCollapsed} from 'src/store/selectors'
import LeftMenu from 'src/layout/LeftMenu';
import {flattedRoutes} from './routes'
const { Content, Sider } = Layout;
function App() {
  const siderCollapsed = useSelector(selectCollapsed)
  return (
    <LayoutWrapper className="layout">
      <Sider
        collapsible
        width={160}
        collapsed={siderCollapsed}
        collapsedWidth={50}
        trigger={null}
      >
        <Logo   />
        <LeftMenu />

      </Sider>
      <Layout>
        <MainHeader />
        <ContentWrapper>
          <div>
            {renderRoutes(flattedRoutes)}
          </div>
        </ContentWrapper>
      </Layout>

    </LayoutWrapper>
  );
}

export default App;

const LayoutWrapper = styled(Layout)`
  height: 100vh;
  overflow: hidden;
`

const ContentWrapper = styled(Content)`
  margin:10px 10px 0;
  background: #fff;
  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`
