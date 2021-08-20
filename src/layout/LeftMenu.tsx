import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { BorderOuterOutlined } from '@ant-design/icons';
import routes, {filterAccessRoutes} from '../routes';
import IconContainer from 'src/layout/IconContainer';
import icons from "src/components/icons"
const { Footer, Header, Content } = Layout;

const LeftMenu = ()=>{
  const accessRoutes = filterAccessRoutes(routes,[0,1,2])
  return (
    <MenuWrapper>
      <Menu theme="dark" mode="inline" >
        {
          renderMenu(accessRoutes)
        }
      </Menu>
    </MenuWrapper>
  )
}

export default LeftMenu



const MenuWrapper = styled.div`
  /*height: 100%;
  overflow-y: auto;
  !* Firefox *!
  scrollbar-width: none;
  !* IE10+ *!
  -ms-overflow-style: none;
  !* Chrome Safari *!
  &::-webkit-scrollbar {
    display: none;
  }

  .ant-menu-item .anticon, .ant-menu-submenu-title .anticon,
  .ant-menu-inline-collapsed > .ant-menu-item .anticon,
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
    font-size: 20px;
    vertical-align: 0;
  }*/
  
`;

const renderMenu = (routes: IRoutes[])=>{
  return (
    <>
      {
        routes.map((item:IRoutes)=>{
          const {exact,...others} = item
          if(!item.children){

            return (
              <Menu.Item  key={item.path} icon={icons[item.icon]}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          }else{
            return (
              <Menu.SubMenu key={item.path} title={item.title} icon={icons[item.icon]}>
                {renderMenu(item.children)}
              </Menu.SubMenu>
            )
          }

        })
      }
    </>
  )
}
