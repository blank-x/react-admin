import React, {useState} from 'react';
import Styled from 'styled-components';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import { Layout, Menu } from 'antd';
import { actions } from 'src/store/slice';
import {selectCollapsed} from 'src/store/selectors'
import {IProps} from 'src/layout/type';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
const { Header: AntdHeader } = Layout;
const { Item, SubMenu } = Menu;
function MainHeader(props:IProps) {
  const toggle = () => {
    props.toggleSider(!props.collapsed)
  };
  return (
    <Header style={{ background: "#fff" }}>
      {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        style:{fontSize:14},
        onClick: toggle,
      })}
    </Header>
  );
}


export default compose(
  connect(
    createStructuredSelector({
      collapsed: selectCollapsed
    }),
    {
      toggleSider: actions.updateSiderCollapsed
    }),
)(MainHeader) ;


const Header  = Styled(AntdHeader)`

  height:46px;
  line-height:46px;
  padding: 0 24px;
`
